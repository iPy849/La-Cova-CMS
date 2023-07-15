<template>
    <TransitionRoot appear :show="props.isOpen">
        <Dialog as="div" class="relative z-10">
            <TransitionChild enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-md transform overflow-hidden rounded bg-white p-6 text-left align-middle shadow transition-all">
                            <DialogTitle as="h3" class="text-xl font-semibold leading-6">
                                {{ props.title }}
                            </DialogTitle>
                            <DialogDescription as="div" class="mt-2">
                                <p class="text-gray-500">
                                    {{ props.text }}
                                </p>
                            </DialogDescription>

                            <div class="mt-4">
                                <button type="button"
                                    class="mr-4 rounded-md px-4 text-blue-500 py-2 hover:bg-blue-500 hover:text-white focus:outline-none focus-visible:bg-blue-100"
                                    @click="emit('positive')">
                                    Aceptar
                                </button>
                                <button type="button"
                                    class="mr-4 rounded-md px-4 text-red-500 py-2 hover:bg-red-500 hover:text-white focus:outline-none focus-visible:bg-red-100"
                                    @click="emit('cancellation')">
                                    Cancelar
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
  
<script setup>
import { defineProps, defineEmits } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
} from '@headlessui/vue'

// Props
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    isOpen: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['positive', 'cancellation'])

</script>
  