// https://nuxt.com/docs/api/configuration/nuxt-config
import fetch from "node-fetch";
export default defineNuxtConfig({

        modules: ['@sidebase/nuxt-auth'],

        debug: true,
        nitro: {
            logLevel: 1,
        },
        //auth: { origin: 'http://localhost:3000/' },
        routeRules: {
            '/proxy/**': {
                proxy: {to: 'https://www.jeuxdemots.org/**'},

            },

        },

        css: ['primevue/resources/themes/soho-dark/theme.css',
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


