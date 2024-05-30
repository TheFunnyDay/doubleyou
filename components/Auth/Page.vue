<script setup>
const supabase = useSupabaseClient()
const isSignUp = ref(true);
const isForgotPassword = ref(false);
const loading = ref(false);
const email = ref('');
const password = ref('');
const avatar_url = ref('https://hathjgjcdclbalrbeeja.supabase.co/storage/v1/object/public/default/default_avatar.png')
const fullname = ref('')
const nickname = ref('')
const cover_url = ref('https://i.ibb.co/Z27gLm5/hbc-Fz-Xk-F6-HJ2-model-Name-model-Version-dreamlike-art.png')
const suggestedNicknames = ref([]);
const togglePopup = ref(false);
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
        if (error.status === 422) {
            alert("Эта почта уже используется")
        }
        if (error.status === 500) {
            alert("Пользователь с таким никнеймом уже существует")
        }
    } finally {
        loading.value = false
    }
}
// console.log(window.location.hostname)
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
        if (error.status === 400) {
            alert("Неверная почта или пароль")
        }
    } finally {
        loading.value = false;
    }
}

const handleForgotPassword = async () => {
    try {
        loading.value = true
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
            options: {
                shouldCreateUser: false,
                emailRedirectTo: `http://${window.location.hostname}:3000/settings`,
            },
        })
        togglePopup.value = !togglePopup.value
        if (error) throw error
    } catch (error) {
        alert(error.error_description || error.message)
    } finally {
        loading.value = false;
        setTimeout(() => {
            togglePopup.value = !togglePopup.value
        }, 5000)
    }
}
const loginBg = ref('');
onMounted(() => {
//Never mind
const bgImages = ['login-bg.jpg', 'login-bg2.jpg', 'login-bg3.jpg', 'login-bg4.jpg', 'login-bg5.jpg', 'login-bg6.jpg', 'login-bg7.jpg', 'login-bg8.jpg', 'login-bg9.jpg', 'login-bg10.jpg', 'login-bg11.jpg'];
    const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];
    loginBg.value = `url('${randomImage}')`;
});

const generateNicknames = () => {
    const emailParts = email.value.split('@')[0].split('.');
    const suggestions = [];

    if (emailParts.length >= 2) {
        suggestions.push(emailParts[0] + emailParts[1][0]);
    }

    if (emailParts.length >= 2) {
        suggestions.push(emailParts[0].slice(0, 2) + emailParts[1].slice(0, 2));
    }

    suggestions.push(emailParts[0] + Math.floor(Math.random() * 1000));

    suggestedNicknames.value = suggestions;
};

watch(email, (newEmail) => {
    if (newEmail.includes('@')) {
        generateNicknames();
    } else {
        suggestedNicknames.value = [];
    }
});

const selectNickname = (selectedNickname) => {
    nickname.value = selectedNickname;
};
</script>

<template>
    <div id="login-bg" :style="{ backgroundImage: loginBg }">
        <div id="authPage" :style="{backdropFilter: isSignUp ? '': 'blur(10px)'}">
            <div id="logo-hang">
                <img src="/doubleyou-logo-white.png" />
            </div>
            <div id="authForm">
                <img src="/doubleyou-logo-white.png" />
                <div v-if="isSignUp === true && !isForgotPassword">
                    <form @submit.prevent="handleSingUp">
                        <div>
                            <h1 style="color: white" class="header">Добро пожаловать в Дабл Ю!</h1>
                            <div>
                                <input class="inputField" type="email" placeholder="Почта" v-model="email" />
                                <input class="inputField" type="password" placeholder="Пароль" v-model="password" />
                                <div>
                                    <input class="inputField" type="text" placeholder="Имя" v-model="fullname" />
                                    <input class="inputField" type="text" placeholder="Никнейм" v-model="nickname" />
                                    <div>
                                        <ul class="suggestedNicknames">
                                            <li v-for="suggestedNickname in suggestedNicknames" :key="suggestedNickname"
                                                @click="selectNickname(suggestedNickname)">
                                                {{ suggestedNickname }}
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <input type="submit" :value="loading ? 'Загрузка' : 'Зарегистрироваться'"
                                    :disabled="loading" />
                            </div>
                            <p class="isSingUp" @click="isSignUp = !isSignUp">Уже зарегистрированы? Войти</p>
                        </div>
                    </form>
                </div>
                <div v-if="isSignUp === false && !isForgotPassword">
                    <form @submit.prevent="handleLogin">
                        <div>
                            <h1 style="color: white">С возвращением!</h1>
                            <div>
                                <input class="inputField" type="email" placeholder="Ваша почта" v-model="email"
                                    style="backdrop-filter: blur(0) !important;" />
                                <input class="inputField" type="password" placeholder="Ваш пароль" v-model="password"
                                    style="backdrop-filter: blur(0) !important;" />
                            </div>
                            <div>
                                <input type="submit" :value="loading ? 'Загрузка' : 'Войти'" :disabled="loading"
                                    style="backdrop-filter: blur(0) !important;" />
                            </div>
                            <p class="isSingUp" @click="isSignUp = !isSignUp">Еще не зарегистрированы?</p>
                            <p class="isSingUp" @click="isForgotPassword = !isForgotPassword">Забыли пароль?</p>
                        </div>
                    </form>
                </div>
                <div v-if="isForgotPassword">
                    <form @submit.prevent="handleForgotPassword">
                        <div>
                            <h1 style="color: white">Восстановление пароля</h1>
                            <p style="color: white; margin-top: 10px">После ввода почты Вы получите ссылку для мгновенного входа в аккаунт</p>
                            <div>
                                <input class="inputField" type="email" placeholder="Ваша почта" v-model="email"
                                    style="backdrop-filter: blur(0) !important;" />
                            </div>
                            <div>
                                <input type="submit" :value="loading ? 'Отправка' : 'Отправить'" :disabled="loading"
                                    style="backdrop-filter: blur(0) !important;" />
                            </div>
                            <p class="isSingUp" @click="isForgotPassword = !isForgotPassword; isSignUp = !isSignUp">Назад</p>
                        </div>
                    </form>
                    <ModalPopup v-if="togglePopup">Ссылка для мгновенного входа отправлена</ModalPopup>
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
            .suggestedNicknames {
                display: flex;
                width: 100%;
                height: 47px;
                li {
                    cursor: pointer;
                    margin-top: 10px;
                    color: var(--highlight-color);
                    background-color: var(--main-color-alpha);
                    padding: 10px;
                    border-radius: 10px;
                    transition: .3s color, .3s background-color;
                    text-decoration: none;
                    list-style: none;
                    user-select: none;
                    outline: 1px solid var(--main-outline-color);
                    &:hover {
                        color: #000000;
                        background-color: var(--highlight-color);
                    }
                    &:not(:first-child) {
                        margin-left: 10px;
                    }
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