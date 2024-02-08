<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

const toggleMobileMenu = () => {
    document.querySelector("#left").classList.toggle('mobile-menu');
}
</script>

<template>
    <div id="header">
        <img 
            src="@/icons/Menu.png" 
            alt="menu"
            id="mobile-menu-icon"
            height="27" 
            @click="toggleMobileMenu"
        >
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
    background-color: rgba(0, 0, 0, 0.8);
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    outline: 1px solid var(--main-outline-color);
    padding: 14px 20px 15px 20px;
    #mobile-menu-icon {
        cursor: pointer;
        display: block;
        position: relative;
        width: 0;
        left: -50px;
        height: 29px;
        transition: left .5s, filter .1s;
        transition-delay: filter .5s;
        @media (max-width: 615px) {
            left: 0;
            width: auto;
        }
        &:active {
            filter: invert(.5)
        }
    }
    #header-title {
        font-size: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        transition: margin-left .5s;
        @media (max-width: 615px) {
            margin-left: 15px;
        }
    }
}
.mobile-menu {
    flex : 1 1 80px !important;
}
</style>
