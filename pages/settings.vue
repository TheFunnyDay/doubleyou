<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
const amoledTheme = ` --main-bg-color: #000000; --main-text-color: #ffffff; --sub-text-color: #ABABAB; --sub-text-color-hover: #000000; --main-color: #000000; --main-color-alpha: rgba(29, 29, 29, 0.8); --sub-color-alpha: rgba(0, 0, 0, 0.8); --sub-color: #0f0f0f; --main-outline-color: #2f3633; --main-border-color: #3f3f3f; --highlight-color: #00dc82; --highlight-color-alpha: #1a2923; --highlight-color-sub: #7a7a7a; --invert: 0;`;
const whiteTheme = `--main-bg-color: #f7f9ff;--main-text-color: #181c20;--sub-text-color: #42474e;--sub-text-color-hover: #000000;--main-color: #fefeff;--main-color-alpha: rgba(210, 212, 216, 0.8);--sub-color-alpha: rgba(255, 255, 255, 0.8);--sub-color: #f1f1f1;--main-outline-color: #c2c7cf;--main-border-color: #c2c7cf;--highlight-color: #22c277;--highlight-color-alpha: #c3ebd7;--highlight-color-sub: #7a7a7a;--invert: 1;`
const darkTheme = `--main-bg-color: #101418; --main-text-color: #e0e2e8; --sub-text-color: #C5C8BA; --sub-text-color-hover: #000000; --main-color: #1d2024; --main-color-alpha: rgba(29, 32, 36, 0.8) ; --sub-color-alpha: rgba(29, 32, 36, 0.8); --sub-color: #272b30; --main-outline-color: #42474e; --main-border-color: #42474e; --highlight-color: #53ff78; --highlight-color-alpha: #2d3d34; --highlight-color-sub: #7a7a7a; --invert: 0;`

useSeoMeta({
    title: 'Настройки профиля | W',
});
 
const togglePopup = ref(false);
const disabledSave = ref(false);
//Применить тему
const setTheme = (theme) => {
    localStorage.setItem('userTheme', theme);
    document.querySelector("html").style.cssText = theme;
}

const { data: profile } = await useAsyncData('profiles', async () => {
    const { data } = await supabase
        .from('profiles')
        .select(`
            "avatar_url",
            "cover_url"
        `)
        .eq("id", user.value.id)
        .single();
    return data;
});

const userNickname = ref(user.value.user_metadata.nickname);
const userFullname  = ref(user.value.user_metadata.fullname);
const userAvatar = ref(user.value.user_metadata.avatar_url);
const userCover = ref(user.value.user_metadata.cover_url || null);

const handleUserMetaUpdate = async () => {
    try {
            const { data, error } = await supabase.auth.updateUser({
        data: {
            fullname: userFullname.value,
            nickname: userNickname.value,
            avatar_url: userAvatar.value,
            cover_url: userCover.value
        }
    })
    if (error) throw error 
    togglePopup.value = !togglePopup.value
    disabledSave.value = true
    document.querySelector("#cover-setting").style.backgroundImage = `url(${userCover.value})`
    document.querySelector("#user-avatar").style.backgroundImage = `url(${userAvatar.value})`
    setTimeout(() => {
        togglePopup.value = !togglePopup.value
        disabledSave.value = false
    }, 3000)
    
    } catch (error) {
        alert(error.error_description || error.message)
    }
}


</script>

<template>
    <div id="wall-content">
        <ModalPopup v-if="togglePopup">Настройки сохранены</ModalPopup>
        <Header title="Настройки"/>
        <Loading v-if="!profile" />
        <div class="content" v-else>
            <h1>Настройки профиля</h1>
            <div id="cover-setting" class="main-margin" :style="'background-image: url(' + profile.cover_url + ')'"></div>
            <div class="main-margin" id="profile-setting">
                <div id="user-avatar-setting">
                    <div id="user-avatar" :style="'background-image: url(' + profile.avatar_url + ')'"></div>
                </div>
                <div id="settings-section">
                    <form @submit.prevent="handleUserMetaUpdate">
                        <p>ФИО</p>
                        <input type="text" name="" v-model="userFullname" class="main-input" />
                        <p class="main-margin">Никнейм</p>
                        <input type="text" name="" v-model="userNickname" class="main-input" />
                        <p class="main-margin">Почта</p>
                        <input type="email" name="" id="" class="main-input not-available" disabled="true" :value="user.email" style="user-select:  none; pointer-events:none"/>
                        <p class="main-margin">Аватарка</p>
                        <input type="text" name="" v-model="userAvatar" class="main-input" />
                        <p class="main-margin">Обложка</p>
                        <input type="text" name="" v-model="userCover" class="main-input" />
                        <input type="submit" :disabled="disabledSave"  value="Сохранить" class="button main-margin">
                    </form>
                        
                </div>
            </div>
        </div>
        <div class="content">
            <h1>Настройка цветовой схемы</h1>
            <div class="color-setup">
                <div class="button" style="background-color: #000; color: white" @click="setTheme(amoledTheme)">Амолед</div>
                <div class="button" style="background-color: rgb(28, 28, 28); color: white" @click="setTheme(darkTheme)">Темная</div>
                <div class="button" style="background-color: #fff; color: black" @click="setTheme(whiteTheme)">Светлая</div>
            </div>
        </div>
    </div>    
</template>

<style lang="scss">
    .content {
        margin-top: 20px;
        border-radius: 25px;
        h1 {
            margin-bottom: 20px;
        }
        #cover-setting {
            width: 100%;
            height: 200px;
            background-image: url('https://wallpaperaccess.com/full/723583.jpg');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            border-radius: 25px;
        }
        #profile-setting {
            padding-inline: 20px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            @media (max-width: 633px) {
                position: relative;
                flex-direction: column;
                align-items: center;
                bottom: 100px;
            }
            #settings-section {
                width: 65%;
                @media (max-width: 633px) {
                    width: 100%;
                }
            }
            #user-avatar-setting {
                display: flex;
                position: relative;
                bottom: 100px;
                flex-direction: column;
                align-items: center;
                @media (max-width: 633px) {
                    bottom: 0px;
                }
                #user-avatar {
                    outline: 2px solid var(--main-outline-color);
                    border-radius: 100%;
                    width: 150px;
                    height: 150px;
                    background-color: var(--main-bg-color);
                    background-size: cover;
                    background-position: center;
                    background-repeat: no-repeat;
                }
            }
        }
        .color-setup {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            .button {
                border-radius: 25px;
                &:not(:first-child) {
                    margin-left: 10px;
                }
                &:hover {
                    color: black;
                    outline-color: var(--highlight-color);
                    background-color: var(--highlight-color) !important;
                }
            }
        }
    }
</style>