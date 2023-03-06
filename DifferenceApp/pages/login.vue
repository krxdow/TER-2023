<template>

</template>

<script setup>

// file: e.g ~/pages/login.vue
const {status, data, signIn, signOut} = useSession()

status.value // Session status: `unauthenticated`, `loading`, `authenticated`
data.value // Session data, e.g., expiration, user.email, ...

await signIn() // Sign in the user
await signOut() // Sign out the user

</script>

<style scoped>

</style>