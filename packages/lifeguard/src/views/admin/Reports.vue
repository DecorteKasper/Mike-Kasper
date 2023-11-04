<template>
    <Container>
        <CostumTable :tasks-data="tasks" />
    </Container>
</template>

<script lang="ts">
import CostumTable from '@/components/generic/CustomTable.vue';
import Container from '@/components/generic/Container.vue';
import { ref } from 'vue';



interface Task {
    id: number;
    title: string;
    date: string;
    description: string;
    status: boolean;
}


export default {
    components: {
        CostumTable,
        Container
    },
    setup() {

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



        return {
            tasks
        }
    }
}
</script>
