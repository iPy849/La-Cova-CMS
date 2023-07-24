<template>
    <div>
        <h3 class="text-3xl font-semibold underline">{{ props.name }}:</h3>
        <draggable
            v-model="meals"
            group="meals"
            item-key="id"
            v-bind="{
                ghostClass: 'onDragItem',
                animation: 250
            }"
        >
            <template #item="{ element }">
                <ItemComponent :meal="element"/>
            </template>
        </draggable>
    </div>
</template>

<script setup>
import {defineProps, onBeforeMount, ref} from "vue";
import services from "../../../services/index.js";
import ItemComponent from "./ItemComponent.vue";
import draggable from "vuedraggable";

const props = defineProps({
    id: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    }
});
const meals = ref([]);
const readyToRender = ref(false);

onBeforeMount(async () => {
    meals.value = await services.getFoodBySection(props.id);
    readyToRender.value = true;
});
</script>