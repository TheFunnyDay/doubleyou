<script setup>
const supabase = useSupabaseClient();
const router = useRoute();
const user = useSupabaseUser();

const userAvatar = user.value.user_metadata.avatar_url || 1;
const post_text = ref(null)
const viewImageToggle = ref(false);
const togglePopup = ref(false);
const postLikesCount = ref(0);

const ToggleView = () => {
    viewImageToggle.value = !viewImageToggle.value
}
useSeoMeta({
    title: 'Пост | W',
});

const {data: posts, error} = await supabase
    .from('posts')
    .select(`
            id,
            created_at,
            post_text,
            post_image,
            likes_count,
            is_reply_to,
            author_id,
            profiles (
                nickname,
                fullname,
                avatar_url,
                is_premium,
                is_verification
            )
        `)
        .limit(1)
        .eq("id", router.params.postId);
        if (posts.length !== 0) {
            postLikesCount.value = posts[0].likes_count
        }


if (posts === null) {
    alert("Пост не существует.\nОшибка получения поста с сервера. Вы будуте перенаправлены на главную страницу");
    navigateTo('/');
}

console.log('posts', posts)
if (posts.length === 0) {
    console.log('Posts not found');
}
const { data: replies } = await useAsyncData('replies', async () => {
    const { data } = await supabase.from('posts')
        .select(`
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
        .eq("is_reply_to", router.params.postId)
        .order("created_at", { ascending: false });
    return data;
});

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
        postLikesCount.value = postData.likes_count + 1;
    } else {
        usersWhoLiked.splice(userIndex, 1);
        postLikesCount.value = postData.likes_count - 1;
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

const deletePost = async () => {
    if (window.confirm("Вы действительно хотите удалить этот пост?")) {
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', router.params.postId);
        if (error) throw error;
        setTimeout(() => {
            alert("Публикация удалена")
            navigateTo('/')
        }, 1500)
        return data;
    }
}

const createReply = async () => {
    if (!user) throw new Error('Пользователь не найден');
    if (post_text.value === null) {
        alert("Пост не может быть пустым")
        return false;
    };
    const { data, error } = await supabase
        .from('posts')
        .insert({
            author_id: user.value.id,
            post_text: post_text.value,
            is_reply_to: posts[0].id
        })
        .select()
        .single();
    if (error) throw error;
    post_text.value = null;

    const { data: updatedReplies } = await supabase.from('posts')
        .select(`
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
        .eq("is_reply_to", router.params.postId)
        .order("created_at", { ascending: false });

    replies.value = updatedReplies;
    togglePopup.value = !togglePopup.value
    setTimeout(() => {
        togglePopup.value = !togglePopup.value
    }, 3000)
    return data;
};

</script>

<template>
    <div id="wall-content" class="user-post">
        <ModalPopup v-if="togglePopup">Комментарий опубликован</ModalPopup>
        <ViewImage v-if="viewImageToggle" :ToggleView="() => ToggleView()" :image="posts[0].post_image"
            :authorName="posts[0].profiles.fullname" :authorAvatar="posts[0].profiles.avatar_url"
            :premium="posts[0].profiles.is_premium" :verified="posts[0].profiles.is_verification"
            :postText="posts[0].post_text" />
        <Header title="Пост" />
        <Loading v-if="!posts" />
        <div v-if="posts.length === 0 || posts === null" class="post-not-found">
            <h1>Публикация недоступна</h1>
            <p>Публикация была удалена или не существует</p>
        </div>
        <div class="post" v-for="post in posts" :key="post.id" v-else>
            <div class="user-info-container">
                <div class="user-main-info">
                    <div class="avatar" @click="$router.push('/user/' + post.profiles.nickname)" :style="[
                        { backgroundImage: 'url(' + post.profiles.avatar_url + ')' },
                        [post.profiles.is_premium ? ('border: 2px solid var(--highlight-color)') : false]
                    ]"></div>
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
                            <span v-if="post.is_reply_to !== null" @click="$router.push('/post/' + post.is_reply_to)"
                                class="post-reply">
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
                        {{ new Date(post.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                    </span>
                </div>
            </div>
            <div class="post-content">
                <p class="post-text" v-if="post.post_text !== null" v-text="post.post_text"></p>
                <span class="post-image" v-if="post.post_image !== null" @click="ToggleView()">
                    <img :src="post.post_image" style="cursor: pointer;">
                </span>
            </div>
            <div class="post-footer" style="justify-content: space-between;">
                <div class="post-likes">
                    <span class="material-symbols-rounded likes-button" @click="postLike(post.id); handleLike(post)">
                        favorite </span>
                    <div class="likes-count" v-text="postLikesCount"></div>
                </div>
                <div class="post-remove" v-if="post.author_id === user.id">
                    <span class="material-symbols-rounded" @click="deletePost()"> delete </span>
                </div>
            </div>
            
        </div>
        <div id="comments-con" class="content" style="text-align: center;">
            <div id="cooments-con-user-avatar" :style="{ backgroundImage: 'url(' + userAvatar + ')' }"></div>
            <form @submit.prevent="createReply">
                <input type="text" maxlength="263" :placeholder="posts.length === 0 ? 'Комментирование недоступно' : 'Написать комментарий'" v-model="post_text" :disabled="posts.length === 0">
                    <span 
                        v-if="posts.length !== 0"
                        class="material-symbols-rounded" 
                        @click="createReply" 
                        style="
                            font-size: 28px;
                            cursor: pointer;
                        "
                    >send</span>
            </form>
            
        </div>
        <Loading v-if="!replies" />
        <div class="post" v-if="replies" v-for="reply in replies" :key="reply.id">
            <div class="user-info-container">
                <div class="user-main-info">
                    <div class="avatar" @click="$router.push('/user/' + reply.profiles.nickname)" :style="[
                            { backgroundImage: 'url(' + reply.profiles.avatar_url + ')' },
                            [reply.profiles.is_premium ? ('border: 2px solid var(--highlight-color)') : false]
                        ]" style="width: 40px !important; height: 40px !important; flex: 1 1 10px"></div>
                    <div class="nickname-container" @click="$router.push('/user/' + reply.profiles.nickname)">
                        <div class="post-user-flname">{{ reply.profiles.fullname }}
                            <span v-if="reply.profiles.is_verification === true"
                                style="height: 14px;width: 14px; margin-left: 5px;">
                                <span class="checkcheck"></span>
                            </span>
                            <span v-if="reply.profiles.is_premium === true"
                                style="height: 14px;width: 14px; margin-left: 5px;">
                                <span class="checkpremium"></span>
                            </span>

                            <div class="reply-user-nickname">@{{ reply.profiles.nickname }} </div>
                        </div>
                    </div>
                </div>
                <div class="post-created-at">
                    <span>
                        {{ new Date(reply.created_at).toLocaleDateString() }}
                    </span>
                    <span>
                        {{ new Date(reply.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }}
                    </span>
                </div>
            </div>
            <div class="post-content">
                <p class="post-text" v-if="reply.post_text !== null" v-text="reply.post_text"></p>
                <!-- <span class="post-image" v-if="reply.post_image !== null">
                    <a :href="reply.post_image" target="_blank">
                        <img :src="reply.post_image">
                    </a>
                </span> -->
            </div>
            <div class="post-footer">
                <div class="post-likes">
                    <span class="material-symbols-rounded likes-button" @click="postLike(reply.id); handleLike(reply)">
                        favorite </span>
                    <div class="likes-count" v-text="reply.likes_count"></div>
                </div>
                <div class="post-comments" @click="$router.push('/post/' + reply.id)">
                    <span class="material-symbols-rounded comments-button"> comment </span>
                    <div class="comments-count"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

.post-not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: var(--main-text-color);
    height: 400px;
    width: 100%;
    background: radial-gradient(ellipse at bottom, var(--highlight-color-alpha) 0%, var(--main-bg-color) 100%);
    outline: 1px solid var(--main-outline-color);
    border-radius: 25px;
    margin-top: 20px;
    h1 {
        font-size: 30px;
    }
    p {
        font-size: 18px;
        margin-top: 10px;
        color: var(--sub-text-color)
    }
}
.user-post {
    .post {
        cursor: default;
        margin-top: 0;
        max-width: 646px;
        margin-top: 20px;
        &:hover {
            background-color: var(--main-color);
        }
        &:last-child {
            margin-bottom: 20px;
        }
        .post-text {
            cursor: text;
        }
    }
}

#comments-con {
    display: flex;
    margin-top: 20px;
    border-radius: 25px;
    #cooments-con-user-avatar {
        flex: 0 0 40px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-color: red;
    }

    form {
        display: flex;
        width: 100%;
        align-items: center;
        input {
            width: 100%;
            font-size: 18px;
            max-width: 646px;
            background: none;
            border: none;
            outline: none;
            margin-left: 10px;
            border-radius: 0;

            &:focus {
                outline: none;
            }
        }
    }

}

.reply-user-nickname {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: var(--sub-text-color);
    margin-left: 7px; 
    font-weight: 400;
    @media (max-width: 780px) {
        display: none;
    }
}
</style>