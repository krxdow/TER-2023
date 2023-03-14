<template>
  <MyMenuComp />

  <SelectButton v-model="value" :options="options" aria-labelledby="basic" />

  <div class="">
    <h1>Création de partie</h1>
    <div class="flex flex-column align-items-center">
      <h2 class="">Entrer deux termes à comparer</h2>
    </div>

    <div class="grid">
      <div class="col flex flex-column" style="flex: 4">
        <InputText
          id="firstTerme"
          v-model="firstTerme"
          class="block mb-5 ml-10"
          placeholder="Premier Terme"
          type="text"
          @input=""
        />
        <small
          v-if="showMessageError1"
          :class="{ error: isActiveErreur1 }"
          id="username2-help"
          class="block p-error -mt-4"
          >{{ messageErreur }}</small
        >
        <div
          class="col border-round border-1 border-dotted flex flex-column justify-center"
        >
          <h2>
            <CENTER>Mot 1 : {{ firstTerme }}</CENTER>
          </h2>
        </div>
      </div>

      <div class="col flex flex-column" style="column-width: 15px"></div>

      <div class="col flex flex-column" style="flex: 4">
        <InputText
          id="secondTerme"
          v-model="secondTerme"
          class="block mb-5"
          placeholder="Second Terme"
          type="text"
          @input=""
        />
        <small
          v-if="showMessageError2"
          :class="{ error: isActiveErreur2 }"
          id="username2-help"
          class="block p-error -mt-4"
          >{{ messageErreur }}</small
        >

        <div
          class="col border-round border-1 border-dotted flex flex-column justify-center"
        >
          <h2>
            <CENTER>Mot 2 : {{ secondTerme }}</CENTER>
          </h2>
        </div>
      </div>
    </div>

    <div class="grid" style="margin-top: 50px">
      <!--Entrée de la valeur 1-->
      <div class="col flex flex-column" style="flex: 4">
        <!--v-model : sauvegarde dans la variable -->
        <InputText
          id="firstTermeValue"
          v-model="firstTermeValue"
          class="mb-5 block"
          placeholder="Type valeur"
          type="text"
        />

        <Dropdown
          v-model="selectedCate"
          :options="caract"
          placeholder="Selection Type de relation"
        />
      </div>
      <!--Bouton d'ajout de la différence-->
      <div
        class="col flex flex-column align-items-center"
        style="margin-top: 40px; column-width: 50px"
      >
        <Button
          class=""
          label="Validé la différence"
          type="submit"
          @click="ajoutInList()"
        />
      </div>
      <!--Entrée de la valeur 2-->
      <div class="col flex flex-column" style="flex: 4">
        <InputText
          id="secondTermeValue"
          v-model="secondTermeValue"
          class="mb-5 mt-10 block"
          placeholder="Type valeur"
          type="text"
        />
        <Dropdown
          v-model="selectedCate"
          :options="caract"
          placeholder="Selection Type de relation"
        />
      </div>
    </div>

    <div class="grid" style="margin-top: 50px">
      <div
        class="col ml-30 border-round border-1 border-dotted flex flex-column justify-center"
        style="flex: 4"
      >
        <h2><CENTER>Liste pour 1er terme :</CENTER></h2>
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
                  <h3
                    :style="{
                      color: item.includes('/') ? 'green' : 'red',
                      textAlign: 'rigth',
                    }"
                  >
                    {{ item }}
                  </h3>
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
                    @click="removeTodo(item)"
                    >X</Button
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col" style="column-width: 25px"></div>
      <div
        class="col mr-30 border-round border-1 border-dotted flex flex-column justify-center"
        style="flex: 4"
      >
        <h2><CENTER>Liste pour 2nd terme :</CENTER></h2>
        <div class="card">
          <div
            class="flex flex-wrap md:justify-content-between card-container blue-container"
            style=""
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
                    @click="removeTodo(item)"
                  >
                    X
                  </Button>
                  <span
                    :style="{
                      color: item.includes('/') ? 'green' : 'red',
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
    <div
      class="flex flex-column"
      style="display: flex; justify-content: center; align-items: center"
    >
      <Button class="" label="Validé la partie" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import MyMenuComp from "~/components/menuBar.vue";
import * as cheerio from "cheerio";

definePageMeta({
  middleware: "auth",
});

const messageErreur = "Terme non présent dans Rezo";

const showMessageError1 = ref(false);
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
    selected = $("div.jdm-level2-block > div > div.jdm-warning").html();
    console.log(selected);

    // Verification si le mot existe ou pas
    if (selected != null) {
      isActiveErreur1.value = true;
      showMessageError1.value = true;
    } else {
      showMessageError1.value = false;
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
    selected = $("div.jdm-level2-block > div > div.jdm-warning").html();
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
      selectedCate: null,
      listFirstItemOfUser: [],
      listSecondItemOfUser: [],
      firstTermeValue: null,
      secondTermeValue: null,
    };
  },

  methods: {
    //méthode pour affiche les éléments qu'on vient de rentrer
    ajoutInList() {
      // Si le prmier élément est rempli et le deuxieme aussi
      if (
        this.$data.firstTermeValue !== null &&
        this.$data.firstTermeValue !== "" &&
        this.$data.secondTermeValue !== null &&
        this.$data.secondTermeValue !== ""
      ) {
        // Pour le terme à gauche
        //Verification si la chaine est dans la liste ou pas
        if (
          !this.listFirstItemOfUser.includes(
            this.$data.selectedCate + " // " + this.$data.firstTermeValue
          ) &&
          !this.listSecondItemOfUser.includes(
            this.$data.selectedCate + " \\\\ " + this.$data.firstTermeValue
          )
        ) {
          // Ajout en vert à gauche
          this.listFirstItemOfUser.push(
            this.$data.selectedCate + " // " + this.$data.firstTermeValue
          );
          // Ajout en rouge à droite
          this.listSecondItemOfUser.push(
            this.$data.selectedCate + " \\\\ " + this.$data.firstTermeValue
          );
        }

        // Pour le terme à droite
        //Verification si le terme n'existe pas déjà dans la liste
        if (
          !this.listFirstItemOfUser.includes(
            this.$data.selectedCate + " \\\\ " + this.$data.secondTermeValue
          ) &&
          !this.listSecondItemOfUser.includes(
            this.$data.selectedCate + " // " + this.$data.secondTermeValue
          )
        ) {
          // Ajout en rouge à gauche
          this.listFirstItemOfUser.push(
            this.$data.selectedCate + " \\\\ " + this.$data.secondTermeValue
          );
          // Ajout en vert à droite
          this.listSecondItemOfUser.push(
            this.$data.selectedCate + " // " + this.$data.secondTermeValue
          );
        }
      }
      // Sinon si le premier élément n'est pas vide ou null et que le deuxieme oui
      if (
        this.$data.firstTermeValue !== null &&
        this.$data.firstTermeValue !== "" &&
        (this.$data.secondTermeValue === null ||
          this.$data.secondTermeValue === "")
      ) {
        //Verification si le terme n'existe pas déjà dans la liste
        if (
          !this.listFirstItemOfUser.includes(
            this.$data.firstTerme +
              " / " +
              this.$data.selectedCate +
              " / " +
              this.$data.firstTermeValue
          ) &&
          !this.listSecondItemOfUser.includes(
            this.$data.secondTerme +
              " \\ " +
              this.$data.selectedCate +
              " \\ " +
              this.$data.firstTermeValue
          )
        ) {
          // Ajout du premier element en vert à gauche et en rouge à droite
          this.listFirstItemOfUser.push(
            this.$data.firstTerme +
              " / " +
              this.$data.selectedCate +
              " / " +
              this.$data.firstTermeValue
          );
          this.listSecondItemOfUser.push(
            this.$data.secondTerme +
              " \\ " +
              this.$data.selectedCate +
              " \\ " +
              this.$data.firstTermeValue
          );
        }
      }
      //Sinon si le premier élément est null ou vide et que le deuxième non
      if (
        (this.$data.firstTermeValue === null ||
          this.$data.firstTermeValue === "") &&
        this.$data.secondTermeValue !== null &&
        this.$data.secondTermeValue !== ""
      ) {
        //Verification si le terme n'existe pas déjà dans la liste
        if (
          !this.listFirstItemOfUser.includes(
            this.$data.firstTerme +
              " \\ " +
              this.$data.selectedCate +
              " \\ " +
              this.$data.secondTermeValue
          ) &&
          !this.listSecondItemOfUser.includes(
            this.$data.secondTerme +
              " / " +
              this.$data.selectedCate +
              " / " +
              this.$data.secondTermeValue
          )
        ) {
          // Ajout du premier element en rouge à gauche et en vert à droite
          this.listFirstItemOfUser.push(
            this.$data.firstTerme +
              " \\ " +
              this.$data.selectedCate +
              " \\ " +
              this.$data.secondTermeValue
          );
          this.listSecondItemOfUser.push(
            this.$data.secondTerme +
              " / " +
              this.$data.selectedCate +
              " / " +
              this.$data.secondTermeValue
          );
        }
      }
      //Sinon on a rien rempli donc on ne fait rien
      if (
        (
          this.$data.firstTermeValue === null ||
          this.$data.firstTermeValue === ""
        )(
          this.$data.secondTermeValue === null ||
            this.$data.secondTermeValue === ""
        )
      ) {
      }
      // Tout remettre à null
      this.$data.selectedCate = null;
      this.$data.firstTerme = null;
      this.$data.firstTermeValue = null;
      this.$data.secondTerme = null;
      this.$data.secondTermeValue = null;
    },

    // Méthode pour supprimer les éléments qu'on veut supprimer
    removeTodo(item) {
      // Calcul des index
      const itemIndex1 = this.listFirstItemOfUser.indexOf(item);
      const itemIndex2 = this.listSecondItemOfUser.indexOf(item);

      //Si l'index n'est pas null alors l'élément estdans la list 1
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
      //Si l'index n'est pas null alors l'élément estdans la list 2
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
