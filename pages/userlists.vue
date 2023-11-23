<script setup>
    useSeoMeta({
        title: 'Список пользователей | W',
    });

    const supabase = useSupabaseClient();

    let { data: profiles, error } = await supabase
    .from('profiles')
    .select('*').order('id', { ascending: true });

</script>

<template>
    <div id="wall-content">
            <Header title="Пользователи"/>
            <div id="user-list-con">
                <div class="user-in-list" v-for="profile in profiles" :key="profile.id">
                <NuxtLink :to="'/user/' + profile.nickname">
                    <div class="user-cover" 
                    :style="'background-image: url(' + profile.cover_url + ')'"
                    v-if="profile.cover_url !== null && (profile.is_verification === true || profile.is_premium=== true)">
                    </div>
                    <div class="user">
                        <div class="avatar"                         
                        :style="
                        [
                            {backgroundImage: 'url(' + profile.avatar_url + ')'},
                            [profile.is_premium ? ('border: 2px solid var(--highlight-color)') : false ]
                        ]"> 
                        </div>
                        <div class="nickname-desc">
                            <div class="fullname">
                               <span style="display: flex;"> 
                                {{ profile.fullname }} 
                                    <span v-if="profile.is_verification === true"
                                        style="height: 16px;width: 16px; margin-left: 5px;"
                                    >
                                        <span class="checkcheck"></span>
                                    </span>
                                    <span v-if="profile.is_premium === true"
                                        style="height: 16px;width: 16px; margin-left: 5px;"
                                    >
                                        <span class="checkpremium"></span>
                                    </span>
                                </span>
                            </div>
                            <div class="nickanme">
                                @{{ profile.nickname }}
                            </div>
                            <div class="decs" v-text="profile.descript"></div>
                        </div>
                    </div>
                </NuxtLink>
            </div>
            </div>
        </div>
</template>

<style lang="scss">
#user-list-con {
    display: flex;
    width: 100%;
    flex-direction: column;
    .user-in-list {
        overflow: hidden;
        display: flex;
        width: 100%;
        border-radius: 25px;
        background-color: var(--main-color);
        outline: 1px solid var(--main-outline-color);
        flex-direction: column;
        a {
            text-decoration: none;
        }
        .user-cover {
            width: 100%;
            height: 112px;
            background-size: cover;
            background-position: center;
        }
        .user {
            display: flex;
            color: white;
            padding: 20px;
            .avatar {
                flex: 0 0 70px;
                width: 70px;
                height: 70px;
                border-radius: 100%;
                background-size: cover;
                background-position: center;
                background-color: #000000;
            }
            .nickname-desc {
                margin-left: 15px;
                max-width: 85%;
                .fullname {
                    font-weight: 700;
                    font-size: 20px;
                }
                .nickanme {
                    font-size: 16px;
                    color: #ABABAB;
                }
                .decs {
                    font-size: 16px;
                    margin-top: 10px;
                }
            }
        }
        &:not(:first-child) {
            margin-top: 20px;
        }
    }
}
</style>