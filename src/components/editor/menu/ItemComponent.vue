<template>
    <div class="py-2">
        <!--Mobile view-->
        <div class="lg:hidden flex items-center sm:max-w-lg bg-red-500">
            <Bars2Icon class="h-4 text-gray-500 inline mr-2"/>
            <div class="border-2 p-2 border-gray-500 rounded-sm w-full flex justify-between font-semibold items-center">
                <div class="w-4/6 inline-flex items-center pr-2">
                    <!--TODO: hacer validaciones acá-->
                    <label :for="nameInputId" class="sr-only">Nombre</label>
                    <PencilIcon class="h-4 w-4 mr-2"/> 
                    <textarea :id="nameInputId" v-model="meal.name" class="p-0 border-0 w-full bg-transparent resize-none" rows="2"/>
                </div>
                <div class="w-2/6 inline-flex items-sta">
                    <!--TODO: hacer validaciones acá-->
                    <label :for="priceInputId" class="sr-only">Precio</label>
                    <PencilIcon class="h-4 w-4"/>
                    <input type="number" :id="priceInputId" v-model="meal.price" class="p-0 border-0 w-full bg-transparent"/>
                </div>
            </div>
        </div>
        <!--Desktop view-->
        <div class="grid grid-cols-5 gap-2 justify-items-start content-center hidden lg:block">
            <span class="col-span-2">{{ meal.name }}</span>
            <div class="w-full h-0 border-b-2 border-black border-dotted col-span-2"></div>
            <span class="justify-self-end">{{ meal.price }}</span>
        </div>
    </div>
</template>

<script setup>
import {defineProps, defineEmits, computed} from "vue";
import {Bars2Icon, PencilIcon} from "@heroicons/vue/20/solid/index.js";

const props = defineProps({
    meal: {
        required: true,
        type: Object
    },
});


const emits = defineEmits(['delete, modify'])

const nameInputId = computed(() => {
   return 'n' + props.meal.id ;
});

const priceInputId = computed(() => {
    return 'p' + props.meal.id ;
});

</script>