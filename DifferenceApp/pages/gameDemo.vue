<template>
  <div>
    <h1>Différence Entre:</h1>
    <div class="contenair inline-flex mb-8">
      <Button  class="text-5xl p-button-raised p-button-secondary mr-5">{{firsTerme}}</Button>
      <Button  class="text-5xl p-button-raised p-button-success">{{secondTerme}}</Button>

    </div>
    <div class="">
      <span class="p-float-label">
        <InputText id="username" v-model="value2" type="text" class="mb-3 mt-5"></InputText>
        <label for="username">Entrer une différence</label>
      </span>
      <h3>Sélectioner un type de relation </h3>
      <AutoComplete v-model="selectedItem" :suggestions="filteredItems" @complete="searchItems"
                    :virtualScrollerOptions="{ itemSize: 38 }" optionLabel="label" dropdown/>
      <Button label="Valider" class="text-5xl p-button-raised p-button-danger mr-5 block mt-8"/>
    </div>
  </div>
</template>


<script setup>

</script>



<script>

import AutoComplete from "primevue/autocomplete";
import fetch from "node-fetch";
import * as cheerio from "cheerio";


const response = await fetch('https://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=crocodile&rel=&relin=norelin');
const body = await response.text();
let $ = cheerio.load((body));

const selected = $('div code').html();
console.log("debug:",selected);

export default {
  components: {
    AutoComplete
  },

  data() {
    return {
      firsTerme:'Crocodile' ,
      secondTerme: 'Crocodile',

      selectedItem: null,
      filteredItems: null,
      items: [
        {label: 'Lieu', value: 'Lieu'},
        {label: 'Caractéristique', value: 'Caractéristique'},
      ]
    }
  },

  methods: {
    searchItems(event) {
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
      let query = event.query;
      let filteredItems = [];

      for (let i = 0; i < this.items.length; i++) {
        let item = this.items[i];
        if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filteredItems.push(item);
        }
      }
      this.filteredItems = filteredItems;
    },
  }
}

</script>

<style scoped></style>