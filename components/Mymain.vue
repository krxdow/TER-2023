<template>
<div>
  <ul class="list-none" >
    <li class="">
      <NuxtLink to="/gameDemo">
      <Button label="Démo" icon="" class=" text-8xl p-button-text hover:bg-blue-800  "></Button>
      </NuxtLink>
    </li>
    <li>
      <Button label="Jouer" icon="" class=" text-8xl p-button-text hover:bg-red-800  "></Button>
    </li>

  </ul>
</div>
</template>

<script>
import NuxtLink from "#app/components/nuxt-link.mjs";


export default {
  computed: {

    NuxtLink() {
      return NuxtLink
    }
  }

}
</script>

