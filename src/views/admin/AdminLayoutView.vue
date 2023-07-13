<template>
    <router-view />
</template>

<script setup>
import services from '../../services';
import useAdminSessionStore from "../../storage/adminStorage.js";
import { useRouter } from 'vue-router';

const router = useRouter();
if (useAdminSessionStore().isLoggedIn) {
    if (services.retrieveUserInfo()) {
        router.push({name: 'dashboard'});
    } else {
        alert('Esto es un bug :(');q
    }
}

</script>

