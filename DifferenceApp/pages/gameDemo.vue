<template>
  <div>
    <h1>Différence Entre:</h1>
    <div class="contenair inline-flex mb-8">
      <Button class="text-5xl p-button-raised p-button-secondary mr-5">{{
        firsTerme
      }}</Button>
      <Button class="text-5xl p-button-raised p-button-success">{{
        secondTerme
      }}</Button>
    </div>
    <div class="">
      <span class="p-float-label">
        <h3 class="mt-3">Entrer une différence</h3>
        <InputText id="username" v-model="value2" type="text" class="mb-6 mt-3"
          >Entrez un caractere</InputText
        >
      </span>
      <h3>Sélectioner un type de relation</h3>
      <AutoComplete
        v-model="selectedItem"
        :suggestions="filteredItems"
        @complete="searchItems"
        :virtualScrollerOptions="{ itemSize: 38 }"
        optionLabel="label"
        dropdown
      />
      <div class="contenair inline-flex mb-8">
        <Button
          label="Valider"
          class="text-5xl p-button-raised p-button-danger mr-5 block mt-8"
        ></Button>
        <NuxtLink to="/">
          <Button
            label="Retour"
            class="text-5xl p-button-raised p-button-danger mr-5 block mt-8"
          ></Button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<script>
import AutoComplete from "primevue/autocomplete";
import fetch from "node-fetch";
import * as cheerio from "cheerio";

////////////
// PARSER //
////////////

// Lien vers reseauDUMP
const response = await fetch(
  "https://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=crocodile&rel=&relin=norelin"
);

// Recuperation des données de reseauDump
const body = await response.text(); //recupere les données en brut du site
let $ = cheerio.load(body); //mettre dans un objet pour pouvoir le manipuler

// Selection des données du site
const selected = $("div code").html(); //cherche dans le code source, la balise code pour pouvoir recuperer ce qu'il y a dedans
//console.log("debug:", selected); //afficher ce qu'il y a dessus
//console.log("\n\n");

//Ecriture dans un texte
const fs = require("fs");
fs.writeFile("./selected.txt", selected, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log(
      "\n\nLes données ont été écrites dans le fichier selected.txt\n\n"
    );
  }
});

export default {
  components: {
    AutoComplete,
  },

  data() {
    return {
      firsTerme: "Crocodile",
      secondTerme: "Aligator",

      selectedItem: null,
      filteredItems: null,
      items: [
        { label: "Lieu", value: "Lieu" },
        { label: "Caractéristique", value: "Caractéristique" },
      ],
    };
  },

  // Ajout d'une méthode s'appelant searchItems
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
  },
};
</script>

<style scoped></style>
