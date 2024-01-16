<script setup>
const loginBg = ref('');
onMounted(() => {
    const bgImages = ['login-bg.png', 'login-bg2.jpg', 'login-bg3.png', 'login-bg4.png', 'login-bg5.png', 'login-bg6.png'];
    const randomImage = bgImages[Math.floor(Math.random() * bgImages.length)];
    loginBg.value = `url('/${randomImage}')`;
});
</script>

<template>
    <div id="wall-content">
        <Header title="Премиум"></Header>
        <div class="content">
            <header class="content__header" :style="{ backgroundImage: loginBg }"></header>
            <div class="premium-explain">
                <div class="premium-explain__logo">
                    <img src="doubleyou-logo-black.png" alt="KURWA" width="120">
                    <h1>DoubleYou премиум</h1>
                </div>
                <div class="premium-explain__text">
                    <h1>Что это?</h1>
                    <p><b>DoubleYou премиум</b> позволяет пользователям отличаться от остальных. </p>
                    <p>В качестве благодарности за поддержку проекта, пользователям DoubleYou премиум предоставляются уникальные возможности, например:</p>
                    <h1>Окантовка аватара</h1>
                    <h1>Анимационный аватар</h1>
                    <h1>Специальный статус</h1>
                    <h1>Выделение среди других пользователей</h1>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.content {
    overflow: hidden;
    .content__header {
        position: relative;
        top: -20px;
        left: -20px;
        width: 107%;
        height: 170px;
        background-size: cover;
        background-position: center;
        border-radius: 0 0 25px 25px;
        border-bottom: 1px solid var(--main-outline-color);
        filter: brightness(0.8);
    }
    .premium-explain {
        position: relative;
        top: -80px;
        .premium-explain__logo {
        display: flex;
        align-items: flex-start;
        flex-wrap: nowrap;
        flex-direction: row;
            img {
                background-color: var(--highlight-color);
                padding: 10px;
                margin-right: 10px;
                border-radius: 25px;
            }
            h1 {
                font-weight: bold;
                font-size: 36px;
                margin-top: 36px;
            }
        }
        .premium-explain__text {
            display: flex;
            position: relative;
            top: -30px;
            width: 79%;
            flex-direction: column;
            flex-wrap: nowrap;
            align-content: flex-end;
            align-items: flex-start;
            margin-left: 130px;
            h1 {
                margin-block: 10px;
            }
            p {
                margin-top: 10px;
            }
        }
    }
}
</style>