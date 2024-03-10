<script setup>
const supabase = useSupabaseClient();

try {
    const { data: user } = await useAsyncData('profiles', async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('nickname', 'thefunnyday')
            .single();
        if (error) {
            throw error;
        }
        return data;
    });

    // Здесь можно обрабатывать полученного пользователя
    console.log(user);
} catch (error) {
    // Обработка ошибок
    console.error("Ошибка при запросе к базе данных:", error);
}
</script>
