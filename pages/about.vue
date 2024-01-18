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
        <Header title="О проекте"/>
        <div class="content" :style="{ backgroundImage: loginBg }" style="background-size: cover;">
            <div style="display: flex; align-items: center;">
                <img src="/doubleyou-logo-white.png" width="100">
                <h1 style="margin-left: 10px; font-size: 2em;">DoubleYou</h1>
            </div>
        </div>
        <div class="content main-margin">
            <p><b>DoubleYou</b> - это социальная сеть, которая предоставляет пользователям возможность делиться своим мнением</p>
        </div>
    </div>
</template>

<style lang="scss">

</style>