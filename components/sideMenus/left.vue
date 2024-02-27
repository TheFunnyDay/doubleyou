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
    localStorage.setItem('userTheme', null);
    document.querySelector("html").style.cssText = '--main-bg-color: #000000; --main-text-color: #ffffff; --sub-text-color: #ABABAB; --sub-text-color-hover: #000000; --main-color: #000000; --main-color-alpha: rgba(29, 29, 29, 0.8); --sub-color-alpha: rgba(0, 0, 0, 0.8); --sub-color: #0f0f0f; --main-outline-color: #2f3633; --main-border-color: #3f3f3f; --highlight-color: #00dc82; --highlight-color-alpha: #1a2923; --highlight-color-sub: #7a7a7a; --invert: 0;';

    await navigateTo('/login');
};
</script>

<template>
    <div id="leftBar">
        <div id="logo" @click="$router.push('/')"></div>
        <div id="leftBarMenu">
            <NuxtLink to="/" class="leftNav"><img src="/icons/home.png" alt=""><span class="leftNav-text">Главная</span></NuxtLink>
            <NuxtLink to="/userlists" class="leftNav"><img src="/icons/people.png" alt=""><span class="leftNav-text">Пользователи</span></NuxtLink>
            <NuxtLink to="/settings" class="leftNav"><img src="/icons/settings.png" alt=""><span class="leftNav-text">Настройки</span></NuxtLink>
            <NuxtLink to="/premium" class="leftNav"><img src="/doubleyou-logo-white.png" alt=""><span class="leftNav-text">Премиум</span></NuxtLink>
            <NuxtLink to="/about" class="leftNav"><img src="/icons/info.png" alt=""><span class="leftNav-text">О проекте</span></NuxtLink>
            <NuxtLink v-if="user" :to="'/user/' + userNickname" class="leftNav"><span class="avatar" :style="'background-image: url(' + (userAvatar || null) + ')'" alt=""></span><span class="leftNav-text">Профиль</span></NuxtLink>
            <p @click="logout" id="logout" class="leftNav"><img src="/icons/exit.png" alt=""><span class="leftNav-text">Выйти</span></p>
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
            filter: invert(var(--invert));
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
            display: flex;
            flex-direction: column;
            .leftNav {
                cursor: pointer;
                user-select: none;
                display: flex;
                font-size: 20px;
                font-weight: 400;
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
                    background-color: var(--main-color-alpha);
                    outline: 1px solid var(--main-outline-color);
                }
                &:active {
                    background-color: var(--highlight-color);
                    .leftNav-text {
                        color: var(--sub-text-color-hover);
                    }
                    img {
                        filter: invert(1);
                    }
                }
                img {
                    filter: invert(var(--invert));
                    width: 24px;
                    margin-right: 10px;
                    @media (max-width: 1080px) {
                        margin-right: 0;
                    }
                }
                .avatar {
                    width: 26px;
                    height: 26px;
                    margin-right: 10px;
                    border-radius: 100%;
                    background-size: cover;
                    background-position: center;
                    outline: 2px solid var(--highlight-color);
                    @media (max-width: 1080px) {
                        margin-right: 0;
                    }
                }
                .leftNav-text {
                    transition: .3s opacity;
                    overflow: hidden;
                    @media (max-width: 1080px) {
                        width: 0;
                        height: 0;
                        opacity: 0;
                    }
                }
                @media (max-width: 1080px) {
                    justify-content: center;
                }
            }
        }
    }
</style>