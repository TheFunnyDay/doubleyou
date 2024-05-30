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
    document.querySelector("html").style.cssText = '--main-bg-color: #101418; --main-text-color: #e0e2e8; --sub-text-color: #C5C8BA; --sub-text-color-hover: #000000; --main-color: #1d2024; --main-color-alpha: rgba(29, 32, 36, 0.8); --sub-color-alpha: rgba(29, 32, 36, 0.8); --sub-color: #272b30; --main-outline-color: #42474e; --main-border-color: #42474e; --highlight-color: #53ff78; --highlight-color-alpha: #2d3d34; --highlight-color-sub: #7a7a7a; --invert: 0;';

    await navigateTo('/login');
};
</script>

<template>
    <div id="leftBar">
        <div id="logo" @click="$router.push('/')"></div>
        <div id="leftBarMenu">
            <NuxtLink to="/" class="leftNav"><span class="material-symbols-rounded"> holiday_village </span><span class="leftNav-text">Главная</span></NuxtLink>
            <NuxtLink to="/userlists" class="leftNav"><span class="material-symbols-rounded"> group </span><span class="leftNav-text">Пользователи</span></NuxtLink>
            <NuxtLink to="/settings" class="leftNav"><span class="material-symbols-rounded"> settings </span><span class="leftNav-text">Настройки</span></NuxtLink>
            <NuxtLink to="/premium" class="leftNav"><img src="/doubleyou-logo-white.png" alt=""><span class="leftNav-text">Премиум</span></NuxtLink>
            <NuxtLink to="/about" class="leftNav"><span class="material-symbols-rounded"> info </span><span class="leftNav-text">О проекте</span></NuxtLink>
            <NuxtLink v-if="user" :to="'/user/' + userNickname" class="leftNav"><span class="avatar" :style="'background-image: url(' + (userAvatar || null) + ')'" alt=""></span><span class="leftNav-text">Профиль</span></NuxtLink>
            <p @click="logout" id="logout" class="leftNav"><span class="material-symbols-rounded"> logout </span><span class="leftNav-text">Выйти</span></p>
        </div>
    </div>
</template>

<style lang="scss">
    #leftBar {
        position: fixed;
        margin-right: 10px;
        margin-left: 10px;
        margin-top: 15px;
        max-width: 205px;
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
            margin-left: 10px;
            @media (max-width: 1080px) {
                margin-left: 5px;
            }
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
                padding-block: 10px;
                padding-inline: 15px;
                margin-top: 10px;
                align-items: center;
                justify-content: flex-start;
                flex-direction: row;
                border-radius: 25px;
                transition: .1s background-color, .1s color;
                &:hover {
                    background-color: var(--highlight-color);
                    .leftNav-text {
                        color: var(--sub-text-color-hover);
                    }
                    img {
                        filter: invert(1);
                    }
                    .material-symbols-rounded {
                        color: var(--sub-text-color-hover);
                    }
                }
                &:active {
                    outline: 1px solid var(--main-outline-color);
                }
                img {
                    filter: invert(var(--invert));
                    width: 30px;
                    margin-right: 10px;
                    @media (max-width: 1080px) {
                        margin-right: 0;
                    }
                }
                .material-symbols-rounded {
                    font-size: 30px;
                    width: 30px;
                    height: 30px;
                    margin-right: 10px;
                    @media (max-width: 1080px) {
                        margin-right: 0;
                    }
                }
                .avatar {
                    width: 30px;
                    height: 30px;
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