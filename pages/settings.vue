<script setup>
const user = useSupabaseUser();
const supabase = useSupabaseClient();
console.log(user.value)
const { data: profile } = await useAsyncData('profiles', async () => {
    const { data } = await supabase.from('profiles')
        .select(`
            "avatar_url",
            "cover_url"
        `)
        .eq("id", user.value.id)
        .limit(1)
        .single();
    return data;
});

// const { data, error } = await supabase.auth.updateUser({
//   data: { avatar_url: 'https://media.tenor.com/pBAFPxVlpmgAAAAd/cat.gif' }
// })

// console.log(user.value)
</script>

<template>
    <div id="wall-content">
        <Header title="Настройки"/>
        <div class="content">
            <h1>Настройки профиля</h1>
            <div id="cover-setting" class="main-margin" :style="'background-image: url(' + profile.cover_url + ')'"></div>
            <div class="main-margin" id="profile-setting">
                <div id="user-avatar-setting">
                    <div id="user-avatar" :style="'background-image: url(' + profile.avatar_url + ')'"></div>
                    <p class="button main-margin">Сменить</p>
                </div>
                <div style="width:65%;">
                    <form>
                        <p>ФИО</p>
                        <input type="text" name="" id="" class="main-input" value="expemple">
                        <p class="main-margin">Никнейм</p>
                        <input type="text" name="" id="" class="main-input" value="expemple">
                        <p class="main-margin">Почта</p>
                        <input type="email" name="" id="" class="main-input" value="expemple@example.com">
                    </form>
                </div>
            </div>
        </div>
        <div class="content main-margin">
            <h1>Тут ничего нет</h1>
        </div>
    </div>    
</template>

<style lang="scss">
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
        #user-avatar-setting {
            display: flex;
            position: relative;
            bottom: 100px;
            flex-direction: column;
            align-items: center;
            #user-avatar {
                outline: 5px solid var(--main-color);
                border-radius: 100%;
                width: 150px;
                height: 150px;
                background-color: var(--main-bg-color);
                // background-image: url('https://i.pinimg.com/originals/03/d8/7b/03d87b05c68faf9770ff5c574545a3f7.jpg');
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
            }
        }
    }
</style>