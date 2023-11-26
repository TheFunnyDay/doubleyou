<script setup>
    const user = useSupabaseUser();
    const supabase = useSupabaseClient()
    const userAvatar = user.value.user_metadata.avatar_url || 1;
    const userNickname = user.value.user_metadata.nickname || 1;


const logout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error(error);
        return;
    }

    await navigateTo('/login');
};
</script>

<template>
    <div id="leftBar">
        <div id="logo" @click="$router.push('/')"></div>
        <div id="leftBarMenu">
            <NuxtLink to="/" class="leftNav"><img src="/icons/home.png" alt="">Главная</NuxtLink>
            <NuxtLink to="/userlists" class="leftNav"><img src="/icons/people.png" alt="">Пользователи</NuxtLink>
            <NuxtLink to="/settings" class="leftNav"><img src="/icons/settings.png" alt="">Настройки</NuxtLink>
            <NuxtLink v-if="user" :to="'/user/' + userNickname" class="leftNav"><span class="avatar" :style="'background-image: url(' + (userAvatar || null) + ')'" alt=""></span>Профиль</NuxtLink>
            <p @click="logout" id="logout" class="leftNav"> Выйти</p>
        </div>
    </div>
</template>

<style lang="scss">
    #leftBar {
        position: fixed;
        margin-right: 10px;
        margin-left: 10px;
        margin-top: 15px;
        max-width: 200px;
        height: 100%;
        #logo  {
            cursor: pointer;
            width: 50px;
            height: 50px;
            // background-color: red;
            background-image: url('/doubleyou-logo-white.png');
            background-position: center;
            background-size: cover;
            background-repeat: no-repeat;
        }
        #leftBarMenu {
            .leftNav {
                cursor: pointer;
                user-select: none;
                display: flex;
                font-size: 20px;
                font-weight: 500;
                text-decoration: none;
                color: white;
                width: 100%;
                float: left;
                padding: 10px;
                margin-top: 10px;
                align-items: center;
                justify-content: flex-start;
                flex-direction: row;
                border-radius: 15px;
                &:hover {
                    background-color: #1D1D1D;
                    outline: 1px solid #3F3F3F;
                }
                &:active {
                    background-color: var(--highlight-color);
                    color: var(--sub-text-color-hover);
                    img {
                        filter: invert(1);
                    }
                }
                img {
                    width: 24px;
                    margin-right: 10px;
                }
                .avatar {
                    width: 26px;
                    height: 26px;
                    margin-right: 10px;
                    border-radius: 100%;
                    background-size: cover;
                    background-position: center;
                    outline: 2px solid var(--highlight-color);
                }
            }
        }
    }
</style>