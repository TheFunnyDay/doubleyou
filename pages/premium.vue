<script setup>
useSeoMeta({
    title: 'Премиум | W',
});
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
        <div class="content" :style="{ backgroundImage: loginBg }" style="background-size: cover;">
            <div style="display: flex; align-items: center;">
                <img src="/doubleyou-logo-white.png" width="100">
                <h1 style="margin-left: 10px; font-size: 2em;">DoubleYou Премиум</h1>
            </div>
        </div>
        <div class="content main-margin">
            <div class="premium-explain__text">
                    <h1>Что это?</h1>
                    <p><b>DoubleYou премиум</b> позволяет пользователям отличаться от остальных. </p>
                    <p>В качестве благодарности за поддержку проекта, пользователям DoubleYou премиум предоставляются уникальные возможности, например:</p>
                    <h1>Рамка аватара</h1>
                    <img src="@/premium/avatar-border.png"/>
                    <h1>Анимированный аватар и обложка</h1>
                    <img src="@/premium/profile-anim.gif"/>
                    <h1>Выделение среди других пользователей</h1>
                    <img src="@/premium/im-premium.png"/>
                    <p>DoubleYou создан для того, чтобы быть площадкой для творчества, обмена идей и поддержки. Присоединяйтесь к нам и делитесь своим миром с сообществом, где ваш голос действительно имеет значение.</p>
                </div>
        </div>
    </div>
</template>

<style lang="scss">
.content {
    max-width: 646px;
    overflow: hidden;
        .premium-explain__text {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            align-content: flex-end;
            align-items: flex-start;
            h1 {
                margin-block: 10px;
                &:first-child {
                    margin-block: 0;
                }
            }
            p {
                margin-top: 10px;
            }
            img {
                width: 100%;
                border-radius: 26px;
                outline: 1px solid var(--main-outline-color);
            }
        }
    }
</style>