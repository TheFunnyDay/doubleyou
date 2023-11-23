<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true
    }
})
</script>

<template>
    <div id="header">
        <h1 id="header-title">{{ (props.title || 'Главная') }}</h1>
    </div>    
</template>

<style lang="scss">
#header {
    z-index: 99;
    position: sticky;
    top: 0;
    margin-bottom: 20px;
    width: 100%;
    max-width: 646px;
    overflow: hidden;
    background-color: rgba(28, 28, 28, 0.8);
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);
    outline: 1px solid var(--main-outline-color);
    padding: 14px 20px 15px 20px;
    border-radius: 0 0 25px 25px;
    #header-title {
        font-size: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
</style>
