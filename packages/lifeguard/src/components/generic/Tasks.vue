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
                <td class="px-6"></td>
                <td class="px-6">Post</td>
                <td class="px-6">Datum</td>
                <td class="px-6">Beschrijving</td>
                <td class="px-6">Status</td>
            </tr>
            <tr v-for="(task, index) in filteredTasks"
                :class="index % 2 === 0 ? 'border-l-4 border-dark_green h-12' : 'border-l-4 border-red h-12 bg-dark_grey'">
                <td class="pl-12">
                    <label class="checkbox-status">
                        <input type="checkbox" name="status" class="hidden" v-model="task.status"
                            @click="toggleTaskStatus(task.status, task)">
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
                <td class="">Post {{ task.post }}</td>
                <td class="">{{ formatDate(task.createdAt) }}</td>
                <td class="flex-col flex-wrap">{{ truncateDescription(task.description, 80) }}</td>
                <td class=""> {{ task.status === false ? 'Incompleted' : 'Completed' }}</td>
                <td class="">
                    <button class="mr-6" @click="deleteTask(task.id)">
                        <Trash2 class="w-7 h-7 text-red" />
                    </button>
                    <button @click="openModal(task)">
                        <Eye class="w-7 h-7 text-dark_green" />
                    </button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue'
import { Eye, Trash2, Check } from 'lucide-vue-next';
import { computed } from 'vue';

import { DELETE_TODO, UPDATE_TODO } from '@/graphql/todo.mutation'
import { useMutation } from '@vue/apollo-composable'
import useRealtime from '@/composables/useRealtime';
import type { Itask } from '@/interfaces/task.interface'


export default {

    components: {
        Eye,
        Trash2,
        Check
    },

    props: {
        todoData: {
            type: Array as () => Itask[],
            default: () => []
        }
    },

    methods: {
        openModal(task: Itask) {
            this.$emit('show-modal', task); 
            // Geeft een 'show-modal' event door naar de oudercomponent
            console.log(task)
        }
    },


    setup(props) {

        const completed = ref<string>("false")
        // console.log("Dit is de tasks table")
        // console.log("Dit zijn de props:", props.todoData)
        const { mutate: deleteTodo } = useMutation(DELETE_TODO)
        const { mutate: updateTodo } = useMutation(UPDATE_TODO)
        const tasks = ref<Itask[]>(props.todoData)
        const { on } = useRealtime()

        // Realtime data voor delete werkt nog niet
        on('todo:remove', (todo) => {

        })
        on('todo:update', (todo) => {
        })


        const deleteTask = (taskId: string) => {
            // console.log("Dit is de task id:", taskId)
            deleteTodo({
                id: taskId,
            }).then((result) => {
                if (!result?.data) {
                    throw new Error('Failed to delete todo')
                }
                console.log('todo deleted', result.data)
            }).catch((error) => {
                console.log(error)
            })
        };

        const formatDate = (isoDateString: string) => {
            const date = new Date(isoDateString);
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hour = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${month}-${day}    ${hour}:${minutes}`;
        };

        const toggleTaskStatus = (taskStatus: boolean, TaskObject: Itask) => {
            console.log('Before: task.status =', taskStatus);
            taskStatus = !taskStatus; // Omschakelen tussen true en false
            console.log('After: task.status =', taskStatus);

            const updatedTask = {
                id: TaskObject.id,
                post: TaskObject.post,
                createdAt: TaskObject.createdAt,
                status: taskStatus,
                description: TaskObject.description,
            }

            updateTodo({
                updateTodoInput: updatedTask
            }).then((result) => {
                if (!result?.data) {
                    throw new Error('Failed to update todo')
                }
                console.log('todo updated', result.data)
            }).catch((error) => {
                console.log(error)
            })


        };

        const filterTasks = (filterStatus: string) => {
            completed.value = filterStatus;
        };

        const filteredTasks = computed(() => {
            return tasks.value.filter(task => (completed.value === 'true' ? task.status === true : task.status === false));
        });

        const truncateDescription = (description: string, maxLength: number) => {
            if (description.length > maxLength) {
                return description.substring(0, maxLength) + '...';
            }
            return description;
        }

        watch(() => props.todoData, (newData) => {
            tasks.value = newData;
        });


        return {
            tasks,
            completed,
            toggleTaskStatus,
            filteredTasks,
            filterTasks,
            deleteTask,
            formatDate,
            truncateDescription
        }
    }
}


</script>