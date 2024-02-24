<script setup>
useSeoMeta({
    title: 'О проекте | W',
});
const loginBg = ref('');
onMounted(() => {
    const bgImages = ['login-bg.jpg', 'login-bg2.jpg', 'login-bg3.jpg', 'login-bg4.jpg', 'login-bg5.jpg', 'login-bg10.jpg'];
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
        <div class="content">
            <p><b>DoubleYou</b> - ваша собственная сцена для самовыражения! Это уникальная социальная сеть, созданная для того, чтобы вы могли свободно делиться своим мнением, идеями и вдохновением. В отличие от других платформ, DoubleYou ставит перед собой задачу сделать процесс общения еще более интригующим и увлекательным.</p>
            <p>Основные возможности DoubleYou:</p>
            <ul>
                <li>Моментальные Публикации: Публикуйте свои мысли, фотографии, видео и аудиозаписи в реальном времени. DoubleYou предлагает быстрые и легкие инструменты для моментального обмена информацией.</li>
                <li>Стилизованные Профили: Выразите свою индивидуальность через стилизованные профили. Добавляйте фотографии, описывайте свои интересы и создавайте уникальный внешний вид для вашей страницы.</li>
                <li>Группы и Тематические Чаты: Присоединяйтесь к группам по интересам или создавайте свои собственные. Обсуждайте темы, которые вам близки, и находите единомышленников.</li>
                <li>Персональные Рекомендации: Алгоритм DoubleYou учитывает ваши интересы и предлагает контент, который может вас заинтересовать, делая ваш опыт использования платформы более удовлетворительным.</li>
                <li>Безопасность и Приватность: Мы придаем первостепенное значение вашей безопасности и приватности. DoubleYou предоставляет инструменты для управления настройками приватности и защиты вашей личной информации.</li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
.content {
    p {
        margin-top: 10px;
    }
    li {
        margin-top: 10px;
        margin-left: 25px;
    }
}
</style>