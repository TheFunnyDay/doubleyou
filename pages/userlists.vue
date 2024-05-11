<script setup>
    useSeoMeta({
        title: 'Список пользователей | W',
    });

    const supabase = useSupabaseClient();

    const { data: profiles } = await useAsyncData('profiles', async () => {
        let { data, error } = await supabase
        .from('profiles')
        .select('*').order('id', { ascending: true });
        if (error) throw error
        return data
    })
</script>

<template>
    <div id="wall-content">
            <Header title="Пользователи"/>
            <div id="user-list-con">
                <input type="text" placeholder="Поиск пользователя" id="users-search" />
                <Loading v-if="!profiles || profiles.length === 0"/>
                <div class="user-in-list" v-for="profile in profiles" :key="profile.id" v-else>
                <NuxtLink :to="'/user/' + profile.nickname">
                    <div class="user-cover" 
                    :style="'background-image: url(' + profile.cover_url + ')'"
                    v-if="profile.cover_url !== null && profile.is_premium=== true">
                    </div>
                    <div class="user"
                        :style="
                        [
                            profile.is_premium ? ('padding: 10px 20px 0px 20px;') : ('padding: 20px;') 
                        ]"
                    >
                        <div class="avatar"                         
                        :style="
                        [
                            {backgroundImage: 'url(' + profile.avatar_url + ')'},
                            [profile.is_premium 
                                ? ('border: 2px solid var(--highlight-color); bottom: 58px;') 
                                : ('border: 2px solid var(--main-outline-color); flex: 0 0 80px; width: 80px; height: 80px; ')
                            ]
                        ]"
                        > 
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
    #users-search {
        width: 100%;
        padding: 25px;
        font-size: 18px;
        transition: .3s;
        border-radius: 25px;
        margin-top: 20px;
        &:focus {
            color: #000000;
            background-color: var(--highlight-color);
        }
    }
    .user-in-list {
        overflow: hidden;
        display: flex;
        width: 100%;
        background-color: var(--main-color);
        outline: 1px solid var(--main-outline-color);
        flex-direction: column;
        border-radius: 25px;
        margin-top: 20px;
        &:last-child {
            margin-bottom: 20px;
        }
        a {
            text-decoration: none;
        }
        .user-cover {
            width: 100%;
            height: 200px;
            background-size: cover;
            background-position: center;
            border-bottom: 1px solid var(--main-outline-color);
        }
        .user {
            display: flex;
            color: var(--main-text-color);
            padding: 20px;
            transition: background-color .3s;
            .avatar {
                position: relative;
                flex: 0 0 100px;
                width: 100px;
                height: 100px;
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
                    color: var(--sub-text-color);
                }
                .decs {
                    font-size: 16px;
                    margin-top: 10px;
                }
            }
        }
        &:hover {
            background-color: var(--highlight-color-alpha);
        }
    }
}
</style>