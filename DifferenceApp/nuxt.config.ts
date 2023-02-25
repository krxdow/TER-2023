// https://nuxt.com/docs/api/configuration/nuxt-config
import {plugins} from "nitropack/dist/runtime/virtual/plugins";
import {process} from "unenv/runtime/node/process/_process";
import {env} from "unenv";
import {server} from "nitropack/dist/runtime/entries/firebase";
import axios from "axios";
import * as cheerio from 'cheerio';

export default defineNuxtConfig({




        routeRules : {
            '/_nuxt/**': { headers: { 'access-control-allow-methods': 'GET' } },
            '/api/v1/**': { cors: true},
            '/**': { cors: true, headers: { 'Access-Control-Allow-Origin': '*' } }},



    css: [
            'primevue/resources/themes/soho-dark/theme.css',
            'primevue/resources/primevue.css',
            'primeicons/primeicons.css',
            'primeflex/primeflex.css'

        ],
        build: {
            transpile: ['primevue']
        },
        ssr: true,
  }
)


