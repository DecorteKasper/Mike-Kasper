<template>
    <!-- Overlay -->
    <Transition name="fade">
        <div v-if="isVisible" class="overlay"></div>
    </Transition>


    <Transition name="slide-fade">
        <div v-if="isVisible"
            class="ModalWindow shadow-cardShadow rounded-cardRadius w-1/3 py-12 px-12 bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="flex justify-end mb-6">
                <button class="bg-greenx p-1 rounded-full" @click="CloseModal">
                    <X :stroke-width="2" :size="25" class="text-white" />
                </button>
            </div>

            <h1 class="mb-8 font-lato font-bold text-xl text-greenx">Post {{ localTaskData.post }}</h1>
            <p class="font-lato text-sm mb-8 leading-6 text-black">{{ localTaskData.description }}</p>
            <div class="flex justify-end">
                <p class="font-lato text-xs text-greenx">{{ localTaskData.createdAt }}</p>
            </div>
        </div>
    </Transition>
</template>


<script lang="ts">
import { X } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import type { Itask } from '@/interfaces/task.interface'


export default {

    components: { X },
    props: {
        isVisible: {
            type: Boolean,
            required: true
        },
        taskData: {
            type: Object as () => Itask,
            default: null
        }
    },

    setup(props, { emit }) {



        const localTaskData = ref<Itask>(props.taskData)

        watch(() => props.taskData, (newValue) => {
            localTaskData.value = newValue;
        });

        const CloseModal = () => {
            emit('close-modal')
        }

        return {
            CloseModal,
            localTaskData
        }
    }
}

</script>

<style scoped>
.ModalWindow.slide-fade-enter-active,
.ModalWindow.slide-fade-leave-active {
    transition: all 0.3s ease-out;
}

.ModalWindow.slide-fade-enter-from,
.ModalWindow.slide-fade-leave-to {
    scale: 0;
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(154, 193, 188, 0.5);
    backdrop-filter: blur(8px);
    /* Aanpassen naar de gewenste kleur en dekking */
    z-index: 1000;
    /* Zorg ervoor dat de overlay bovenop andere elementen staat */
}

.ModalWindow {
    z-index: 1001;
    /* Zorg ervoor dat de modal bovenop de overlay staat */
}
</style>