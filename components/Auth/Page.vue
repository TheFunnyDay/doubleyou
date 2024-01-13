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
// watchEffect(() => {
//     if (user.value) {
//         router.push('/');
//     }
// })

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
    const bgImages = ['login-bg.png', 'login-bg2.jpg', 'login-bg3.png', 'login-bg4.png', 'login-bg5.png', 'login-bg6.png'];
    const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];
    loginBg.value = `url('/${randomImage}')`;
});
</script>

<template>
    <div id="login-bg" :style="{ backgroundImage: loginBg }">
        <div id="authPage" :style="{backdropFilter: isSignUp ? '': 'blur(10px)'}">
            <div id="authForm">
                <img src="/doubleyou-logo-white.png">
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
                                    
                                    <!-- <input class="inputField" type="text" placeholder="Ссылка на автарку" v-model="avatar_url" />  -->
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
        background-color: rgba(0, 0, 0, 0.705);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        transition: .3s backdrop-filter;
        img {
            user-select: none;
            width: 200px;
        }

    #authForm {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        input {
            width: 100%;
            font-size: 18px;
            padding: 10px;
            margin-top: 10px;
            background-color: var(--main-color-alpha);
            color: white;
            border: none;
            border-radius: 10px;
            transition: .3s color, .3s background-color;
            outline: 1px solid var(--main-outline-color);
            backdrop-filter: blur(10px);
            &:focus {
                color: #000000;
                background-color: var(--highlight-color);
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