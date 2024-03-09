<script setup>
const props = defineProps({
    StatusText: String
})

</script>

<template>
    <div id="modalPopup">
        <div id="modalPopupContent">
            <p><slot/></p>
        </div>
    </div>
</template>

<style lang="scss">
#modalPopup {
    z-index: 99;
    position: fixed;
    bottom: 20px;
    max-width: 600px;
    width: 100%;
    background-color: red;
    border-radius: 10px;
    padding: 10px;
    background-color: var(--highlight-color);
    backdrop-filter: blur(5px);
    box-shadow:  0 0 15px var(--highlight-color);
    transition: max-width .3s;
    @media (max-width: 780px) {
        max-width: 520px;
    }
    @media (max-width: 633px) {
        max-width: 90%;
        bottom: 85px;
    }
    #modalPopupContent {
        display: flex;
        flex-direction: column;
        p {
            margin-block: 10px;
            font-size: 18px;
            font-weight: 700;
            color: black;
        }
    }
}
</style>