<template>
    <div class="w-full h-72 shadow-cardShadow rounded-cardRadius my-custom-scrollbar overflow-auto">
        <div class="flex justify-between px-14 pt-8 mb-8">
            <h2 class="font-lato font-semibold text-lg">Takenlijst</h2>
            <div>
                <label class="radio-status">
                    <input type="radio" value="true" name="status" class="hidden" v-model="completed">
                    <span :class="{
                        'bg-dark_green text-xs font-regular text-white px-4 py-2 rounded-l-buttonRadius focus:outline-none cursor-pointer': completed === 'true',
                        'bg-dark_grey text-xs font-medium text-black px-4 py-2 rounded-l-buttonRadius focus:outline-none cursor-pointer': completed !== 'true'
                    }" @click="filterTasks('true')">
                        Compleet
                    </span>
                </label>
                <label class="radio-status">
                    <input type="radio" value="false" name="status" class="hidden" v-model="completed">
                    <span :class="{
                        'bg-red text-xs font-regular text-white px-4 py-2 rounded-r-buttonRadius focus:outline-none cursor-pointer': completed === 'false',
                        'bg-dark_grey text-xs font-medium text-black px-4 py-2 rounded-r-buttonRadius focus:outline-none cursor-pointer': completed !== 'false'
                    }" @click="filterTasks('false')">
                        Incompleet
                    </span>
                </label>
            </div>
        </div>

        <table class="w-full">
            <tr class="border-b-2 border-dark_green py-4">
                <td class=""></td>
                <td class="">Post</td>
                <td class="">Datum</td>
                <td class="">Beschrijving</td>
                <td class="">Status</td>
            </tr>
            <tr v-for="(task, index) in filteredTasks"
                :class="index % 2 === 0 ? 'border-l-4 border-dark_green h-12' : 'border-l-4 border-red h-12 bg-dark_grey'">
                <td class="pl-12">
                    <label class="checkbox-status">
                        <input type="checkbox" name="status" class="hidden" v-model="task.status"
                            @change="toggleTaskStatus(task.status)">
                        <div :class="{
                            'group border-2 p-1 border-dark_green w-fit rounded-full focus:outline-none cursor-pointer': task.status === true,
                            'group border-2 p-1 border-black w-fit rounded-full focus:outline-none cursor-pointer': task.status !== true
                        }">
                            <Check
                                :class="{ 'text-dark_green': task.status === true, 'opacity-0 group-hover:opacity-100': task.status !== true }"
                                :stroke-width="4" :size="14" />
                        </div>
                    </label>
                </td>
                <td class="">{{ task.title }}</td>
                <td class="">{{ task.date }}</td>
                <td class="">{{ task.description }}</td>
                <td class=""> {{ task.status === false ? 'Incompleted' : 'Completed' }}</td>
                <td class="">
                    <button class="mr-6" @click="deleteTask(task.id)">
                        <Trash2 class="w-7 h-7 text-red" />
                    </button>
                    <button>
                        <Eye class="w-7 h-7 text-dark_green" />
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Eye, Trash2, Check } from 'lucide-vue-next';
import { computed } from 'vue';


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
        Check
    },

    setup() {

        const completed = ref<string>("false")
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
                date: '02/03/2023',
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

        const filterTasks = (filterStatus: string) => {
            completed.value = filterStatus;
        };

        const filteredTasks = computed(() => {
            return tasks.value.filter(task => (completed.value === 'true' ? task.status === true : task.status === false));
        });

        const deleteTask = (taskId: number) => {
            tasks.value = tasks.value.filter(task => task.id !== taskId);
        };


        return {
            tasks,
            completed,
            toggleTaskStatus,
            filteredTasks,
            filterTasks,
            deleteTask
        }
    }
}

</script>