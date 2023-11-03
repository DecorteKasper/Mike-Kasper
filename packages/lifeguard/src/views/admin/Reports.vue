<template>
    <Container>
        <TableReports />
    </Container>
</template>

<script lang="ts">
import TableReports from '@/components/generic/TableReports.vue'
import Container from '@/components/generic/Container.vue';
export default {
    components: {
        TableReports,
        Container
    },
    setup() {
        return {
            // ...
        }
    }
}
</script>
