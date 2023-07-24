<template>
    <SectionComponent v-for="(section, i) in sections" :key=i :id="section.id" :name="section.name"/>
</template>
<script setup>
import {onMounted, ref} from "vue";
import services from "../../services/index.js";
import SectionComponent from "../../components/editor/menu/SectionComponent.vue";

const sections = ref([]);

onMounted(async () => {
    sections.value = await services.getSections();
});
</script>