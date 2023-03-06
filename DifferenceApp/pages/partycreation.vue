<template>

  <div class="">
    <h1>Création de partie</h1>
    <h2 class="">Entrer deux termes à comparer</h2>

    <div class="grid ">
      <div class="col flex flex-column align-items-center   ">

        <InputText id="firstTerme" v-model="firstTerme"
                   :class="{'p-invalid':isActive1}"
                   class="block  mb-5" placeholder="Premier Terme" type="text" @input=""/>
        <small v-if="showMessageError" id="username2-help" class="block p-error -mt-4  ">{{ message }}</small>

        <Dropdown v-model="selectedCity" :options="cities" class="mb-5" placeholder="Selection Type de relation"/>
        <InputText id="firstTermeValue" v-model="firstTermeValue" class="block " placeholder="Type valeur" type="text"/>
      </div>


      <div class="col flex flex-column align-items-center">
        <InputText id="secondTerme" v-model="secondTerme"
                   :class="{'p-invalid':isActive2}"
                   class="block mb-5" placeholder="Second Terme" type="text"/>
        <small v-if="showMessageError2" id="username2-help" class="block p-error -mt-4">{{ message }}</small>

        <Dropdown v-model="selectedCity" :options="cities" class="mb-5" placeholder="Selection Type de relation"/>
        <InputText id="secondTermeValue" v-model="secondTermeValue" class="block " placeholder="Type valeur"
                   type="text"/>
      </div>
    </div>

    <div class="flex justify-content-center ">
      <Button label="Validé la partie"/>

    </div>

  </div>
</template>


<script setup>
import * as cheerio from "cheerio";

const message = "Terme non présent dans Rezo"


const showMessageError = ref(false)
const showMessageError2 = ref(false)

const isActive1 = ref(false)
const isActive2 = ref(false)

let secondTerme = ref('')
let firstTerme = ref('')


watch(firstTerme, async (word, old) => {
  let selected = null
  isActive1.value = false
  if (selected == null) {
    //  answer.value = 'Recherche...'
    const url = 'rezo-dump.php?gotermsubmit=Chercher&gotermrel=' + word + '&rel=&relin=norelin'
    const {data: response} = await useFetch("http://127.0.0.1:3000/proxy/" + url)
    let $ = cheerio.load(toRaw(response.value));
    selected = $('div.jdm-level2-block > div>div.jdm-warning').html();
    console.log(selected)
    if (selected != null) {
      isActive1.value = true
      showMessageError.value = true

    } else {
      showMessageError.value = false
      isActive1.value = false
    }
  }
})

watch(secondTerme, async (word, old) => {
  let selected = null
  isActive2.value = false
  if (selected == null) {
    //  answer.value = 'Recherche...'
    const url = 'rezo-dump.php?gotermsubmit=Chercher&gotermrel=' + word + '&rel=&relin=norelin'
    const {data: response} = await useFetch("http://127.0.0.1:3000/proxy/" + url)
    let $ = cheerio.load(toRaw(response.value));
    selected = $('div.jdm-level2-block > div>div.jdm-warning').html();
    console.log(selected)
    if (selected != null) {
      isActive2.value = true
      showMessageError2.value = true

    } else {
      showMessageError.value = false
      isActive2.value = false
    }
  }
})


</script>

<script>

export default {
  name: "partycreation",

  data() {
    return {

      test: null,
      secondTermeValue: null,

      selectedItem: null,
      filteredItems: null,
      items: Array.from({length: 1000}, (_, i) => ({label: `Item #${i}`, value: i})),

      selectedCity: null,

      cities: [
        "lieux",
        "caractéristique",
        "bute",
        "appartient"
      ],

      //   message: "Terme non valide dans RezoDump",
      buttonText: "Show message",

      responseHTML: null

    }
  },

  methods: {
    searchItems(event) {
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
      let query = event.query;
      let filteredItems = [];
      for (let i = 0; i < 10; i++) {
        let item = this.items[i];
        if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filteredItems.push(item);
        }
      }
      this.filteredItems = filteredItems;
    }
  },

}
</script>

<style scoped>

</style>