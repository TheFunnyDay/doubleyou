// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: false },
    css: [
        '~/assets/styles/global.scss',
    ],
    modules: [
        '@nuxtjs/supabase',
        '@nuxt/image',
    ],
    supabase: {
        redirectOptions: {
            login: '/login',
            callback: '/',
        }
    },
    app: {
        pageTransition: { name: 'page', mode: 'out-in' },
    },
})
