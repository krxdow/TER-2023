<template>
  <div class="flex flex-column  align-items-center">
    <h1>Trouver Les differences !</h1>
    <ul class="list-none ">
      <li class="">
        <NuxtLink to="/demo">
          <Button class=" text-8xl p-button-text hover:bg-blue-800 " icon="" label="Démo"></Button>
        </NuxtLink>
      </li>
      <li>
        <Button class=" text-8xl p-button-text hover:bg-red-800  " icon="" label="Jouer"></Button>
      </li>

      <NuxtLink to="/partycreation">
        <li>
          <Button class=" text-6xl p-button-text hover:bg-yellow-800  " icon="" label="Creer une Partie"></Button>
        </li>
      </NuxtLink>
    </ul>
    </div>
</template>

<script>
export default {
  name: "index"
}
</script>

<style scoped>
</style>
