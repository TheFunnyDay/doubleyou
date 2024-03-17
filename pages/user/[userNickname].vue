<script setup>

import { useRoute } from 'vue-router';

const supabase = useSupabaseClient();
const route = useRoute();
const checkUser = useSupabaseUser();
const authUserId = checkUser.value.id;

useSeoMeta({
    title: '@' + route.params.userNickname + ' | W',
});

const randImage = ref('');
onMounted(() => {
    const bgImages = [
        'https://media.tenor.com/ESNSzxKHiuEAAAAi/bird-seagull.gif', 
        'https://media.tenor.com/ociZpU8b_Q8AAAAi/cat-meme.gif',
        'https://media.tenor.com/k-9QNRTZhZsAAAAi/kzary.gif',
        'https://media.tenor.com/xGcV-91vbeIAAAAi/kita-ikuyo-kita.gif',
    ];
    const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];
    randImage.value = randomImage;
});
const { data: user } = await supabase
    .from('profiles')
    .select('*')
    .eq('nickname', route.params.userNickname)
    .single();

// const userPosts = user.value.id
const { data: posts } = await supabase.from('posts')
    .select(`
        id,
        created_at,
        post_text,
        post_image,
        author_id,
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

    .eq("author_id", user.id)
    .order('created_at', { ascending: false })
</script>

<template>
    <div id="wall-content" >
        <Header :title="user.nickname ? user.nickname : 'Пользователь'" />
        <Loading v-if="!user" />

        <div id="user-info" style="color: white" v-else>
            <div id="user-cover" :style="'background-image: url(' + (user.cover_url ? user.cover_url : '') + ')'"></div>
            <div id="user-main-info">
                <div id="userAvatar" :style="[
                        { backgroundImage: 'url(' + user.avatar_url + ')' },
                        [user.is_premium ? ('outline: 2px solid var(--highlight-color)') : 'outline: 2px solid var(--main-outline-color)']
                    ]">
                </div>
                <div id="user-name-desc">
                    <div id="user-name-meta">
                        <div style="display: flex;flex-direction: column;">
                            <span id="user-fullname">
                            {{ user.fullname }}
                            <span v-if="user.is_verification === true" style="height: 20px;width: 20px; margin-left: 5px;">
                                <span class="checkcheck"></span>
                            </span>
                            <span v-if="user.is_premium === true" style="height: 20px;width: 20px; margin-left: 5px;">
                                <span class="checkpremium"></span>
                            </span>
                            </span>
                        <span id="user-nickname">@{{ user.nickname }}</span>
                        </div>
                        <div id="user-follow" v-if="authUserId !== user.id">Подписаться</div>
                    </div>
                    <span id="user-descript" v-text="user.descript"></span>
                </div>
            </div>
        </div>
        <div id="user-posts" >
            <div id="user-view-switcher">
                <div class="user-switch-to">
                    <span>Посты</span>
                </div>
                <div class="user-switch-to">
                    <span>Лайки</span>
                </div>
                <div class="user-switch-to">
                    <span>Ответы</span>
                </div>
            </div>
            <div id="user-no-posts" v-if="!posts.length">
                У пользователя {{ user.fullname }}  нет никаких публикаций
                <img :src="randImage" />
            </div>
            <div class="post" v-for="post in posts" :key="post.id">
                <div class="user-info-container">
                    <div class="user-main-info">
                        <div class="avatar" @click="$router.push('/user/' + post.profiles.nickname)" :style="[
                                { backgroundImage: 'url(' + post.profiles.avatar_url + ')' },
                                [post.profiles.is_premium ? ('border: 2px solid var(--highlight-color)') : false]
                            ]">
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
                    <p class="post-text" v-text="post.post_text" @click="$router.push('/post/' + post.id)"></p>
                    <span class="post-image" v-if="post.post_image !== null" @click="$router.push('/post/' + post.id)">
                        <img :src="post.post_image">
                    </span>
                </div>
                <div class="post-footer">
                    <div class="post-likes">
                        <div class="likes-button"></div>
                        <div class="likes-count" v-text="post.likes_count"></div>
                    </div>
                    <div class="post-comments" @click="$router.push('/post/' + post.id)">
                        <div class="comments-button"></div>
                        <div class="comments-count"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#user-info {
    display: flex;
    overflow: hidden;
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    background-color: var(--main-color);
    outline: 1px solid var(--main-outline-color);

    #user-cover {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
        border-bottom: 1px solid var(--main-outline-color);

        @media (max-width: 780px) {
            max-height: 170px;
        }
    }

    #user-main-info {
        display: flex;
        padding: 10px 20px 20px 20px;

        #userAvatar {
            outline: 3px solid var(--main-color);
            position: relative;
            bottom: 70px;
            width: 110px;
            height: 110px;
            border-radius: 100%;
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
            flex: 0 0 110px;
            background-color: #000000;
            @media (max-width: 633px) {
                bottom: 10px;
            }
        }

        #user-name-desc {
            display: flex;
            margin-left: 20px;
            flex-direction: column;
            align-items: flex-start;
            align-items: stretch;
            width: 100%;
            #user-name-meta {
                display: flex;
                justify-content: space-between;
                align-items: center;
                #user-fullname {
                    display: flex;
                    font-size: 25px;
                    font-weight: 700;
                }

                #user-nickname {
                    font-size: 18px;
                    color: #ABABAB;
                }
                #user-follow {
                    font-size: 16px;
                    color: var(--main-text-color);
                    font-weight: 700;
                    background-color: var(--highlight-color);
                    padding: 7px;
                    border-radius: 10px;
                    cursor: pointer;
                    transition: .2s;
                    color: black;
                    outline: 1px solid var(--main-outline-color);
                    &:hover {
                        color: var(--main-text-color);
                        background-color: var(--highlight-color-alpha);
                    }
                    &:active {
                        background-color: var(--highlight-color-sub);                    
                    }
                    @media (max-width: 633px) {
                        // text-overflow: ellipsis;
                        font-size: 14px;
                    }
                }
            }

            #user-descript {
                font-size: 16px;
                margin-top: 10px;
            }
            @media (max-width: 633px) {
                margin-left: 0;
            }
        }
        @media (max-width: 633px) {
            flex-direction: column;
            position: relative;
            bottom: 64px;
            max-height: 185px;
        }
    }
}

#user-posts {
    width: 100%;
    max-width: 646px;

    #user-view-switcher {
        user-select: none;
        display: flex;
        width: 100%;
        background-color: var(--main-color);
        outline: 1px solid var(--main-outline-color);
        flex-direction: row;
        justify-content: space-around;
        overflow: hidden;

        .user-switch-to {
            display: flex;
            padding: 15px;
            width: 100%;
            cursor: pointer;
            color: white;
            font-weight: 700;
            font-size: 18px;
            align-items: center;
            justify-content: center;
            transition: .2s;

            &:hover {
                color: black;
                background-color: var(--highlight-color);

                span {
                    color: black;
                }
            }
        }
    }
    #user-no-posts {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
        outline: 1px solid var(--main-outline-color);
        padding: 20px;
        font-size: 18px;
        font-weight: 700;
        color: var(--main-text-color);
        text-align: center;
        img {
            margin-top: 20px;
            width: 50%;
            // min-width: 300px;
            border-radius: 10px;
        }
    }
}
</style>