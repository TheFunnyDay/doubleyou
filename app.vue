<script setup lang="ts">

const user = useSupabaseUser();


</script>

<template>
    <div id="app" v-if="user">
        <div style="width: 100%; height: 100%; display: flex;align-items: flex-start;">
            <NuxtLoadingIndicator style="position: fixed; top: auto;" color="var(--highlight-color)" />
            <div id="left">
                <MenuLeft />
            </div>
            <NuxtPage />
            <MenuMobile />

            <div id="right">
                <MenuRight />
            </div>
        </div>
    </div>
    <div id="app" v-else>
        <ClientOnly>
            <AuthPage />
        </ClientOnly>
    </div>
</template>
<style lang="scss">
    .nuxt-loading-indicator {
        bottom: 0 !important;
        filter: brightness(0.5);
    }
    #app {
        position: absolute;
        width: 100%;
        height: 100%;

        #main {
            background-color: red;
        }

        #left {
            display: flex;
            // background-color: white;
            flex: 1 1 auto;
            flex-direction: column;
            align-items: flex-end;
            flex-wrap: wrap;
            justify-content: flex-start;
            transition: .3s flex;
        }

        #right {
            display: flex;
            // background-color: white;
            flex: 1 1 auto;
            flex-direction: column;
            align-items: flex-end;
            flex-wrap: wrap;
            justify-content: flex-start;
            transition: .3s;
        }
        @media (max-width: 700px) {
            #right {
                flex: 0;
                padding-left: 10px;
            }
        }
        @media (max-width: 633px) {
            #right {
                flex: 0;
                padding-left: 0;
            }
        }
        @media (max-width: 633px) {
            #left {
                flex: 0;
            }
        }
    }
</style>
