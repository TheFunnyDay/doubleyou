<script setup>
const openModal = ref(false);
const router = useRouter();
const props = defineProps({
    title: {
        type: String,
        required: false,
        default: 'Главная'
    }
})
const toggleMobileMenu = () => {
    document.querySelector("#left").classList.toggle('mobile-menu');
    openModal.value = !openModal.value
}

const goBack = () => {
    router.back();
}
</script>

<template>
    <div id="header">
        <span 
            v-if="router !== null && router.currentRoute.value.path !== '/'"
            id="mobile-menu-icon"
            class="material-symbols-rounded" 
            @click="goBack()">arrow_back_ios</span>
        <span 
            v-else
            id="mobile-menu-icon"
            class="material-symbols-rounded"
            @click="toggleMobileMenu()"
        >menu</span>
        <h1 id="header-title">{{ (props.title || 'Главная') }}</h1>
    </div>    
</template>

<style lang="scss">
#header {
    user-select: none;
    display: flex;
    z-index: 99;
    position: sticky;
    top: 0;
    width: 100%;
    max-width: 646px;
    overflow: hidden;
    background-color: var(--sub-color-alpha);
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    outline: 1px solid var(--main-outline-color);
    padding: 14px 20px 15px 20px;
    border-radius:  0 0 25px 25px; 
    #mobile-menu-icon {
        filter: invert(var(--invert));
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 0;
        left: -50px;
        height: 29px;
        transition: left .5s, filter .1s;
        transition-delay: filter .5s;
        @media (max-width: 633px) {
            left: 0;
            padding-inline: 15px;
        }
        &:active {
            filter: invert(.5)
        }
    }
    #header-title {
        color: var(--main-text-color);
        font-size: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: margin-left .5s;
        @media (max-width: 633px) {
            margin-left: 15px;
        }
    }
}
.mobile-menu {
    flex : 1 1 90px !important;
}
</style>
