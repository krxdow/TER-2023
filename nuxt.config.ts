// https://nuxt.com/docs/api/configuration/nuxt-config
import {plugins} from "nitropack/dist/runtime/virtual/plugins";

export default defineNuxtConfig({

    css: [
        'primevue/resources/themes/soho-dark/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css'

    ],
    build: {
        transpile: ['primevue']
    },  ssr: false
})
