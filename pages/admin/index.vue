<script setup>

const user = useSupabaseUser();
const supabase = useSupabaseClient();

const post_id = ref('');
const postPreview = ref({});
const userPreview = ref({});

const usersList = ref([]);
const selectedUserId = ref(null);

const userAvatar = user.value.user_metadata.avatar_url;

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
    title: 'Админ | W',
});
</script>

<template>
    <div id="wall-content">
        <Header title="Админ"></Header>
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
                    <p>id: <a :href="'/post/' + postPreview.id">{{ postPreview.id }}</a></p>
                    <p>Автор: <a :href="'/user/' + postPreview.profiles.nickname">{{ postPreview.profiles.fullname }}</a></p>
                    <p>Текст: {{ postPreview.post_text }}</p>
                    <p>Дата создания: {{ new Date(postPreview.created_at).toLocaleDateString() }}</p>
                    <p>Время создания: {{ new Date(postPreview.created_at).toLocaleTimeString() }}</p>
                    <p>Количество лайков: {{ postPreview.likes_count }}</p>
                    <img v-if="postPreview.post_image" :src="postPreview.post_image" alt="post_image">
                    <div class="button" @click="removePostByAdmin(post_id)">Удалить</div>
                </div>
            </div>
            <div class="content">
                <h1>Управление пользователем</h1>
                <div class="splittedForm">
                    <select class="main-input" v-model="selectedUserId" @change="handleUserSelection">
                        <option value="" disabled selected>Выберите пользователя</option>
                        <option v-for="user in usersList" :key="user.id" :value="user.id">
                            {{ user.fullname }} ({{ user.nickname }})
                        </option>
                    </select>
                </div>
                <div class="user" v-if="userPreview.id">
                    <p>ID: {{ userPreview.id }}</p>
                    <p>Полное имя: <input type="text" v-model="userPreview.fullname"></p>
                    <p>Никнейм: <input type="text" v-model="userPreview.nickname"></p>
                    <p>Верификация: <input type="checkbox" v-model="userPreview.is_verification"></p>
                    <p>Премиум: <input type="checkbox" v-model="userPreview.is_premium"></p>
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
.post {
    cursor: default;
    a {
        color: var(--highlight-color);
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
    cursor: default;
    input[type="text"] {
        font-size: 16px;
        outline: none;
        border-radius: 0;
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
