<template>
    <Container v-if="accessUser.userByUid.accessPlatform">
        <CostumTable @show-modal="showModal" :ReportsData="ReportsData" :deleteEvent="DeletedId"
            :deleteEvents="DeletedIds" />
        <div>
            <!-- Zorgen dat ik met de modalwindow de delete kan bevestigen. -->
            <ModalWindow @close-modal="closeModal" :isVisible="isModalVisible" :reportData="(OneReport as Ireport)"
                :deleteOneReport="(modalDelete as string)" :deleteManyReports="(modalDeleteMany as string[])"
                :ReportsData="ReportsData" @item-deleted="DeletedOne" @items-deleted="DeletedMany" />
        </div>
    </Container>
</template>

<script lang="ts">
import CostumTable from '@/components/generic/CustomTable.vue';
import Container from '@/components/generic/Container.vue';
import { reactive, ref, watch } from 'vue';
import { ALL_RECORDS } from '@/graphql/report.query';
import type { Ireport } from '@/interfaces/report.interface';
import { useQuery } from '@vue/apollo-composable';
import ModalWindow from '@/components/generic/ModalWindow.vue';
import useFirebase from '@/composables/useFirebase'
import { GET_USER_BY_UID } from '@/graphql/user.query'
import router from '@/router'



export default {
    components: {
        CostumTable,
        Container,
        ModalWindow
    },

    setup() {

        const ReportsData = ref<Ireport[]>([])
        const DeletedId = ref<string>()
        const DeletedIds = ref<string[]>()
        // variabelen die ik kan meegeven aan de modalwindow
        const OneReport = ref<Ireport | null>()
        const modalDelete = ref<string | null>()
        const modalDeleteMany = ref<string[] | null>()
        // Het modal venster is standaard niet zichtbaar
        const isModalVisible = ref(false)
        const { firebaseUser } = useFirebase()
        const { result: user, error: userError } = useQuery(GET_USER_BY_UID, {
            uid: firebaseUser.value?.uid,
        })


        const acces = (() => {
            if (user.value?.userByUid.accessPlatform === false) {
                // Ga terug naar de homepagina
                router.push({ path: '/' });
            }
        })();



        // Functie om de modal te openen 2 parameters: report en id als optie
        const showModal = (options: { report?: any, id?: string, ids?: string[] }) => {
            // Controleer of er een report of id beschikbaar is
            if (options.report) {
                isModalVisible.value = true
                // Steek de report in de modalReportData (idem voor else if)
                OneReport.value = options.report;
            } else if (options.id) {
                isModalVisible.value = true
                modalDelete.value = options.id;
            } else if (options.ids) {
                isModalVisible.value = true
                modalDeleteMany.value = options.ids;
            }
            else {
                console.log('Geen report of id beschikbaar');
            }
        }

        const closeModal = () => {
            isModalVisible.value = false
            OneReport.value = null
            modalDelete.value = null
            modalDeleteMany.value = null
        }

        const {
            loading: reportsLoading,
            result: reports,
            error: reportsError,
        } = useQuery(ALL_RECORDS);


        watch(reports, (Value) => {

            if (Value) {
                // Destructure de waarden uit het Value-object
                const { reports: arrayOfObjects } = Value;

                if (Array.isArray(arrayOfObjects)) {
                    // Update ReportsData met de array van objecten
                    arrayOfObjects.forEach(element => {
                        ReportsData.value.push(element)
                    });
                } else {
                    console.log('Geen array van objecten beschikbaar');
                }
            } else {
                console.log('Geen gegevens beschikbaar');
            }

        })

        // Functie om de report te deleten
        const DeletedOne = (id: string) => {
            DeletedId.value = id
            console.log('Dit is de callback event voor deletevent', DeletedId.value)
        }

        const DeletedMany = (ids: string[]) => {
            DeletedIds.value = [];
            // Voeg de nieuwe set 'ids' toe
            DeletedIds.value.push(...ids);
            console.log('--------------------------------')
            console.log('Dit is de callback event voor deletevents', DeletedIds.value)
        }


        return {
            ReportsData,
            showModal,
            closeModal,
            isModalVisible,
            OneReport,
            modalDelete,
            modalDeleteMany,
            DeletedOne,
            DeletedMany,
            // Om mee te sturen naar CustomTable
            DeletedId,
            DeletedIds,
            accessUser: user
        }
    }
}
</script>
