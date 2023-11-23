<script setup>
    const user = useSupabaseUser();
    const supabase = useSupabaseClient();
    const post_text = ref('')
    const post_image = ref(null)
    const userAvatar = user.value.user_metadata.avatar_url
    definePageMeta({
        middleware: ['auth']
    })
    useSeoMeta({
        title: 'Главная страница | W',
    });
    // import postData from "~/assets/posts.json";
    // console.log(user.value)
const { data: posts } = await useAsyncData('posts', async () => {
    const { data } = await supabase.from('posts')
        .select(`
            id,
            created_at,
            post_text,
            post_image,
            profiles (
                nickname,
                fullname,
                avatar_url,
                is_premium,
                is_verification
            )
        `)
        .order('created_at', { ascending: false });
    return data;
});

const createPost = async () => {
    if (!user) throw new Error('User not found');
    if (post_text.value === '') {
        alert("Пост не может быть пустым")
        return false;
    };
    const { data, error } = await supabase
        .from('posts')
        .insert({
            author_id: user.value.id,
            post_text: post_text.value,
            post_image: post_image.value
        })
        .select()
        .single();
    if (error) throw error;
    post_text.value = '';
    return data;
};
</script>

<template>
    <div id="wall-content">
        <Header title="Главная" />
        <div id="create-content">
            <div class="avatar" :style="'background-image: url(' + userAvatar + ')'"></div>
            <form  @submit.prevent="createPost">
                <textarea 
                    placeholder="Что нового?"
                    maxlength="263" 
                    type="text"
                    v-model="post_text"
                ></textarea>
                <div id="post-input-container">
                    <div class="post-input-button">
                        <input 
                            id="post-add-image" 
                            class="button" 
                            v-model="post_image"
                            placeholder="Ссылка на картинку"
                        >
                    </div>
                    <div class="post-input-button">
                        <input class="button" type="submit" value="Опубликовать">
                    </div>
                </div>
            </form>
        </div>
        <div id="posts">
            <div class="post" v-for="post in posts" :key="post.id">
                <div class="user-info-container">
                    <div class="user-main-info">
                        <div class="avatar" 
                        :style="
                        [
                            {backgroundImage: 'url(' + post.profiles.avatar_url + ')'},
                            [post.profiles.is_premium ? ('border: 2px solid var(--highlight-color)') : false ]
                        ]"
                        
                        >
                    </div>
                        <div class="nickname-container" @click="$router.push('/user/' + post.profiles.nickname)">
                            <div class="post-user-flname">{{ post.profiles.fullname }}
                                <span v-if="post.profiles.is_verification === true"
                                    style="height: 14px;width: 14px; margin-left: 5px;">
                                    <span class="checkcheck"></span>
                                </span>
                                <span v-if="post.profiles.is_premium === true"
                                    style="height: 14px;width: 14px; margin-left: 5px;">
                                    <span class="checkpremium"></span>
                                </span>
                            </div>
                            <div class="post-user-nickname">@{{ post.profiles.nickname }}</div>
                        </div>
                    </div>
                    <div class="post-created-at">{{ new Date(post.created_at).toLocaleDateString() }}</div>
                </div>
                <div class="post-content">
                    <p class="post-text" v-text="post.post_text" @click="$router.push('/post/' + post.id)"></p>
                    <span class="post-image" v-if="post.post_image !== null">
                        <img :src="post.post_image">
                    </span>
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
        border-radius: 25px;
        padding: 18px;
        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            margin-left: 18px;
            textarea {
                overflow-y: auto;
                padding-block: 10px;
                color: white;
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
                justify-content: flex-end;
                margin-top: 18px;
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

    #posts {
        width: 100%;
        max-width: 646px;
    }
}</style>

