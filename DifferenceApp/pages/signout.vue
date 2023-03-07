<template>
  <div>
    You just signed out! <br>
    <NuxtLink to="/">
      <Button label="Home"></Button>
    </NuxtLink>

  </div>
</template>

<script lang="ts" setup>
import {definePageMeta} from '#imports'


definePageMeta({auth: false})
</script>
