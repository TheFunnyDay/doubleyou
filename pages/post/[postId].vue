
<script setup>
    const supabase = useSupabaseClient();
    const router = useRoute();
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
        .limit(1)
        .eq("id", router.params.postId);
    return data;
});
useSeoMeta({
    title: 'Пост | W',
});
</script>

<template>
    <div id="wall-content" class="user-post">
        <Header title="Пост" />
            <div class="post" v-for="post in posts" :key="post.id">
                <div class="user-info-container">
                    <div class="user-main-info">
                        <div class="avatar"     
                            @click="$router.push('/user/' + post.profiles.nickname)"
                            :style="
                            [
                                {backgroundImage: 'url(' + post.profiles.avatar_url + ')'},
                                [post.profiles.is_premium ? ('border: 2px solid var(--highlight-color)') : false ]
                            ]"
                        ></div>
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
                    <p class="post-text" v-text="post.post_text"></p>
                    <span class="post-image" v-if="post.post_image !== null">
                        <img :src="post.post_image">
                    </span>
                </div>
            </div>
            <div id="comments-con" class="content main-margin" style="text-align: center;">
                <h3>Комментарии временно недоступны</h3>
            </div>
        </div>
</template>

<style lang="scss">
    .user-post {
        .post {
            cursor: default;
            margin-top: 0;
            max-width: 646px;
            &:hover {
                background-color: var(--main-color);
            }
        }
    }

</style>