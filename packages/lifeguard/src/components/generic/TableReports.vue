<template>
    <div class="w-full h-130 shadow-cardShadow rounded-cardRadius my-custom-scrollbar overflow-auto">
        <div class="flex justify-between px-14 pt-8 mb-8">
            <h2 class="font-lato font-semibold text-lg flex items-center">Verslagen</h2>
            <div class="flex gap-4">
                <input class="max-w-lg p-2 bg-gray rounded-inputFieldRadius outline-none " type="search"
                    placeholder="Zoeken..." v-model="searchTerm" @input="filterReports">
            </div>
        </div>

        <table class="w-full">
            <tr class="border-b-2 border-dark_green">
                <td class="pl-14 ">
                    <label class="checkbox-status">
                        <input type="checkbox" name="selectAll" class="hidden" v-model="selectAll"
                            @change="toggleSelectAll" />
                        <div :class="{
                            'group p-1 w-fit bg-light_green rounded-full focus:outline-none cursor-pointer': selectAll,
                            'group p-1  w-fit bg-light_green rounded-full focus:outline-none cursor-pointer': !selectAll
                        }">
                            <Check
                                :class="{ 'text-dark_green': selectAll, 'opacity-0 group-hover:opacity-100': !selectAll }"
                                :stroke-width="4" :size="14" />
                        </div>
                    </label>
                </td>
                <td class="font-lato font-semibold text-sm py-4">Post</td>
                <td class="font-lato font-semibold text-sm py-4">Datum</td>
                <td class="font-lato font-semibold text-sm py-4">Ingevuld</td>
                <!-- Funcionaliteit van buttons nog maken + secundary button maken -->
                <td class="flex justify-end gap-4 pr-14">
                    <PrimaryButton label="Downloaden" @click="" />
                    <PrimaryButton label="Verwijderen" @click="deleteSelectedReports" />
                </td>

            </tr>
            <tr v-for="(task, index) in filteredReports" :class="index % 2 === 0 ? ' h-12' : ' h-12 bg-gray'">
                <td class="pl-14">
                    <label class="checkbox-status">
                        <input type="checkbox" name="status" class="hidden" v-model="task.status"
                            @change="toggleTaskStatus(task.status)">
                        <div :class="{
                            'group p-1 w-fit bg-light_green rounded-full focus:outline-none cursor-pointer': task.status === true,
                            'group  p-1 w-fit bg-light_green rounded-full focus:outline-none cursor-pointer': task.status !== true
                        }">
                            <Check
                                :class="{ 'text-dark_green': task.status === true, 'opacity-0 group-hover:opacity-100': task.status !== true }"
                                :stroke-width="4" :size="14" />
                        </div>
                    </label>
                </td>
                <td class="font-lato text-sm">{{ task.title }}</td>
                <td class="font-lato text-sm">{{ task.date }}</td>
                <td class="font-lato text-sm">{{ task.description }}</td>
                <td class="font-lato text-sm pr-14">
                    <div class="flex align-middle justify-end">
                        <button class="mr-6" @click="deleteTask(task.id)">
                            <Trash2 class="w-7 h-7 text-red" />
                        </button>
                        <button>
                            <Eye class="w-7 h-7 text-dark_green" />
                        </button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Eye, Trash2, Check } from 'lucide-vue-next';
import { computed } from 'vue';
import PrimaryButton from './PrimaryButton.vue';


interface Task {
    id: number;
    title: string;
    date: string;
    description: string;
    status: boolean;
}

export default {

    components: {
        Eye,
        Trash2,
        Check,
        PrimaryButton
    },

    setup() {

        const selectAll = ref(false);
        const searchTerm = ref('')
        const tasks = ref<Task[]>([
            {
                id: 1,
                title: 'Post 1',
                date: '02/03/2023',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..',
                status: true,
            },
            {
                id: 2,
                title: 'Post 2',
                date: '01/03/2023',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..',
                status: true,
            },
            {
                id: 3,
                title: 'Post 1',
                date: '02/03/2023',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..',
                status: false,
            },
            {
                id: 4,
                title: 'Post 6',
                date: '02/03/2023',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor..',
                status: false,
            },
        ])

        const toggleTaskStatus = (taskStatus: boolean) => {
            console.log('Before: task.status =', taskStatus);
            taskStatus = taskStatus; // Omschakelen tussen true en false
            console.log('After: task.status =', taskStatus);
        };

        // Select All
        const toggleSelectAll = () => {
            const selectAllStatus = selectAll.value;
            tasks.value.forEach((task) => {
                task.status = selectAllStatus;
            });
        };

        // Delete
        const deleteTask = (taskId: number) => {
            tasks.value = tasks.value.filter(task => task.id !== taskId);
        };

        // Delete all
        const deleteSelectedReports = () => {
            tasks.value = tasks.value.filter(task => task.status !== true);
        };

        // Search
        const filteredReports = computed(() => {
            const searchTermValue = searchTerm.value.toLowerCase().trim();
            return tasks.value.filter((task) => {
                // Controleer of de zoekterm overeenkomt met title, date of description
                return (
                    task.title.toLowerCase().includes(searchTermValue) ||
                    task.date.toLowerCase().includes(searchTermValue) ||
                    task.description.toLowerCase().includes(searchTermValue)
                );
            });
        });

        const filterReports = () => {
            searchTerm.value = searchTerm.value.toLowerCase();
        };

        return {
            tasks,
            filteredReports,
            filterReports,
            toggleTaskStatus,
            deleteTask,
            searchTerm,
            selectAll,
            toggleSelectAll,
            deleteSelectedReports
        }
    }
}

</script>