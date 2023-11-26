<script setup>

import { useRoute } from 'vue-router';
import userData from "../../assets/userData.json";

const supabase = useSupabaseClient();
const route = useRoute();
useSeoMeta({
    title: '@' + route.params.userNickname + ' | W',
});

const { data: user } = await useAsyncData('profiles', async () => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('nickname', route.params.userNickname)
        .single();
        if (error) throw error
    return data;
});


const { data: posts } = await useAsyncData('posts', async () => {
    const { data, error } = await supabase.from('posts')
        .select(`
            id,
            created_at,
            post_text,
            post_image,
            author_id,
            profiles (
                nickname,
                fullname,
                avatar_url,
                is_premium,
                is_verification
            )
        `)

        .eq("author_id", user.value.id)
        .order('created_at', { ascending: false })
        if (error) throw error
        return data;
});

</script>

<template>
    <div id="wall-content">
        <Header :title="route.params.userNickname" />
        <div id="user-info"  style="color: white">
            <div id="user-cover" :style="'background-image: url(' + (user.cover_url ? user.cover_url : '') + ')'"></div>
            <div id="user-main-info">
                <div id="userAvatar"                         
                    :style="
                        [
                            {backgroundImage: 'url(' + user.avatar_url + ')'},
                            [user.is_premium ? ('outline: 2px solid var(--highlight-color)') : 'outline: 2px solid var(--main-outline-color)' ]
                        ]">
                </div>
                <div id="user-name-desc">
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
                    <span id="user-descript" v-text="user.descript"></span>
                </div>
            </div>
        </div>
        <div id="user-posts">
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
#user-info {
    display: flex;
    overflow: hidden;
    width: 100%;
    border-radius: 25px;
    flex-direction: column;
    align-items: stretch;
    background-color: var(--main-color);
    outline: 1px solid var(--main-outline-color);
    #user-cover {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
        border-radius: 25px;
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
        }

        #user-name-desc {
            display: flex;
            margin-left: 20px;
            flex-direction: column;
            align-items: flex-start;

            #user-fullname {
                display: flex;
                font-size: 25px;
                font-weight: 700;
            }

            #user-nickname {
                font-size: 18px;
                color: #ABABAB;
            }

            #user-descript {
                font-size: 16px;
                margin-top: 10px;
            }
        }
    }
}
#user-posts {
    width: 100%;
    max-width: 646px;
}
</style>