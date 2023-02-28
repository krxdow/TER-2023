<template>
  <div class="grid">
    <div class="col border-1">User space</div>
    <div class="col">
      <div class="flex flex-column align-items-center">
        <h1>Différence Entre:</h1>
        <div class="contenair inline-flex mb-8">
          <Button class="text-5xl p-button-raised p-button-secondary mr-5">{{ firsTerme }}</Button>
          <Button class="text-5xl p-button-raised p-button-success">{{ secondTerme }}</Button>
        </div>
        <div class="">
          <form @submit.prevent="sumitForm">
            <span class="p-float-label">
              <InputText id="username" v-model="inputUser" class="mb-3 mt-5" type="text"></InputText>
        <label for="username">Entrer une différence</label>
      </span>
            <h3>Sélectioner un type de relation </h3>
            <AutoComplete v-model="selectedItem" :suggestions="filteredItems" :virtualScrollerOptions="{ itemSize: 38 }"
                          dropdown optionLabel="label" @complete="searchItems"/>
            <Button class="text-5xl p-button-raised p-button-danger mr-5 block mt-8" label="Valider" type="submit"/>
          </form>
        </div>
      </div>
    </div>

    <div class="col  border-round border-1 border-dotted flex flex-column justify-center align-items-center">
      <h2>différence entrée</h2>
      <div class="card">
        <div class="flex flex-wrap md:justify-content-between justify-content-center card-container blue-container">
          <div>
            <ul>
              <li v-for="item in listItemOfUser" :key="item">
                {{ item }}
                <Button class="p-button-icon-bottom" @click="removeTodo(item)">X</Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AutoComplete from "primevue/autocomplete";
import Listbox from 'primevue/listbox';
import * as cheerio from "cheerio";

////////////
// PARSER //
////////////

// Lien vers reseauDUMP
let response = await fetch(
    "https://www.jeuxdemots.org/rezo-dump.php?gotermsubmit=Chercher&gotermrel=crocodile&rel=&relin=norelin", {
      mode: 'no-cors'
    }
);
// Recuperation des données de reseauDump
const body = await response.text(); //recupere les données en brut du site
let $ = cheerio.load(body); //mettre dans un objet pour pouvoir le manipuler

// Selection des données du site
const selected = $("div code").html(); //cherche dans le code source, la balise code pour pouvoir recuperer ce qu'il y a dedans
//console.log("debug:", selected); //afficher ce qu'il y a dessus
//console.log("\n\n");

// Ecriture dans un texte
/*const fs =  require("fs");
fs.writeFile("./selected.txt", selected, function (err) {
  if (err) {
    console.error(err);
    return;
  } else {
    console.log(
        "\n\nLes données ont été écrites dans le fichier selected.txt\n\n"
    );
  }
});

// Lecture du fichier pour le parser
fs.readFile("./selected.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // On ignore les commentaires
    if (line.startsWith("//")) {
      const part = line.split(":")[1].trim();
      console.log(line);
    }

    // On igonre les lignes <def></def>
    if (line.startsWith("<def>")) {
      // On boucle jusqu'à la fin du commentaire
      while (!lines[i].trim().endsWith("</def>")) {
        i++;
      }
      continue;
    }
  }
  // faire quelque chose avec la ligne
});*/

/////////////
// DONNEES //
/////////////


export default {
  components: {AutoComplete, Listbox},
  name: "demo",

  watch: {},

  data() {
    return {
      newItem: null,

      listItemOfUser: [],
      selectedCity: ["null", "dfdf"],
      cities: [
        {name: 'New York', code: 'NY'},
        {name: 'Rome', code: 'RM'},
        {name: 'London', code: 'LDN'},
        {name: 'Istanbul', code: 'IST'},
        {name: 'Paris', code: 'PRS'}
      ],

      inputUser: null,
      firsTerme: 'Crocodile',
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
      let filteredItems = {};

      for (let i = 0; i < this.items.length; i++) {
        let item = this.items[i];
        if (item.label.toLowerCase().indexOf(query.toLowerCase()) === 0) {
          filteredItems.push(item);
        }
      }
      this.filteredItems = filteredItems;
    },
    sumitForm() {
      this.listItemOfUser.push(this.$data.inputUser)
      this.inputUser = null
      console.log("inputUser", this.inputUser)
      console.log("Liste Item", this.listItemOfUser)
    },

    removeTodo(item) {
      this.listItemOfUser = this.listItemOfUser.filter((t) => t !== item)
    }

  }
}

</script>

<style scoped>

</style>