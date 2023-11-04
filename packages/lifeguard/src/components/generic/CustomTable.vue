<template>
    <div class="w-full h-130 shadow-cardShadow rounded-cardRadius my-custom-scrollbar overflow-auto">
        <div class="flex justify-between px-14 pt-8 mb-8">
            <h2 class="font-lato font-semibold text-lg flex items-center">
                {{ getTitle }}
            </h2>
            <div class="flex gap-4">
                <input class="max-w-lg p-2 bg-gray rounded-inputFieldRadius outline-none " type="search"
                    placeholder="Zoeken..." v-model="searchTerm" @input="filterItems">
            </div>
        </div>

        <table class="w-full">
            <!-- Titles -->
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
                <td v-if="tasksData.length > 0" class="font-lato font-semibold text-sm py-4">Post</td>
                <td v-if="tasksData.length > 0" class="font-lato font-semibold text-sm py-4">Datum</td>
                <td v-if="tasksData.length > 0" class="font-lato font-semibold text-sm py-4">Ingevuld</td>
                <td v-if="jobsData.length > 0 || sollisData.length > 0" class="font-lato font-semibold text-sm py-4">
                    Voornaam</td>
                <td v-if="jobsData.length > 0 || sollisData.length > 0" class="font-lato font-semibold text-sm py-4">Naam
                </td>
                <td v-if="jobsData.length > 0 || sollisData.length > 0" class="font-lato font-semibold text-sm py-4">Functie
                </td>

                <td class="flex justify-end gap-4 pr-14">
                    <PrimaryButton v-if="tasksData.length > 0" label="Downloaden" @click="" />
                    <PrimaryButton v-if="tasksData.length > 0" label="Verwijderen" @click="deleteAll" />
                    <PrimaryButton v-if="jobsData.length > 0 || sollisData.length > 0" label="Accepteer" @click="" />
                    <PrimaryButton v-if="jobsData.length > 0 || sollisData.length > 0" label="Afwijzen"
                        @click="deleteAll" />
                </td>

            </tr>

            <!-- Data -->
            <tr v-for="(item, index) in filteredItems" :class="index % 2 === 0 ? ' h-12' : ' h-12 bg-gray'">
                <td class="pl-14">
                    <label class="checkbox-status">
                        <input type="checkbox" name="status" class="hidden" v-model="item.status">
                        <div :class="{
                            'group p-1 w-fit bg-light_green rounded-full focus:outline-none cursor-pointer': item.status === true,
                            'group  p-1 w-fit bg-light_green rounded-full focus:outline-none cursor-pointer': item.status !== true
                        }">
                            <Check
                                :class="{ 'text-dark_green': item.status === true, 'opacity-0 group-hover:opacity-100': item.status !== true }"
                                :stroke-width="4" :size="14" />
                        </div>
                    </label>
                </td>
                <!-- Tasks -->
                <td v-if="tasksData.length > 0 && 'title' in item" class="font-lato text-sm">{{ item.title }}</td>
                <td v-if="tasksData.length > 0 && 'date' in item" class="font-lato text-sm">{{ item.date }}</td>
                <td v-if="tasksData.length > 0 && 'description' in item" class="font-lato text-sm">{{ item.description }}
                </td>
                <!-- Jobs -->
                <td v-if="jobsData.length > 0 && 'name' in item || sollisData.length > 0 && 'name' in item"
                    class="font-lato text-sm">{{ item.name }}</td>
                <!-- <td v-if="sollisData.length > 0 && 'name' in item" class="font-lato text-sm">{{ item.name }}</td> -->

                <td v-if="jobsData.length > 0 && 'surname' in item || sollisData.length > 0 && 'surname' in item"
                    class="font-lato text-sm">{{ item.surname }}</td>
                <td v-if="jobsData.length > 0 && 'function' in item || sollisData.length > 0 && 'function' in item"
                    class="font-lato text-sm">{{ item.function }}
                </td>

                <td class="font-lato text-sm pr-14">
                    <div class="flex align-middle justify-end">
                        <!-- Jobs en sollicitaties -->
                        <button v-if="jobsData.length > 0 || sollisData.length > 0" class="mr-6"
                            @click="deleteItem(item.id)">
                            <X class="w-7 h-7 text-red" />
                        </button>
                        <button v-if="jobsData.length > 0 || sollisData.length > 0">
                            <CheckCircle class="w-7 h-7 text-dark_green" />
                        </button>
                        <!-- Reports -->
                        <button v-if="tasksData.length > 0" class="mr-6" @click="deleteItem(item.id)">
                            <Trash2 class="w-7 h-7 text-red" />
                        </button>
                        <button v-if="tasksData.length > 0">
                            <Eye class="w-7 h-7 text-dark_green" />
                        </button>
                    </div>
                </td>
            </tr>
            <!-- </tr> -->
        </table>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Eye, Trash2, Check, CheckCircle, X } from 'lucide-vue-next';
import { computed } from 'vue';
import PrimaryButton from './PrimaryButton.vue';


interface Task {
    id: number;
    title: string;
    date: string;
    description: string;
    status: boolean;
}

interface Job {
    id: number;
    name: string;
    surname: string;
    function: string;
    status: boolean;
}

export default {

    props: {
        tasksData: {
            type: Array as () => Task[],
            default: () => []
        },
        jobsData: {
            type: Array as () => Job[],
            default: () => []
        },
        sollisData: {
            type: Array as () => Job[],
            default: () => []
        }
    },

    components: {
        Eye,
        Trash2,
        Check,
        PrimaryButton,
        CheckCircle,
        X

    },

    computed: {
        getTitle() {
            if (this.tasksData.length > 0) {
                return 'Taken';
            } else if (this.jobsData.length > 0) {
                return 'Werknemers';
            } else if (this.sollisData.length > 0) {
                return 'Sollicitaties';
            }
            else {
                return 'Geen gegevens beschikbaar';
            }
        }
    },

    setup(props) {

        const sollis = ref<Job[]>(props.sollisData);
        const jobs = ref<Job[]>(props.jobsData);
        const tasks = ref<Task[]>(props.tasksData);
        // Select values
        const selectAll = ref(false);
        const searchTerm = ref('')
        // Select All
        const toggleSelectAll = () => {
            const selectAllStatus = selectAll.value;
            tasks.value.forEach((task) => {
                task.status = selectAllStatus;
            });
            // voor de jobs 
            jobs.value.forEach((job) => {
                job.status = selectAllStatus;
            });
            // voor de sollis
            sollis.value.forEach((solli) => {
                solli.status = selectAllStatus;
            });
        };

        // Delete
        const deleteItem = (taskId: number) => {
            if (tasks.value.length > 0) {
                tasks.value = tasks.value.filter(task => task.id !== taskId);
            } else if (jobs.value.length > 0) {
                jobs.value = jobs.value.filter(job => job.id !== taskId);
            } else if (sollis.value.length > 0) {
                sollis.value = sollis.value.filter(solli => solli.id !== taskId);
            }
        };

        // Delete all
        const deleteAll = () => {
            if (tasks.value.length > 0) {
                tasks.value = tasks.value.filter(task => task.status !== true);
                console.log('tasks after delete:', tasks.value)
                console.log('jobs after delete:', jobs.value)
            } else if (jobs.value.length > 0) {
                jobs.value = jobs.value.filter(jobs => jobs.status !== true);
            } else if (sollis.value.length > 0) {
                sollis.value = sollis.value.filter(solli => solli.status !== true);
            }
        };

        // Search
        const filteredItems = computed(() => {
            const searchTermValue = searchTerm.value.toLowerCase().trim();

            // Filter zowel tasks als jobs op basis van zoekterm
            const filteredTasks = tasks.value.filter((task) => {
                return (
                    task.title.toLowerCase().includes(searchTermValue) ||
                    task.date.toLowerCase().includes(searchTermValue) ||
                    task.description.toLowerCase().includes(searchTermValue)
                );
            });

            const filteredJobs = jobs.value.filter((job) => {
                // Voer hier zoeklogica uit voor job-gerelateerde eigenschappen
                return (
                    job.name.toLowerCase().includes(searchTermValue) ||
                    job.surname.toLowerCase().includes(searchTermValue) ||
                    job.function.toLowerCase().includes(searchTermValue)
                );
            });

            const filteredSollis = sollis.value.filter((solli) => {
                // Voer hier zoeklogica uit voor job-gerelateerde eigenschappen
                return (
                    solli.name.toLowerCase().includes(searchTermValue) ||
                    solli.surname.toLowerCase().includes(searchTermValue) ||
                    solli.function.toLowerCase().includes(searchTermValue)
                );
            });


            // Combineer de resultaten van de zoekopdrachten voor taken en banen
            return [...filteredTasks, ...filteredJobs, ...filteredSollis];
        });


        const filterItems = () => {
            searchTerm.value = searchTerm.value.toLowerCase();
        };

        return {
            tasks,
            jobs,
            sollis,
            filteredItems,
            filterItems,
            deleteItem,
            searchTerm,
            selectAll,
            toggleSelectAll,
            deleteAll
        }
    }
}

</script>