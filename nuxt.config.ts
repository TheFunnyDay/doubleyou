// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    css: [
        '~/assets/styles/global.scss',
    ],
    modules: [
        '@nuxtjs/supabase',
    ],
    supabase: {
        redirect: false,
        redirectOptions: {
            login: '/login',
            callback: '/',
        }
    },
    //Uncomment in release
    
    // ssr: false
})
