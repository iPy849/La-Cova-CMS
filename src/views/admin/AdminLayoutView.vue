<template>
    <AdminNavBarComponent/>
    <div class="px-6">
        <router-view />
    </div>
</template>
<script setup>
import AdminNavBarComponent from "../../components/AdminNavBarComponent.vue";
import services from '../../services';
import {onBeforeMount} from "vue";

onBeforeMount(() => {
    services.retrieveUserInfo();
});

</script>