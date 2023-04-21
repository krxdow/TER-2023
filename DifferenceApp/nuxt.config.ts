// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: [
        '@sidebase/nuxt-auth',
        '@nuxt/devtools',
    ],

    build: {
        transpile: ['primevue']
    },


    auth: {
        origin: 'http://localhost:3000',
        isEnabled: true,
    },

    css: [
        'primevue/resources/themes/soho-dark/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css'
    ],

    debug: true,

    nitro: {
        logLevel: 1,
    },

    routeRules: {
        '/proxy/**': {
            proxy: {to: 'https://www.jeuxdemots.org/**'},
        },

    },

    typescript: {
        strict: true
    },

    devtools: true
})
