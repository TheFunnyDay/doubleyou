<script setup>
const user = useSupabaseUser();
const router = useRouter();

if (user.value) {
    router.push('/');
}
</script>
<template>
    <AuthPage />
</template>