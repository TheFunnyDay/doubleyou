<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const userAvatar = user.value.user_metadata.avatar_url;
const {data: checkPrem} = await supabase 
    .from('profiles')
    .select('is_premium')
    .eq('id', user.value.id)
    .single()

useSeoMeta({
    title: 'Премиум | W',
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
        <Header title="Премиум"></Header>
        <div class="content">
            <div class="premium-explain__text">
                <div class="premium_land" v-if="checkPrem.is_premium">
                    <div class="night">
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                        <div class="shooting_star"></div>
                    </div>

                    <div class="premium_land_img" :style="'background-image: url(' + (userAvatar || null) + ')'" ></div>
                    <div class="premium_land_text">
                        <h1>Поздравляем!</h1>
                        <p>Вы пользуетесь всеми возможностями премиум!</p>
                    </div>
                </div>
                <div class="premium_land" v-else>
                    <div class="premium_land_img" :style="'background-image: url(/doubleyou-logo-white.png)'" style="border-radius: 0; outline: none; filter: invert(var(--invert));" ></div>
                    <div class="premium_land_text">
                        <h1>Премиум</h1>
                        <p>О том, как поддержать проект, пишите автору проекта</p>
                    </div>
                </div>
                <div class="premium_land_description">
                    <div class="premium_fitch">
                        <div class="premium_fitch_img">
                            <div class="premuim_fitch_useravater" :style="'background-image: url(' + (userAvatar || null) + ')' "></div>
                        </div>
                        <div class="premium_fitch_text">
                            <h1>Рамка аватара</h1>
                            <p>Вам выдается рамка аватара, что показать вашу преданность и активное участие в проекте, подчеркивая ваш вклад в его развитие и успех. Это своего рода виртуальный билет в сообщество единомышленников, символизирующий вашу приверженность и важность вашего вклада в общее дело.</p>
                        </div>
                    </div>
                    <div class="premium_fitch">
                        <div class="premium_fitch_img" style="background-image: url('https://media1.tenor.com/m/rgJleMzUa8MAAAAC/bailes.gif');">
                        </div>
                        <div class="premium_fitch_text">
                            <h1>Анимированные аватар и обложка</h1>
                            <p>Вам предоставляется возможность не только использовать рамку аватара, но и внедрять анимированные аватары и обложки, добавляя вашему профилю дополнительную динамику и оригинальность. Это отличный способ выделиться среди других участников и подчеркнуть вашу индивидуальность, придавая вашему присутствию в проекте особый шарм и стиль.</p>
                        </div>
                    </div>
                    <div class="premium_fitch">
                        <div class="premium_fitch_img" style="background-image: url('https://media1.tenor.com/m/TLhWkKdr770AAAAd/giga-chad.gif');">
                        </div>
                        <div class="premium_fitch_text">
                            <h1>Выделение среди друнгих</h1>
                            <p>Получив возможность использовать анимированные аватары и обложки, вы сможете не только выделиться, но и привлечь внимание среди других пользователей в списках. Ваши яркие и оригинальные образы будут привлекать взгляды и вызывать интерес, делая ваш профиль заметным и запоминающимся среди остальных. Это отличный способ выделиться из толпы и подчеркнуть вашу уникальность в сообществе.</p>
                        </div>
                    </div>
                    <div class="premium_fitch" v-if="!checkPrem.is_premium">
                        <div class="premium_fitch_img" style="background-image: url('https://media.tenor.com/hCTuN6YIekoAAAAi/heart-art.gif');">
                        </div>
                        <div class="premium_fitch_text">
                            <h1>Благодарность</h1>
                            <p>Наша благодарность за вашу преданность и поддержку проекта. Ваше активное участие и вклад в его развитие неоценимы для нас ❤️</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>



.content {
    max-width: 646px;
    overflow: hidden;
    padding: 0;
        .premium-explain__text {
            display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            align-content: flex-end;
            align-items: flex-start;
            .premium_land {
                user-select: none;
                overflow: hidden;
                padding-block: 75px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                background: radial-gradient(ellipse at bottom, var(--highlight-color-alpha) 0%, var(--main-bg-color) 100%);
                .premium_land_img {
                    z-index: 2;
                    width: 200px;
                    height: 200px;
                    background-size: cover;
                    background-position: center;
                    border-radius: 100%;
                    outline: 4px solid var(--highlight-color);
                }
                .premium_land_text {
                    text-align: center;
                    z-index: 2;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin-top: 50px;
                    h1 {
                        margin: 0;
                        font-size: 24px;
                        font-weight: 700;
                        color: var(--main-text-color);
                    }
                    p {
                        font-size: 18px;
                        font-weight: 400;
                        color: var(--main-text-color);
                    }
                }
            }
            .premium_land_description {
                width: 100%;
                max-width: 646px;
                padding: 25px;
                border-radius: 25px;
                .premium_fitch {
                    display: flex;
                    border-radius: 25px;
                    outline: 1px solid var(--main-outline-color);
                    padding: 25px;
                    align-items: center;
                    box-shadow: 0 0 8px 0px rgb(0 0 0 / 30%);
                    &:not(:first-child) {
                        margin-block: 25px;
                    }
                    .premium_fitch_img {
                        flex: 0 0 130px;
                        width: 130px;
                        height: 130px;
                        background-size: cover;
                        background-position: center;
                        border-radius: 25px;
                        margin-right: 15px;
                        background-color: var(--main-bg-color);
                        padding: 25px;
                        @media (max-width: 633px) {
                            margin-right: 0;
                        }
                        .premuim_fitch_useravater {
                            width: 100%;
                            height: 100%;
                            border-radius: 100%;
                            background-size: cover;
                            background-position: center;
                            background-color: black;
                            outline: 3px solid var(--highlight-color);
                        }
                        
                    }
                    .premium_fitch_text {
                        h1 {
                            margin: 0;
                            font-size: 24px;
                            font-weight: 700;
                            color: var(--main-text-color);
                            @media (max-width: 633px) {
                                padding-top: 20px;
                            }
                        }
                        p {
                            font-size: 16px;
                            font-weight: 400;
                            color: var(--main-text-color);
                        }
                    }
                    @media (max-width: 633px) {
                        flex-direction: column;
                        outline: none;
                        box-shadow: none;
                        padding: 0;
                        h1 {
                            text-align: center;
                        }
                    }
                }
            }
        }
    }
    $shooting-time: 4000ms;

.night {
    position: relative;
    width: 100%;
    height: 100%;
    transform: rotateZ(27deg) translate(25px, 37px);
        // animation: sky 200000ms linear infinite;
}

.shooting_star {
    position: absolute;
    left: 50%;
    top: 50%;
    //   width: 100%;
    height: 2px;
    background: var(--highlight-color);
    border-radius: 999px;
    filter: drop-shadow(0 0 6px var(--highlight-color));
    animation:
        tail $shooting-time ease-in-out infinite,
        shooting $shooting-time ease-in-out infinite;

    &::before {
        content: '';
        position: absolute;
        top: calc(50% - 1px);
        right: 0;
        // width: 30px;
        height: 2px;
        background: var(--highlight-color);
        transform: translateX(50%) rotateZ(45deg);
        border-radius: 100%;
        animation: shining $shooting-time ease-in-out infinite;
    }

    &::after {
        // CodePen Error
        // @extend .shooting_star::before;

        content: '';
        position: absolute;
        top: calc(50% - 1px);
        right: 0;
        // width: 30px;
        height: 2px;
        background: var(--highlight-color);
        transform: translateX(50%) rotateZ(45deg);
        border-radius: 100%;
        animation: shining $shooting-time ease-in-out infinite;
        transform: translateX(50%) rotateZ(-45deg);
    }

    @for $i from 1 through 20 {
        &:nth-child(#{$i}) {
            $delay: random(9999) + 0ms;
            top: calc(50% - #{random(400) - 200px});
            left: calc(50% - #{random(300) + 0px});
            animation-delay: $delay;
            opacity: .8;

            &::before,
            &::after {
                animation-delay: $delay;
            }
        }
    }
}

@keyframes tail {
    0% {
        width: 0;
    }

    30% {
        width: 100px;
    }

    100% {
        width: 0;
    }
}

@keyframes shining {
    0% {
        width: 0;
    }

    50% {
        width: 30px;
    }

    100% {
        width: 0;
    }
}

@keyframes shooting {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(300px);
    }
}

@keyframes sky {
    0% {
        transform: rotate(45deg);
    }

    100% {
        transform: rotate(45 + 360deg);
    }
}
</style>