<template>
    <!--
      Heads up! 👋
    
      Plugins:
        - @tailwindcss/forms
    -->

    <div class="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-lg">
            <h1 class="text-center text-2xl font-bold text-blue-600 sm:text-3xl">
                ¡Ingresa para llevar tus menús al siguiente nivel!
            </h1>

            <p class="mx-auto mt-4 max-w-md text-center text-gray-500">
                Aquí es donde podrás administrar cada aspecto del menú de tu restaurante
            </p>

            <form class="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8" @submit.prevent="FormHandler">
                <p class="text-center text-lg font-medium">Ingresa como adminstrador 😉</p>

                <div>
                    <label for="email" class="sr-only">Correo</label>

                    <div class="relative">
                        <input type="email" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Ingresa tu correo" v-model="emailValue" ref="emailInputElement" />

                        <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                            </svg>
                        </span>
                    </div>
                </div>

                <div>
                    <label for="password" class="sr-only">Contraseña</label>

                    <div class="relative">
                        <input type="password" class="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                            placeholder="Ingresa tu contraseña" v-model="passwordValue"/>

                        <span class="absolute inset-y-0 end-0 grid place-content-center px-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </span>
                    </div>
                </div>
                <p class="text-sm text-center underline text-red-500" v-if="formMessage">{{ formMessage }}</p>
                <button type="submit" class="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm text-white font-bold">
                    Ingresa a la plataforma
                </button>
            </form>
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue';
import services from '../services';
import { useRouter } from 'vue-router';

const emailValue = ref("");
const emailInputElement = ref("");
const passwordValue = ref(null);
const formMessage = ref(null);

const router = useRouter();

// Validación de email personalizada
onMounted(() => {
    watch(emailValue, (current) => {
        const re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (!re.test(current)) {
            emailInputElement.value.setCustomValidity('Invalid field.');
        } else {
            emailInputElement.value.setCustomValidity('');
        }

    });

});

async function FormHandler() {
    formMessage.value = null;
    // Campos vacíos?
    if( emailValue.value === "" || passwordValue.value === ""){
        formMessage.value = "Debe rellenar el formulario antes de enviarlo"
    } else {  
        // Pudiste hacer login?
        const didLogIn = await services.login(emailValue.value, passwordValue.value);
        console.log(didLogIn);
        if (didLogIn){
            router.push({name: 'admin'});
        } else {
            formMessage.value = 'Usuario o contraseña incorrectos 🤷‍♂️'
        }
    }
}

</script>