// https://nuxt.com/docs/api/configuration/nuxt-config


export default defineNuxtConfig({
        modules: [
            '@sidebase/nuxt-auth',
            '@nuxt/devtools',
        ],

        nitro: {
            logLevel: 1,
        },

        debug: true,

        auth: {
            //https://sidebase.io/nuxt-auth/configuration/nuxt-config
            isEnabled: true,
            origin: process.env.ORIGIN,
            basePath: '/api/auth',
        },

        routeRules: {
            '/proxy/**': {
                proxy: {to: 'https://www.jeuxdemots.org/**'},

            },

        },

        css: [
            'primevue/resources/themes/soho-dark/theme.css',
            'primevue/resources/primevue.css',
            'primeicons/primeicons.css',
            'primeflex/primeflex.css'
        ],

        ssr: true,

        build: {
            transpile: ['primevue']
        },
    }
)
