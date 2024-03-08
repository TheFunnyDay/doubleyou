<script setup>
const props = defineProps({
    image: String,
    authorName: String,
    authorAvatar: String,
    premium: Boolean,
    verified: Boolean,
    postText: String,
    ToggleView: Function
})  
</script>

<template>
    <div class="view-image" @click="() => ToggleView && ToggleView()">
        <div class="image-section" >
            <div class="image-holder">
                <img :src="image" alt="">
            </div>
        </div>
        <div class="post-info-section">
            <div class="user-info">
                <div class="avatar" :style="[
                    { 
                        backgroundImage: 'url(' + authorAvatar + ')',
                        border: premium ? '2px solid var(--highlight-color)' : 'none'
                    }
                ]"></div>
                <div class="nickname-container">
                    <div class="post-user-flname">
                        {{ authorName }}
                        <span v-if="verified === true"
                            style="height: 14px;width: 14px; margin-left: 5px;">
                            <span class="checkcheck"></span>
                        </span>
                        <span v-if="premium === true"
                            style="height: 14px;width: 14px; margin-left: 5px;">
                            <span class="checkpremium"></span>
                        </span>
                    </div>
                </div>
            </div>
            <div class="post-text" v-text="postText">
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.view-image {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 9999;
    display: flex;
    justify-content: space-between;
    backdrop-filter: blur(3px);
    transition: .3s backdrop-filter;
    .image-section {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        .image-holder {
            display: flex;
            align-items: center;
            @media (max-width: 633px) {
                flex: 1;
            }
            img {
                max-width: 100%;
                max-height: 100%;
                @media (max-width: 633px) {
                    width: 100%;
                }
            }
        }
    }
    .post-info-section {
        position: relative;
        padding: 10px;
        height: 100%;
        // background-color: var(--main-color);
        background-color: var(--main-color);
        width: 400px;
        outline: 1px solid var(--main-outline-color);
        transition: .3s;
        @media (max-width: 1080px) {

            // width: 0;
            // opacity: 0;
            // transform: translateX(101%);
            display: none;
        }
        .user-info {
            display: flex;
            align-items: center;
            // padding-bottom: 15px;
            .avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
            .nickname-container {
                margin-left: 10px;
                .post-user-flname {
                    display: flex;
                    font-size: 18px;
                    font-weight: 700;
                    color: var(--main-text-color);
                }
            }
        }
        .post-text {
            color: var(--main-text-color);
            padding-top: 10px;
            border-bottom: 1px solid var(--main-outline-color);
            padding-bottom: 10px;
        }
    }
    @media (max-width: 633px) {
        backdrop-filter: blur(0px);
    }
}
</style>