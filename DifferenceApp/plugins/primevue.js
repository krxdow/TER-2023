
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import AutoComplete from "primevue/autocomplete";
import Dropdown from "primevue/dropdown";
import Menubar from 'primevue/menubar';
import Divider from 'primevue/divider';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('AutoComplete', AutoComplete);
    nuxtApp.vueApp.component('Dropdown', Dropdown);
    nuxtApp.vueApp.component('Menubar', Menubar);
    nuxtApp.vueApp.component('Divider', Divider);


    //other components that you need
});

