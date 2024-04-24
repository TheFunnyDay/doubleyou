<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
console.clear()
let { data: profiles, error } = await supabase
    .from('profiles')
    .select(`
    following
  `)
    .eq('id', user.value.id)
console.log('profiles', profiles)
const { data: posts } = await useAsyncData('posts', async () => {
    const { data } = await supabase.from('posts')
        .select(`
            id,
            created_at,
            post_text,
            post_image,
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
        .in('author_id', profiles[0].following)
        .order('created_at', { ascending: false });
    console.log('posts', data)
    return data;
});

</script>


<template>
    <div>
        {{ posts }}
        <div v-for="post in posts">
            {{ post }}
            {{ post.profiles }}
        </div>
    </div>
</template>
