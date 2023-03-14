<template>
  <MyMenuComp />
  <div class="">
    <h1>Création de partie</h1>
    <div class="flex flex-column align-items-center">
      <h2 class="">Entrer deux termes à comparer</h2>
    </div>

    <div class="grid">
      <div class="col flex flex-column">
        <InputText
          id="firstTerme"
          v-model="firstTerme"
          :class="{ 'p-invalid': isActiveErreur1 }"
          class="block mb-5 ml-10"
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
          v-model="selectedCate"
          :options="caract"
          class="mb-5 ml-10"
          placeholder="Selection Type de relation"
        />
      </div>

      <div class="col flex flex-column"></div>

      <div class="col flex flex-column">
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
          v-model="selectedCate"
          :options="caract"
          class="mb-5"
          placeholder="Selection Type de relation"
        />
      </div>
    </div>

    <div class="grid">
      <div class="col flex flex-column">
        <!--v-model : sauvegarde dans la variable -->
        <InputText
          id="firstTermeValue"
          v-model="firstTermeValue"
          class="mb-5 block ml-10"
          placeholder="Type valeur"
          type="text"
        />
      </div>

      <div class="col flex flex-column align-items-center">
        <Button
          class=""
          label="Validé la différence"
          type="submit"
          @click="submitForm()"
        />
      </div>

      <div class="col flex flex-column">
        <InputText
          id="secondTermeValue"
          v-model="secondTermeValue"
          class="mb-5 block"
          placeholder="Type valeur"
          type="text"
        />
      </div>
    </div>

    <div class="grid">
      <div
        class="col ml-30 border-round border-1 border-dotted flex flex-column justify-center"
      >
        <h3>Liste pour 1er terme :</h3>
        <div class="card">
          <div
            class="flex flex-wrap md:justify-content-between justify-content-center card-container blue-container"
          >
            <div>
              <ul>
                <li
                  v-for="item in listFirstItemOfUser"
                  :key="item"
                  style="
                    margin-right: 10px;
                    display: flex;
                    flex-direction: row-reverse;
                    align-items: center;
                  "
                >
                  <span
                    :style="{
                      color: item.includes('//') ? 'green' : 'red',
                      textAlign: 'rigth',
                    }"
                    >{{ item }}</span
                  >
                  <Button
                    class="p-button-icon-bottom align-button"
                    style="
                      margin-right: 10px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 25px;
                      height: 25px;
                      border-radius: 50%;
                      background-color: blueviolet;
                      color: black;
                      border: none;
                      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
                      cursor: pointer;
                    "
                    @click="removeTodoFirst(item)"
                    >X</Button
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col flex flex-column justify-center align-items-center">
        <Button class="" label="Validé la partie" />
      </div>
      <div
        class="col mr-30 border-round border-1 border-dotted flex flex-column justify-center"
      >
        <h3>Liste pour 2nd terme :</h3>
        <div class="card">
          <div
            class="flex flex-wrap md:justify-content-between justify-content-center card-container blue-container"
          >
            <div>
              <ul>
                <li
                  v-for="item in listSecondItemOfUser"
                  :key="item"
                  style="
                    display: flex;
                    flex-direction: row-reverse;
                    align-items: center;
                  "
                >
                  <Button
                    class="p-button-icon-bottom"
                    style="
                      margin-right: 10px;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      width: 25px;
                      height: 25px;
                      border-radius: 50%;
                      background-color: blueviolet;
                      color: black;
                      border: none;
                      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
                      cursor: pointer;
                    "
                    @click="removeTodoSecond(item)"
                  >
                    X
                  </Button>
                  <span
                    :style="{
                      color: item.includes('//') ? 'green' : 'red',
                      textAlign: 'left',
                    }"
                    >{{ item }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
      showMessageError2.value = false;
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
      caract: ["lieux", "caractéristique", "bute", "appartient"],
      listFirstItemOfUser: [],
      listSecondItemOfUser: [],
      firstTerme: null,
      firstTermeValue: null,
      secondTerme: null,
      secondTermeValue: null,
    };
  },

  methods: {
    //méthode pour affiche les éléments qu'on vient de rentrer
    submitForm() {
      //Promleme si on met pas de truc en plus
      if (
        this.$data.firstTermeValue != null &&
        this.$data.secondTermeValue != null
      ) {
        this.listFirstItemOfUser.push(
          this.$data.firstTerme + " // " + this.$data.firstTermeValue
        );
        this.listSecondItemOfUser.push(
          this.$data.secondTerme + " \\\\ " + this.$data.firstTermeValue
        );
        this.listFirstItemOfUser.push(
          this.$data.firstTerme + " \\\\ " + this.$data.secondTermeValue
        );
        this.listSecondItemOfUser.push(
          this.$data.secondTerme + " // " + this.$data.secondTermeValue
        );
      } else if (
        this.$data.firstTermeValue != null &&
        (this.$data.secondTermeValue == null ||
          this.$data.secondTermeValue == "")
      ) {
        // Ajout des éléments
        this.listFirstItemOfUser.push(
          this.$data.firstTerme + " // " + this.$data.firstTermeValue
        );
        this.listSecondItemOfUser.push(
          this.$data.secondTerme + " \\\\ " + this.$data.firstTermeValue
        );
      } else if (
        this.$data.firstTermeValue == null &&
        (this.$data.secondTermeValue != null ||
          this.$data.secondTermeValue == "")
      ) {
        this.listFirstItemOfUser.push(
          this.$data.firstTerme + " \\\\ " + this.$data.secondTermeValue
        );
        this.listSecondItemOfUser.push(
          this.$data.secondTerme + " // " + this.$data.secondTermeValue
        );
      } else {
      }
      // Tout remettre à null
      this.firstTerme = null;
      this.firstTermeValue = null;
      this.secondTerme = null;
      this.secondTermeValue = null;
    },
    //méthode pour supprimer les éléments qu'on veut supprimer
    removeTodoFirst(item) {
      // Calcul des index
      const itemIndex1 = this.listFirstItemOfUser.indexOf(item);

      if (itemIndex1 != -1) {
        // Suppression dans liste 1
        this.listFirstItemOfUser = this.listFirstItemOfUser.filter(
          (t) => t !== item
        );
        //suppriemr l'élément dans la liste 2
        this.listSecondItemOfUser = this.listSecondItemOfUser.filter(
          (t) => t !== this.listSecondItemOfUser[itemIndex1]
        );
      }
    },
    removeTodoSecond(item) {
      // Calcul des index
      const itemIndex2 = this.listSecondItemOfUser.indexOf(item);

      if (itemIndex2 != -1) {
        // Suppression dans liste 2
        this.listSecondItemOfUser = this.listSecondItemOfUser.filter(
          (t) => t !== item
        );
        //suppriemr l'élément dans la liste 1
        this.listFirstItemOfUser = this.listFirstItemOfUser.filter(
          (t) => t !== this.listFirstItemOfUser[itemIndex2]
        );
      }
    },
  },
};
</script>

<style scoped></style>
