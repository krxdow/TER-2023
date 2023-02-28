<template>
  <div class="border-1 grid flex">

    <div class="col">

    </div>


    <div class="col flex align-content-center justify-content-center ">
      <ul class="list-none  ">
        <h1>Trouver Les differences !</h1>
        <li class="">
          <NuxtLink to="/demo">
            <Button class=" text-8xl p-button-text hover:bg-blue-800 " icon="" label="Démo"></Button>
          </NuxtLink>
        </li>
        <li>
          <Button class=" text-8xl p-button-text hover:bg-red-800  " icon="" label="Jouer"></Button>
        </li>
      </ul>
    </div>

    <div class=" col">

    </div>


  </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>

body, html {


}

</style>