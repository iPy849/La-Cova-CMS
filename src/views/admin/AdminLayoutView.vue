<template>
    <AdminNavBarComponent/>
    <router-view />
    Hola puto
</template>
<script setup>
import AdminNavBarComponent from "../../components/AdminNavBarComponent.vue";
import useAdminSessionStore from "../../storage/adminStorage";
import services from '../../services';
services.retrieveUserInfo();
useAdminSessionStore();
</script>