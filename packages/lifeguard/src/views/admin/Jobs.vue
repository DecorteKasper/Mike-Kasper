<template>
    <Container>
        <div class="flex gap-6">
            <ul class="shadow-cardShadow rounded-cardRadius p-10 h-fit">
                <li @click="showJobs"
                    class="font-lato rounded-inputFieldRadius cursor-pointer hover:text-white hover-bg-green py-2 px-4 mb-4 transition-all duration-75 ease-in"
                    :class="{ 'bg-green text-white': currentMenuItem === 'jobs' }">
                    Werknemers
                </li>
                <li @click="showSollis"
                    class="font-lato rounded-inputFieldRadius cursor-pointer hover:text-white hover-bg-green py-2 px-4 transition-all duration-75 ease-in"
                    :class="{ 'bg-green text-white': currentMenuItem === 'solli' }">
                    sollicitaties
                </li>
            </ul>
            <CostumTable v-if="currentData === jobs" :jobsData="currentData" class="flex-1" />
            <CostumTable v-else-if="currentData === solli" :sollisData="currentData" class="flex-1" />
        </div>
    </Container>
</template>

<script lang="ts">
import { ref } from 'vue';
import CostumTable from '@/components/generic/CustomTable.vue'
import Container from '@/components/generic/Container.vue';


interface Job {
    id: number;
    name: string;
    surname: string;
    function: string;
    status: boolean;
}


export default {

    components: {
        CostumTable,
        Container
    },


    setup() {

        const jobs = ref<Job[]>([

            {
                id: 1,
                name: "John",
                surname: "Doe",
                function: "Redder",
                status: false,
            },
            {
                id: 2,
                name: "Alice",
                surname: "Smith",
                function: "Ehbo",
                status: false,
            },
            {
                id: 3,
                name: "Bob",
                surname: "Johnson",
                function: "Ehbo",
                status: false,
            },
            {
                id: 4,
                name: "Eva",
                surname: "Brown",
                function: "Redder",
                status: false,
            },
            {
                id: 5,
                name: "David",
                surname: "Lee",
                function: "Redder",
                status: false,
            },
        ])

        const solli = ref<Job[]>([

            {
                id: 1,
                name: "NewName1",
                surname: "NewSurname1",
                function: "NewFunction1",
                status: false,  // Je kunt de status ook veranderen
            },
            {
                id: 2,
                name: "NewName2",
                surname: "NewSurname2",
                function: "NewFunction2",
                status: false,
            },
            {
                id: 3,
                name: "NewName3",
                surname: "NewSurname3",
                function: "NewFunction3",
                status: false,
            },
            {
                id: 4,
                name: "NewName4",
                surname: "NewSurname4",
                function: "NewFunction4",
                status: false,
            },
            {
                id: 5,
                name: "NewName5",
                surname: "NewSurname5",
                function: "NewFunction5",
                status: false,
            },
        ])
        const currentData = ref(jobs.value);
        const currentMenuItem = ref('jobs');

        const showJobs = () => {
            currentData.value = jobs.value; // Schakel naar de "jobs" data
            currentMenuItem.value = 'jobs';
            console.log(currentMenuItem);
        }
        const showSollis = () => {
            currentData.value = solli.value; // Schakel naar de "sollis" data
            currentMenuItem.value = 'solli';
            console.log(currentMenuItem);
        }

        return {
            jobs,
            solli,
            currentData,
            showJobs,
            showSollis,
            currentMenuItem
        }
    }
}
</script>