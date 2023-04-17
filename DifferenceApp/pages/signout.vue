<template>
  <div>
    You just signed out!
      <NuxtLink to="/">
      <Button class=" text-8xl p-button-text hover:bg-blue-800 " icon="" label="HOME"></Button>
  </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false })
</script>
