<template>

    <div class="flex  flex-column align-items-center justify-content-center   h-screen ">

        <div class="surface-card  p-4 shadow-2 border-round w-full lg:w-6 flex flex-column justify-content-center ">
            <div v-if="show" class="text-center mb-5 ">
                <!--
                                <img alt="Image" class="mb-3" height="50" src="images/blocks/logos/hyper.svg">
                -->
                <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
                <span class="text-600 font-medium line-height-3">Don't have an account?</span>
                <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                   @click="show = !show;udpateLabel(show)">Create today!</a>
            </div>



            <div v-if="!show" class="text-center mb-5 ">
                <!--
                                <img alt="Image" class="mb-3" height="50" src="images/blocks/logos/hyper.svg">
                -->
                <div class="text-900 text-3xl font-medium mb-3">You have an account?</div>
                <span class="text-600 font-medium line-height-3 font-medium no-underline ml-2 text-blue-500 cursor-pointer"
                      @click="show = !show;udpateLabel(show)">Sign in</span>

            </div>
            <divider  align="center" layout="horizontal"></divider>

            <form @submit.prevent>
                <div class="text-center">

                    <label class="block text-900 font-medium mb-2" for="email1">{{ usernameLabel }}</label>
                    <InputText id="email1" v-model="username" class="w-full mb-3" type="email"/>


                    <label v-if="!show" class="block text-900 font-medium mb-2" for="username1">Entrer un Email</label>
                    <InputText v-if="!show" id="username1" v-model="email" class="w-full mb-3" type="email"/>

                    <label class="block text-900 font-medium mb-2" for="password1">{{ passwordLabel }}</label>
                    <InputText id="password1" v-model="password" :autocomplete="autocompleteValue" :type="inputType"
                               class="w-full mb-3"/>


                    <div class="flex align-items-center justify-content-between mb-6">
                        <div class="flex align-items-center">
                            <!--                        <Checkbox id="rememberme1" class="mr-2"></Checkbox>-->
                            <label for="rememberme1">Remember me</label>
                        </div>
                        <a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Forgot
                            password?</a>
                    </div>


                </div>
            </form>
            <div v-if="show">
                <Button class="w-full" label="Sign In"  @click="signIn('credentials',{username,password, callbackUrl: originalProtectedPagePatch })"></Button>
                <Divider align="center" layout="horizontal"><b>OR</b></Divider>
                <Button class="w-full" label="Sign In With Github"
                        @click="signIn('github',{callbackUrl: originalProtectedPagePatch })"></Button>
            </div>


            <div v-if="!show">
                <Button class="w-full" label="Register"
                        type="submit" @click="addUsers(username, email, password)">
                </Button>
            </div>

        </div>
    </div>

</template>

<script lang="ts" setup>
definePageMeta({auth: false})
const {signIn,state,error} = useAuth()
const route = useRoute();

const show = ref(true)
let usernameLabel = ref('');
let passwordLabel = ref('');
const password = ref('')
let inputType = ref('password')




/*
console.log("state",state)
console.log("error",error)
*/


const originalProtectedPagePatch  = route.query.callbackUrl





let autocompleteValue = ref('off')
const email = ref('')
const username = ref('')
usernameLabel.value = 'Email or Username';
passwordLabel.value = 'Password'


async function addUsers(username, email, password) {

    let addedUser = null

    if (username && email && password) {
        addedUser = await $fetch('/api/users', {
            method: 'POST',
            body: {
                name: username,
                email: email,
                password: password

            }
        })
    }
}

async function udpateLabel(show) {
    usernameLabel.value = show ? 'Email or Username' : 'Entrer un Nom Utilisateur';
    passwordLabel.value = show ? 'Password' : 'Entrer un mot de passe';
    inputType.value = show ? 'password' : 'text';
    autocompleteValue.value = show ? 'off' : 'new-password';
}


</script>

<style scoped>

</style>
