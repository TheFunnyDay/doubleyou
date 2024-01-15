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
            <div id="content-header" :style="{ backgroundImage: loginBg }"></div>
            <img src="doubleyou-logo-white.png" alt="KURWA" width="100">
        </div>
    </div>
</template>

<style lang="scss">
.content {
    overflow: hidden;
    #content-header {
        position: relative;
        top: -20px;
        left: -20px;
        width: 107%;
        height: 170px;
        background-size: cover;
        background-position: center;
        border-radius: 0 0 25px 25px;
        border-bottom: 1px solid var(--main-outline-color)
    }
    img {
        position: relative;
        top: -80px;
    }
}
</style>