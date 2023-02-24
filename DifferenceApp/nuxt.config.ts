// https://nuxt.com/docs/api/configuration/nuxt-config
import {plugins} from "nitropack/dist/runtime/virtual/plugins";
import {process} from "unenv/runtime/node/process/_process";
import {env} from "unenv";
import {server} from "nitropack/dist/runtime/entries/firebase";

export default defineNuxtConfig({
        devServer: {port: 3000},

        css: [
            'primevue/resources/themes/soho-dark/theme.css',
            'primevue/resources/primevue.css',
            'primeicons/primeicons.css',
            'primeflex/primeflex.css'

        ],
        build: {
            transpile: ['primevue']
        },
        ssr: false
    }
)


