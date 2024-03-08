<script setup>
const supabase = useSupabaseClient()
const isSignUp = ref(true)
const loading = ref(false);
const email = ref('');
const password = ref('');
const avatar_url = ref('https://i.pinimg.com/236x/10/c5/43/10c543516e4c1a6528c90edbc7676a0c.jpg')
const fullname = ref('')
const nickname = ref('')
const cover_url = ref('https://i.ibb.co/Z27gLm5/hbc-Fz-Xk-F6-HJ2-model-Name-model-Version-dreamlike-art.png')

useSeoMeta({
    title: 'Авторизация | W',
});

const handleSingUp = async () => {
    try {
        loading.value = true
        const { error } = await supabase.auth.signUp(
            {
                email: email.value,
                password: password.value,
                options: {
                    data: {
                        fullname: fullname.value,
                        nickname: nickname.value,
                        avatar_url: avatar_url.value,
                        cover_url: cover_url.value
                    },
                }
            }
        )

        if (error) throw error
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}
const handleLogin = async () => {
    try {
        loading.value = true
        const { error } = await supabase.auth.signInWithPassword(
            {
                email: email.value,
                password: password.value,
            }
        )

        if (error) throw error
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false
    }
}

const loginBg = ref('');
onMounted(() => {
const bgImages = ['https://i.ibb.co/6ZhLx5g/anime-anime-girls-hentai-ass-panties-1511555-wallhere-com.png', 'https://i.artfile.ru/4260x2400_1353123_%5Bwww.ArtFile.ru%5D.jpg', 'https://media1.tenor.com/m/QZG9CftjeQQAAAAC/abstract-pattern.gif' ];
// const bgImages = ['login-bg.jpg', 'login-bg2.jpg', 'login-bg3.jpg', 'login-bg4.jpg', 'login-bg5.jpg', 'login-bg6.jpg', 'login-bg7.jpg', 'login-bg8.jpg', 'login-bg9.jpg', 'login-bg10.jpg', 'login-bg11.jpg'];
    const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];
    loginBg.value = `url('${randomImage}')`;
});
</script>

<template>
    <div id="login-bg" :style="{ backgroundImage: loginBg }">
        <div id="authPage" :style="{backdropFilter: isSignUp ? '': 'blur(10px)'}">
            <div id="logo-hang">
                <img src="/doubleyou-logo-white.png" />
            </div>
            <div id="authForm" >
                <img src="/doubleyou-logo-white.png" />
                <div v-if="isSignUp === true">
                    <form @submit.prevent="handleSingUp">
                        <div>
                            <h1 style="color: white" class="header">Добро пожаловать в Дабл Ю!</h1>
                            <div>
                                <input class="inputField" type="email" placeholder="Почта" v-model="email" />
                                <input class="inputField" type="password" placeholder="Пароль" v-model="password" />
                                <div>
                                    <input class="inputField" type="text" placeholder="ФИО" v-model="fullname" />
                                    <input class="inputField" type="text" placeholder="Никнейм" v-model="nickname" />                                    
                                </div>
                            </div>
                            <div>
                                <input type="submit" :value="loading ? 'Загрузка' : 'Зарегистрироваться'" :disabled="loading" />
                            </div>
                            <p class="isSingUp" @click="isSignUp = !isSignUp">Уже зарегистрированы? Войти</p>
                        </div>
                    </form>
                </div>
                <div v-if="isSignUp === false">
                    <form  @submit.prevent="handleLogin">
                        <div >
                            <h1 style="color: white">С возвращением!</h1>
                            <div>
                                <input class="inputField" type="email" placeholder="Ваша почта" v-model="email" style="backdrop-filter: blur(0) !important;"/>
                                <input class="inputField" type="password" placeholder="Ваш пароль" v-model="password" style="backdrop-filter: blur(0) !important;"/>
                            </div>
                            <div>
                                <input type="submit" :value="loading ? 'Загрузка' : 'Войти'" :disabled="loading" style="backdrop-filter: blur(0) !important;"/>
                            </div>
                            <p class="isSingUp" @click="isSignUp = !isSignUp">Еще не зарегистрированы?</p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
#login-bg {
    display: flex;
    background-color: black;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    #authPage {
        background-color: rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: right;
        align-items: center;
        color: white;
        transition: .3s backdrop-filter;

        #logo-hang {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            transition: width .5s;
            img {
                position: relative;
                user-select: none;
                max-width: 400px;
                width: 100%;
                padding: 10px;
                transition: .3s;
                @media (max-width: 1080px) {
                    // left: -500px;
                    width: 0;
                }
            }
            @media (max-width: 1080px) {
                width: 0;
            }
        }
        #authForm {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-inline: 50px;
            align-items: center;
            background-color: rgba(0, 0, 0, .89);
            backdrop-filter: blur(5px);
            height: 100%;
            width: 100%;
            max-width: 800px;
            transition: background-color .5s;
            @media (max-width: 1080px) {
                background-color: rgba(0, 0, 0, .5);
                padding: 20px;
                max-width: none;
                width: 100%;
                backdrop-filter: none;
            }
            img {
                width: 0;
                position: relative;
                user-select: none;
                max-width: 200px;
                padding: 10px;
                transition: width .5s;
                @media (max-width: 1080px) {
                    width: 100%;
                }
            }
            input {
                width: 100%;
                font-size: 18px;
                padding: 16px;
                margin-top: 10px;
                background-color: var(--main-color-alpha);
                color: white;
                border: none;
                border-radius: 16px;
                transition: .3s color, .3s background-color;
                outline: 1px solid var(--main-outline-color);
                transition: padding .5s;            
                &:focus {
                    color: #000000;
                    background-color: var(--highlight-color);
                }
                @media (max-width: 1080px) {
                    padding: 12px;
                }
            }

            input[type="submit"] {
                cursor: pointer;
                transition: .3s color, .3s background-color;
                &:hover {
                    color: #000000;
                    background-color: var(--highlight-color);
                }
            }
            .isSingUp {
                cursor: pointer;
                margin-top: 10px;
                color: var(--highlight-color);
                text-decoration: underline;
                user-select: none;
                transition: .3s color;
                &:hover {
                    color: var(--highlight-color-sub);
                }
            }
        }
        h1, p {
            text-align: center;
            user-select: none;
        }
}
}
</style>