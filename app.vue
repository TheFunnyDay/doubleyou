<script setup lang="ts">

const user = useSupabaseUser();


</script>

<template>
    <div id="app"> 
        <div v-if="user" style="width: 100%; height: 100%; display: flex;align-items: flex-start;">
            <div id="left">
                <SideMenusLeft />
            </div>

                <NuxtPage />
            <div id="right">
                <SideMenusRight />
            </div>
        </div>
        <AuthPage v-else/>

    </div>
</template>
<style lang="scss">
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
        }

        #right {
            display: flex;
            // background-color: white;
            flex: 1 1 auto;
            flex-direction: column;
            align-items: flex-end;
            flex-wrap: wrap;
            justify-content: flex-start;
            transition: .1s;
        }
        @media (max-width: 700px) {
            #right {
                flex: 0;
                padding-left: 10px;
            }
        }
        @media (max-width: 615px) {
            #right {
                flex: 0;
                padding-left: 0;
            }
        }
        @media (max-width: 615px) {
            #left {
                flex: 0;
            }
        }
    }
</style>
