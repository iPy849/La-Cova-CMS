<template>
  <DialogComponent title="¡Estás a punto de cerrar sesión!" text="¿Está seguro que desea continuar?"
    :is-open="isLogoutDialog" @positive="handleLogoutDialog" @cancellation="isLogoutDialog = false" />
  <header class="bg-white">
    <nav class="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
      <div class="flex lg:flex-1">
        <a href="#" class="-m-1.5 p-1.5">
          <span class="sr-only">Your Company</span>
          <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
        </a>
      </div>
      <div class="flex lg:hidden">
        <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          @click="isMobileMenuOpen = true">
          <span class="sr-only">Open main menu</span>
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <div class="hidden lg:flex lg:gap-x-12">
        <RouterLink v-for="(navItem, i) in navItems" :key="i" class="text-sm font-semibold leading-6 active:underline"
          :class="{ 'underline underline-offset-8 decoration-4 decoration-blue-500': navItem.route.name === route.name }"
          :to="navItem.route">{{ navItem.name }}</RouterLink>
      </div>
      <div class="hidden lg:flex lg:flex-1 lg:justify-end">
        <span
          class="text-sm leading-6 text-red-500 hover:text-white font-bold border-2 hover:bg-red-500 border-red-500 rounded-full px-3 py-2 shadow"
          @click="isLogoutDialog = true">Cerrar editor</span>
      </div>
    </nav>
    <!-- Mobile menu, show/hide based on menu open state. -->
    <div class="lg:hidden" role="dialog" aria-modal="true" v-if="isMobileMenuOpen">
      <!-- Background backdrop, show/hide based on slide-over state. -->
      <div class="fixed inset-0 z-10"></div>
      <div
        class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div class="flex items-center justify-between">
          <a href="#" class="-m-1.5 p-1.5">
            <span class="sr-only">Your Company</span>
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="">
          </a>
          <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" @click="isMobileMenuOpen = false">
            <span class="sr-only">Close menu</span>
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
              aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="mt-6 flow-root">
          <div class="-my-6 divide-y divide-gray-500/10">
            <div class="space-y-2 py-6">
              <div class="-mx-3">
                <p type="button"
                  class="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-xl font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  aria-controls="disclosure-1" aria-expanded="false">
                  Menú de edición:
                </p>
                <div class="mt-2 space-y-2" id="disclosure-1">
                  <RouterLink v-for="(navItem, i) in navItems" :key="i"
                    class="block py-2 pl-6 pr-3 text-sm font-semibold leading-7 active:bg-gray-100"
                    :class="{ 'bg-gray-100': navItem.route.name === route.name }" :to="navItem.route"
                    @click="isMobileMenuOpen = false">
                    {{ navItem.name }}
                  </RouterLink>
                </div>
              </div>
            </div>
            <div class="py-6 text-center">
              <span
                class="text-sm leading-6 text-red-500 hover:text-white font-bold border-2 hover:bg-red-500 border-red-500 rounded-full px-3 py-2 shadow"
                @click="isLogoutDialog = true">Cerrar editor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import services from '../services';
import DialogComponent from './DialogComponent.vue';


const router = useRouter();
const route = useRoute();

const navItems = ref([
  { name: "Edición de diseño", route: { name: 'design-editor' } },
  { name: "Edición de menú", route: { name: 'menu-editor' } },
  { name: "Edición de cambio de moneda", route: { name: 'currency-editor' } },
]);
const isMobileMenuOpen = ref(false);
const isLogoutDialog = ref(false);

function handleLogoutDialog() {
  isLogoutDialog.value = false;
  if (!services.logout()) {
    alert('Houston tenemos un problema')
  } else {
    router.push({ name: 'login' });
  }
}
</script>