<template>
  <MyMenuComp />
  <div class="">
    <h1>Création de partie</h1>
    <h2 class="">Entrer deux termes à comparer</h2>

    <div class="grid">
      <div class="col flex flex-column align-items-center">
        <InputText
          id="firstTerme"
          v-model="firstTerme"
          :class="{ 'p-invalid': isActiveErreur1 }"
          class="block mb-5"
          placeholder="Premier Terme"
          type="text"
          @input=""
        />
        <small
          v-if="showMessageError"
          id="username2-help"
          class="block p-error -mt-4"
          >{{ messageErreur }}</small
        >

        <Dropdown
          v-model="selectedCity"
          :options="cities"
          class="mb-5"
          placeholder="Selection Type de relation"
        />
        <!--v-model : sauvegarde dans la variable -->
        <InputText
          id="firstTermeValue"
          v-model="firstTermeValue"
          class="block"
          placeholder="Type valeur"
          type="text"
        />
      </div>

      <div class="col flex flex-column align-items-center">
        <Button class="mr-3" label="Validé la différence" />
      </div>

      <div class="col flex flex-column align-items-center">
        <InputText
          id="secondTerme"
          v-model="secondTerme"
          :class="{ 'p-invalid': isActiveErreur2 }"
          class="block mb-5"
          placeholder="Second Terme"
          type="text"
        />
        <small
          v-if="showMessageError2"
          id="username2-help"
          class="block p-error -mt-4"
          >{{ messageErreur }}</small
        >

        <Dropdown
          v-model="selectedCity"
          :options="cities"
          class="mb-5"
          placeholder="Selection Type de relation"
        />
        <InputText
          id="secondTermeValue"
          v-model="secondTermeValue"
          class="block"
          placeholder="Type valeur"
          type="text"
        />
      </div>
    </div>

    <div class="flex justify-content-center">
      <Button class="ml-3" label="Validé la partie" />
    </div>
  </div>
</template>

<script setup>
import MyMenuComp from "~/components/menuBar.vue";
import * as cheerio from "cheerio";

definePageMeta({
  middleware: "auth",
});

const messageErreur = "Terme non présent dans Rezo";

const showMessageError = ref(false);
const showMessageError2 = ref(false);

const isActiveErreur1 = ref(false);
const isActiveErreur2 = ref(false);

let secondTerme = ref("");
let firstTerme = ref("");

// Fonction qui surveille l'état d'une variable (callback)
watch(firstTerme, async (word, old) => {
  // Valeurs de départ
  let selected = null;
  isActiveErreur1.value = false;

  if (selected == null) {
    //  answer.value = 'Recherche...'
    // Fin du lien du mot choisis
    const url =
      "rezo-dump.php?gotermsubmit=Chercher&gotermrel=" +
      word +
      "&rel=&relin=norelin";
    // Debut du lien pour aller sur JeuxDeMots
    const { data: response } = await useFetch(
      "http://127.0.0.1:3000/proxy/" + url
    );
    // Chercher le lien sur internet
    let $ = cheerio.load(toRaw(response.value));

    // Modification de selected que si ya un warning parce que lemot n'existe
    selected = $("div.jdm-level2-block > div>div.jdm-warning").html();
    console.log(selected);

    // Verification si le mot existe ou pas
    if (selected != null) {
      isActiveErreur1.value = true;
      showMessageError.value = true;
    } else {
      showMessageError.value = false;
      isActiveErreur1.value = false;
    }
  }
});

watch(secondTerme, async (word, old) => {
  let selected = null;
  isActiveErreur2.value = false;
  if (selected == null) {
    //  answer.value = 'Recherche...'
    const url =
      "rezo-dump.php?gotermsubmit=Chercher&gotermrel=" +
      word +
      "&rel=&relin=norelin";
    const { data: response } = await useFetch(
      "http://127.0.0.1:3000/proxy/" + url
    );
    let $ = cheerio.load(toRaw(response.value));
    selected = $("div.jdm-level2-block > div>div.jdm-warning").html();
    console.log(selected);
    if (selected != null) {
      isActiveErreur2.value = true;
      showMessageError2.value = true;
    } else {
      showMessageError.value = false;
      isActiveErreur2.value = false;
    }
  }
});
</script>

<script>
export default {
  name: "partycreation",

  data() {
    return {
      cities: ["lieux", "caractéristique", "bute", "appartient"],
    };
  },

  methods: {},
};
</script>

<style scoped></style>
