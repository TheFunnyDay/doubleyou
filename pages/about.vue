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
        <div class="content about-bg" :style="{ backgroundImage: loginBg }" style="padding: 0; overflow: hidden;">
            <div style="display: flex; align-items: center;">
                <video src="/about-video.mp4" playsinline autoplay muted style="width: 100%;"></video>

            </div>
        </div>
        <div class="content">
            <h1>Что такое Дабл Ю?</h1>
            <p><b>Дабл Ю</b> - ваша собственная сцена для самовыражения! Это уникальная социальная сеть, созданная для того, чтобы вы могли свободно делиться своим мнением, идеями и вдохновением. В отличие от других платформ, Дабл Ю ставит перед собой задачу сделать процесс общения еще более интригующим и увлекательным.</p>
            <p>Основные возможности Дабл Ю:</p>
            <ul>
                <li>Моментальные Публикации: Публикуйте свои мысли и фотографии в реальном времени. Дабл Ю предлагает быстрые и легкие инструменты для моментального обмена информацией.</li>
                <li>Стилизованные Профили: Выразите свою индивидуальность через стилизованные профили. Добавляйте фотографии, описывайте свои интересы и создавайте уникальный внешний вид для вашей страницы.</li>
                <li>Безопасность и Приватность: Мы придаем первостепенное значение вашей безопасности и приватности. Дабл Ю предоставляет инструменты для управления настройками приватности и защиты вашей личной информации.</li>
            </ul>
        </div>
        <div class="content">
            <h1>Будет ли проект развиваться?</h1>
            <p>Да, Дабл Ю будет активно развиваться.</p>
            <p>На данный момент, после представления первой версии данной социальной сети, планируться добавить: </p>
            <ul>
                <li>Прикпрепление видео к публикациям</li>
                <li>Прикпрепление аудио к публикациям</li>
                <li>Прикпрепление до 3 картинок к публикациям</li>
                <li>Истории (или, если понятнее, "сторис")</li>
                <li>Рекомендации за счет лайков и подписок</li>
                <li>Сообщества</li>
                <li>Личые сообщения</li>
                <li>Больше возможностей для премиум пользователей</li>
            </ul>
        </div>
        <div class="content">
            <h1>Но, как и у всего, есть свое НО.</h1>
            <p>Все это будет реализовавыться не раньше чем через 1 год по предвиденным (непредвиденным) причинам.</p>
        </div>
        <div class="content">
            <h1>Инфо</h1>
            <p>Автор проекта: <a href="https://github.com/thefunnyday" target="_blank">Никита Голубев</a></p>
            <p>По вопросам или жалобам: <a href="https://t.me/thefunnyday" target="_blank">Телеграм</a></p>
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
    a {
        color: var(--highlight-color);
    }
}
.about-bg {
    display: flex;
    padding: 0px;
    justify-content: center;
    align-items: center;
    height: 400px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    img {
        max-width: 200px;
        width: 100%;
        margin-inline: 10px;
    }
}
</style>