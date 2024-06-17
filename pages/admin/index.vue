<script setup>

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const post_id = ref('');
const postPreview = ref({});
const userPreview = ref({});
const usersList = ref([]);
const selectedUserId = ref(null);




const { data: checkAdminStatus } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.value.id)
    .single();

const fetchUsersList = async () => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('id, fullname, nickname');
        if (error) throw error;
        usersList.value = data;
    } catch (error) {
        console.log(error);
        alert('Ошибка при загрузке списка пользователей');
    }
};

const fetchPostPreview = async (id) => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .select(`
                id,
                created_at,
                post_text,
                post_image,
                author_id,
                likes_count,
                is_reply_to,
                profiles (
                    nickname,
                    fullname,
                    avatar_url,
                    is_premium,
                    is_verification
                )
            `)
            .eq('id', id)
            .single();
        if (error) throw error;
        postPreview.value = data;
        console.log(data);
    } catch (error) {
        console.log(error);
        alert('Публикация не найдена');
        postPreview.value = null;
    }
};

const fetchUserPreview = async (id) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', id)
            .single();
        if (error) throw error;
        userPreview.value = data;
        console.log(data);
    } catch (error) {
        console.log(error);
        alert('Пользователь не найден');
        userPreview.value = null;
    }
};

const updateUser = async (id, updates) => {
    try {
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', id);
        if (error) throw error;
        alert('Данные пользователя обновлены');
        userPreview.value = { ...userPreview.value, ...updates };
    } catch (error) {
        console.log(error);
        alert('Ошибка при обновлении данных пользователя');
    }
};

const resetAvatar = async (id) => {
    await updateUser(id, { avatar_url: 'https://i.ibb.co/njdyDjP/Monochrome-green-and-white-no-faces-anime-girl-996232653-aqnr1cx-MTPe4-sd-counterfeit-2-5-dreamlike.png' });
};

const resetCover = async (id) => {
    await updateUser(id, { cover_url: 'https://i.ibb.co/Z27gLm5/hbc-Fz-Xk-F6-HJ2-model-Name-model-Version-dreamlike-art.png' });
};

const removePostByAdmin = async (id) => {
    try {
        const { data, error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);
        console.log(data, error);
        alert('Пост был удален');
        postPreview.value = null;
        post_id.value = '';
    } catch (error) {
        console.log(error);
    }
};

onMounted(() => {
    fetchUsersList();
});

const handleUserSelection = (event) => {
    const selectedId = event.target.value;
    fetchUserPreview(selectedId);
};

useSeoMeta({
    title: 'Админ панель | W',
});
</script>

<template>
    <div id="wall-content">
        <Header title="Админ панель"></Header>
        <div class="content" v-if="checkAdminStatus.role !== 'admin'">
            <h1>Вы не админ</h1>
            <p>Но как вы сюда попали?</p>
        </div>
        <div v-else style="display: flex; width: 100%; flex-direction: column">
            <div class="content">
                <h1>Управление публикацией</h1>
                <div class="splittedForm">
                    <input class="main-input" type="text" placeholder="ID публикации" v-model="post_id">
                    <div class="button" @click="fetchPostPreview(post_id)">Проверить</div>
                </div>
                <div class="post" v-if="postPreview && postPreview.profiles">
                    <p><b>id</b>: <a :href="'/post/' + postPreview.id" target="_blank"> {{ postPreview.id }}</a></p>
                    <p><b>Автор</b>: <a :href="'/user/' + postPreview.profiles.nickname" target="_blank"> {{ postPreview.profiles.fullname }}</a></p>
                    <p><b>Текст публикации</b>: {{ postPreview.post_text }}</p>
                    <p><b>Дата создания</b>: {{ new Date(postPreview.created_at).toLocaleDateString() }}</p>
                    <p><b>Время создания</b>: {{ new Date(postPreview.created_at).toLocaleTimeString() }}</p>
                    <p><b>Количество лайков</b>: {{ postPreview.likes_count }}</p>
                    <img v-if="postPreview.post_image" :src="postPreview.post_image" alt="post_image">
                    <p v-else><b>Картинка</b>: нет</p>
                    <div class="button" @click="removePostByAdmin(post_id)" style="margin-top: 15px;">Удалить</div>
                </div>
            </div>
            <div class="content">
                <h1>Управление пользователем</h1>
                <div class="splittedForm" style="margin-bottom: 20px;">
                    <select class="main-input select" v-model="selectedUserId" @change="handleUserSelection" required>
                        <option value="" selected disabled>Выберите пользователя</option>
                        <option v-for="user in usersList" :key="user.id" :value="user.id">
                            {{ user.fullname }} ({{ user.nickname }})
                        </option>
                    </select>
                </div>
                <div class="user" v-if="userPreview.id">
                    <p><b>id</b>: <a :href="'/user/' + userPreview.nickname" target="_blank"> {{ userPreview.id }}</a></p>
                    <p><b>Имя</b>: <input type="text" v-model="userPreview.fullname"></p>
                    <p><b>Никнейм</b>: <input type="text" v-model="userPreview.nickname"></p>
                    <p><b>Подтвержден</b>: <input type="checkbox" v-model="userPreview.is_verification"></p>
                    <p><b>Премиум</b>: <input type="checkbox" v-model="userPreview.is_premium"></p>
                    <div class="user-banner" :style="`background-image: url(${userPreview.cover_url})`">
                        <div class="user-avatar" :style="`background-image: url(${userPreview.avatar_url})`"></div>
                    </div>
                    <div class="button" @click="resetAvatar(userPreview.id)">Сбросить аватарку</div>
                    <div class="button" @click="resetCover(userPreview.id)">Сбросить обложку</div>
                    <div class="button" @click="updateUser(userPreview.id, {
                        fullname: userPreview.fullname,
                        nickname: userPreview.nickname,
                        is_verification: userPreview.is_verification,
                        is_premium: userPreview.is_premium
                    })">Сохранить изменения</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.select {
    &:active, &:focus {
        background-color: var(--sub-color);
        color: var(--main-text-color);
    }
}
a {
    color: var(--highlight-color);
}
input[type="checkbox"] {
    outline: none;
}
.post {
    cursor: default;
    &:hover {
        background-color: var(--main-color);
    }

    img {
        width: 100%;
        object-fit: contain;
        max-height: 500px;
        background-color: var(--main-bg-color);
        border-radius: 25px;
        margin-top: 25px;
        margin-bottom: 10px;
        outline: 1px solid var(--main-outline-color);
    }
}
.user {
    border-radius: 25px;
    outline: 1px solid var(--main-outline-color);
    padding: 25px;
    cursor: default;
    input, span {
        margin-left: 10px;
    }
    p {
        display: flex;
        align-items: center;
        input[type="text"] {
            width: 100%;
            border-radius: 0;
            font-size: 16px;
            border: none;
            outline: none;
            background: none;
            border-radius: 0;
            border-bottom: 1px solid var(--main-outline-color);
            padding: 5px 0;
            transition: .3s border-bottom;
            &:hover {
                border-bottom: 1px solid var(--highlight-color-alpha);
            }
            &:active, &:focus {
                border-bottom: 1px solid var(--highlight-color);
            }
        }
    }
    .user-banner {
        width: 100%;
        height: 200px;
        background-size: cover;
        background-position: center;
        border-radius: 25px;
        margin-top: 25px;
        margin-bottom: 10px;
        outline: 1px solid var(--main-outline-color);
        margin-bottom: 70px;
        .user-avatar {
            width: 130px;
            height: 130px;
            background-size: cover;
            background-position: center;
            border-radius: 50%;
            position: relative;
            left: 30px;
            top: 120px;
            outline: 3px solid var(--main-color);
        }
    }
    .button {
        width: 100%;
        margin-top: 15px;
    }
}
</style>
