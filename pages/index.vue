<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const post_text = ref('')
const post_image = ref('')
const userAvatar = user.value.user_metadata.avatar_url
const fullPathToImage = ref('');  
const preLoad = ref(true)
useSeoMeta({
    title: 'Главная страница | W',
});

const feedType = ref('all'); 

// Получить список подписок пользователя
let { data: profile } = await supabase
    .from('profiles')
    .select('following')
    .eq('id', user.value.id)
    .single()


const { data: posts, refresh } = await useAsyncData('posts', async () => {
    let query = supabase.from('posts').select(`
        id, 
        created_at,
        post_text,
        post_image,
        likes_count,
        is_reply_to,
        profiles (
            nickname,
            fullname,
            avatar_url,
            is_premium,
            is_verification
        )
    `)
    .order('created_at', { ascending: false });
    
    if (feedType.value === 'following' && profile) {
        query = query.in('author_id', profile.following); 
    }
    const { data } = await query;
    return data;
});


const switchFeed = async (type) => {
    feedType.value = type;
    await refresh();
    preLoad.value = false
};


const uploadImage = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    try {
        const { data, error } = await supabase.storage
            .from('public_storage')
            .upload(`${Date.now()}-${file.name}`, file, {
                cacheControl: '3600',
                upsert: true,
            });
        if (error) throw error;
        // alert(error.description);
        console.log(data);
        fullPathToImage.value = data.path;
        console.log(fullPathToImage.value);
        post_image.value = `https://hathjgjcdclbalrbeeja.supabase.co/storage/v1/object/public/${data.fullPath}`;
    } catch (error) {
        if (error.statusCode == 413) {
            alert('Файл слишком большой. Максимальный размер - 4 МБ');
        }
    }
}

const removeImage = () => {
    const { data, error } = supabase.storage
        .from('public_storage')
        .remove([fullPathToImage.value]);
    if (error) throw error;
    fullPathToImage.value = null;
    console.log(data);
    post_image.value = '';

}
const createPost = async () => {
    if (user === null) throw new Error('Пользователь не найден');
    if ((!post_text.value || !post_text.value.trim()) && (!post_image.value || !post_image.value.trim())) {
        alert("Пост не может быть пустым")
        return false;
    };
    const { data, error } = await supabase
        .from('posts')
        .insert({
            author_id: user.value.id,
            post_text: post_text.value.trim() ? post_text.value : null,
            post_image: post_image.value.trim() ? post_image.value : null
        })
        .select()
        .single();
    if (error) throw error;
    post_text.value = '';
    post_image.value = '';
    await refresh();
    return data;
};

const postLike = async (id) => {
    const { data: postData, error: fetchError } = await supabase
        .from('posts')
        .select('likes_count, users_who_liked')
        .eq('id', id)
        .single();

    if (fetchError) {
        throw fetchError;
    }
    const usersWhoLiked = postData.users_who_liked ? JSON.parse(postData.users_who_liked) : [];

    const userIndex = usersWhoLiked.indexOf(user.value.id);

    if (userIndex === -1) {
        usersWhoLiked.push(user.value.id);
    } else {
        usersWhoLiked.splice(userIndex, 1);
    }

    const updatedLikesCount = usersWhoLiked.length;

    const updatedData = await supabase
        .from('posts')
        .update({
            likes_count: updatedLikesCount,
            users_who_liked: JSON.stringify(usersWhoLiked),
        })
        .eq('id', id)
        .single();

    if (updatedData.error) {
        throw updatedData.error;
    }

    return updatedLikesCount;
};

const handleLike = async (post) => {
    post.likes_count = await postLike(post.id);
};
</script>

<template>
    <div id="wall-content">
        <Header title="Главная" />

        <div id="create-content">

            <div class="avatar" :style="'background-image: url(' + userAvatar + ')'"></div>
            <form @submit.prevent="createPost">
                <textarea placeholder="Что нового?" maxlength="263" type="text" v-model="post_text"></textarea>
                <div class="post-filePreview" v-if="post_image">
                    <NuxtImg :src="post_image" style="    
                            width: 100%;
                            object-fit: contain;
                            max-height: 500px;
                            background-color: var(--main-bg-color);
                            border-radius: 25px;
                            margin-top: 25px;
                            margin-bottom: 10px;
                            outline: 1px solid var(--main-outline-color);
                            " 
                            />
                </div>
                <div id="progress"
                    style="height: 5px; border-radius: 10px; margin-top: 5px; transition: .2s; background-color: var(--highlight-color);"
                    :style="{
                    width: 0 + (post_text.length / 263 * 100 + '%'),
                    background: ( post_text.length > 132 && post_text.length < 263) ? 'orange' : post_text.length === 263 ? 'red' : 'var(--highlight-color)'
                }">
                </div>
                <div id="post-input-container">
                    <div id="post-char-counter" style="max-width: 100px;">
                        <p
                            :style="{ color: ( post_text.length > 132 && post_text.length < 263) ? 'orange' : post_text.length === 263 ? 'red' : 'var(--main-text-color)'}">
                            {{ post_text.length > 0 ? ( 263 - post_text.length ) : '' }}</p>
                    </div>
                    <div style="display: flex;">
                        <div class="post-input-button">
                            <span class="material-symbols-rounded"
                                v-if="post_image"
                                @click="removeImage"
                                style="font-size: 35px;"
                            >
                                delete
                            </span>
                        </div>
                        <div class="post-input-button">
                            <label for="upload-image"><span class="material-symbols-rounded">
                                    image
                                </span></label>
                            <input id="upload-image" class="button" type="file" accept="image/jpg, image/png, image/jpeg, image/gif, image/webp" @change="uploadImage">
                        </div>
                        <div class="post-input-button">
                            <input class="button" type="submit" value="Опубликовать">
                        </div>
                    </div>
                </div>
            </form>
        </div>
        <div id="feed-type">
            <button @click="switchFeed('all')"
                :style="{ backgroundColor: feedType === 'all' ? 'var(--highlight-color)' : '', color: feedType === 'all' ? 'var(--sub-text-color-hover)' : '' }"
                :disabled="feedType === 'all'">
                Все посты
            </button>
            <button @click="switchFeed('following')"
                :style="{ backgroundColor: feedType === 'following' ? 'var(--highlight-color)' : '', color: feedType === 'following' ? 'var(--sub-text-color-hover)' : ''  }"
                :disabled="feedType === 'following'">
                Подписки
            </button>
        </div>
        <Loading v-if="!posts" />
        <div id="posts" v-else-if="posts && posts.length === 0"
            style="display: flex; justify-content: center; align-items: center; flex-direction: column;height: 10vh;">
            <h1>Тут ничего нет...</h1>
        </div>
        <div id="posts" v-else>
            <div class="post" v-for="post in posts" :key="post.id">
                <div class="user-info-container">
                    <div class="user-main-info">
                        <div class="avatar" :style="[
                                { backgroundImage: 'url(' + post.profiles.avatar_url + ')' },
                                [post.profiles.is_premium ? ('border: 2px solid var(--highlight-color)') : false]
                            ]" @click="$router.push('/user/' + post.profiles.nickname)">
                        </div>
                        <div class="nickname-container">
                            <div class="post-user-flname" @click="$router.push('/user/' + post.profiles.nickname)">{{
                                post.profiles.fullname }}
                                <span v-if="post.profiles.is_verification === true"
                                    style="height: 14px;width: 14px; margin-left: 5px;">
                                    <span class="checkcheck"></span>
                                </span>
                                <span v-if="post.profiles.is_premium === true"
                                    style="height: 14px;width: 14px; margin-left: 5px;">
                                    <span class="checkpremium"></span>
                                </span>
                            </div>
                            <div class="post-user-nickname">
                                <span @click="$router.push('/user/' + post.profiles.nickname)">
                                    @{{ post.profiles.nickname }}
                                </span>
                                <span v-if="post.is_reply_to !== null"
                                    @click="$router.push('/post/' + post.is_reply_to)" class="post-reply">
                                    Ответил на пост
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="post-created-at">
                        <span>
                            {{ new Date(post.created_at).toLocaleDateString() }}
                        </span>
                        <span>
                            {{ new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            }}
                        </span>
                    </div>
                </div>
                <div class="post-content">
                    <p v-if="post.post_text !== null" class="post-text" v-text="post.post_text"
                        @click="$router.push('/post/' + post.id)"></p>

                    <span class="post-image" v-if="post.post_image !== null" @click="$router.push('/post/' + post.id)">
                        <img :src="post.post_image">
                    </span>
                </div>
                <div class="post-footer">
                    <div class="post-likes">
                        <span class="material-symbols-rounded likes-button"
                            @click="postLike(post.id); handleLike(post)"> favorite </span>
                        <div class="likes-count" v-text="post.likes_count"></div>
                    </div>
                    <div class="post-comments" @click="$router.push('/post/' + post.id)">
                        <span class="material-symbols-rounded comments-button"> comment </span>
                        <div class="comments-count"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
//#1D1D1D;
//#3F3F3F
#wall-content {
    #create-content {
        display: flex;
        flex-shrink: 0;
        flex-basis: 50px;
        flex-grow: 1;
        width: 100%;
        max-width: 646px;
        background-color: var(--main-color);
        outline: 1px solid var(--main-outline-color);
        padding: 25px;
        margin-top: 20px;
        border-radius: 25px;
        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin-left: 18px;

            textarea {
                overflow-y: auto;
                padding-block: 10px;
                color: var(--main-text-color);
                outline: none;
                min-width: calc(100% - 40px);
                max-height: 500px;
                min-height: 150px;
                background-color: transparent;
                outline: none;
                border: none;
                font-size: 18px;
                resize: vertical;
            }


            #post-input-container {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-top: 18px;
                label {
                    span {
                        cursor: pointer;
                        color: var(--main-text-color);
                        font-size: 35px;
                        font-weight: 500;
                        user-select: none;
                    }
                }
                #upload-image {
                    display: none;
                }
                #post-add-image {
                    cursor: default;
                    width: 40px;
                    border-radius: 15px !important;
                    padding: 10px 15px 10px 15px !important;
                    transition: .3s;

                    &:hover {
                        cursor: text;
                        width: 90px;
                    }

                    &:focus {
                        width: 200px;
                    }
                }

                .post-input-button {
                    display: flex;

                    &:not(:first-child) {
                        margin-left: 10px;
                    }
                }
                .material-symbols-rounded {
                    cursor: pointer;
                    font-size: 35px;
                    transition: .3s color;
                    &:hover {
                        color: var(--highlight-color);
                    }
                }
            }
        }

        .avatar {
            width: 40px;
            height: 40px;
            background-image: url('https://i.ibb.co/5B9Zgnd/image.png');
            background-size: cover;
            border-radius: 100%;
            background-position: center;
            // margin-right: 16px;        
            flex: 0 0 40px;
        }


    }
    #feed-type {
        display: flex;
        width: 100%;
        outline: 1px solid var(--main-outline-color);
        border-radius: 25px;
        overflow: hidden;
        margin-top: 20px;
        margin-bottom: 20px;
        button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: var(--main-color);
            border: none;
            padding: 16px;
            font-size: large;
            font-weight: 600;
            cursor: pointer;
            transition: .3s;
            width: 100%;
            color: var(--main-text-color);
            &:hover {
                background-color: var(--highlight-color-alpha);
            }
        }
    }
    #posts {
        width: 100%;
        max-width: 646px;
    }
}
</style>
