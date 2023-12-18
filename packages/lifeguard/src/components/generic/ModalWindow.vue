<template>
    <!-- Overlay -->
    <Transition name="fade">
        <div v-if="isVisible" class="overlay"></div>
    </Transition>


    <Transition name="slide-fade">
        <div v-if="isVisible"
            class="ModalWindow shadow-cardShadow rounded-cardRadius w-md py-8 px-8 bg-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">

            <div v-if="localReportData" class="flex justify-end mb-6">
                <button class="bg-greenx p-1 rounded-full" @click="CloseModal">
                    <X :stroke-width="2" :size="25" class="text-white" />
                </button>
            </div>
<!-- 
            <h1 v-if="taskData" class="mb-8 font-lato font-bold text-xl text-greenx">Post {{ localTaskData.post }}</h1>
            <p v-if="taskData" class="font-lato text-sm mb-8 leading-6 text-black">{{ localTaskData.description }}</p>
            <div v-if="taskData" class="flex justify-end">
                <p class="font-lato text-xs text-greenx">{{ localTaskData.createdAt }}</p>
            </div> -->

            <div v-if="localReportData">
                <!-- Nog te bespreken met Kasper wat we allemaal zullen terug geven van dat -->
                <div class="flex items-center justify-between">
                    <h1 class="mb-8 font-lato font-bold text-xl text-greenx">Verslag post {{ localReportData.reddersPost }}
                    </h1>
                    <h2 class="font-lato text-lg mb-8 leading-6 text-grey">{{ formatDate(localReportData.createdAt) }}</h2>
                </div>
            </div>
            <!-- Delete one -->
            <div v-if="reportId || reportIds" class="flex flex-col">
                <div>
                    <h1 class="mb-8 font-lato font-medium text-lg text-black">Ben je zeker dat je dit verslag wilt
                        verwijderen?
                    </h1>
                </div>

                <div class="flex gap-4 justify-center">
                    <PrimaryButton v-if="reportId" label="Verwijderen" @click="deleteItem(deleteOneReport)" />
                    <PrimaryButton v-if="reportIds" label="Verwijderen" @click="deleteAll(deleteManyReports)" />
                    <!-- Dit zal de secundary button zijn -->
                    <PrimaryButton label="Annuleren" @click="CloseModal" />
                </div>
            </div>
        </div>
    </Transition>
</template>


<script lang="ts">
import { X } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import type { Itask } from '@/interfaces/task.interface'
import type { Ireport } from '@/interfaces/report.interface';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { ALL_RECORDS } from '@/graphql/report.query';
import { DELETE_REPORT, DELETE_ALL_REPORTS } from '@/graphql/report.mutation'
import PrimaryButton from '@/components/generic/PrimaryButton.vue';


export default {

    components: { X, PrimaryButton },
    props: {
        // Om de modal te openen
        isVisible: {
            type: Boolean,
            required: true
        },
        taskData: {
            type: Object as () => Itask,
            default: null
        },
        // Hier komt data binnen van report
        reportData: {
            type: Object as () => Ireport,
            default: null
        },
        // Hier komt de id binnen van report om te deleten
        deleteOneReport: {
            type: String,
            default: null
        },
        deleteManyReports: {
            type: Array as () => string[],
            default: () => []
        },
        ReportsData: {
            type: Array as () => Ireport[],
            default: () => []
        },
    },

    setup(props, { emit }) {
        // console.log('Dit is in de modalwindow')
        // console.log(props.ReportsData)

        // const localTaskData = ref<Itask>(props.taskData)
        const localReportData = ref<Ireport | null>()
        const reportId = ref<string | null>()
        const reportIds = ref<string[]>()
        const reports = ref<Ireport[]>(props.ReportsData);

        const { mutate: deleteReport } = useMutation(DELETE_REPORT)
        const { mutate: deleteAllReports } = useMutation(DELETE_ALL_REPORTS)
        

        watch(() => props.deleteOneReport, (newValue) => {
            reportId.value = newValue;
            console.log('Dit is de reportId', reportId.value)
        });
        watch(() => props.deleteManyReports, (newValue) => {
            reportIds.value = newValue;
            console.log('Dit zijn de reportIds', reportIds.value)
        });
        watch(() => props.reportData, (newValue) => {
            localReportData.value = newValue;
        });

        // Format date
        const formatDate = (isoDateString: string) => {
            if (isoDateString) {
                const date = new Date(isoDateString);
                const formattedDate = date.toISOString().split('T')[0];
                return formattedDate;
            }
        };

        // Delete
        const deleteItem = (itemId: string) => {
            if (reports.value.length > 0) {
                // Delete from database
                deleteReport({
                    id: itemId.valueOf()
                }).then((result) => {
                    if (!result?.data) {
                        throw new Error('Failed to delete report')
                    }
                    // console.log('report deleted', result.data)
                    emit('close-modal')
                    emit('item-deleted', itemId);
                }).catch((error) => {
                    console.log(error)
                })
            }
            // else if (jobs.value.length > 0) {
            //     jobs.value = jobs.value.filter(job => job.id !== reportId);
            // } else if (sollis.value.length > 0) {
            //     sollis.value = sollis.value.filter(solli => solli.id !== reportId);
            // }
        };

        // Delete all
        const deleteAll = (ids: string[]) => {
            console.log('ids', ids)
            if (reports.value.length > 0) {
                console.log('reports after delete:', ids)
                // Delete from database
                deleteAllReports({
                    ids: reportIds.value
                }).then((result) => {
                    if (!result?.data) {
                        throw new Error('Failed to delete report')
                    }
                    // console.log('report deleted', result.data)
                    emit('close-modal')
                    emit('items-deleted', ids);
                }).catch((error) => {
                    console.log(error)
                })
            }
            // else if (jobs.value.length > 0) {
            //     jobs.value = jobs.value.filter(jobs => jobs.status !== true);
            // } else if (sollis.value.length > 0) {
            //     sollis.value = sollis.value.filter(solli => solli.status !== true);
            // }
        };


        // watch(() => props.taskData, (newValue) => {
        //     localTaskData.value = newValue;
        // });

        const CloseModal = () => {
            emit('close-modal')
            // Zet de waarden op null            
        }

        return {
            CloseModal,
            // localTaskData,
            localReportData,
            formatDate,
            deleteItem,
            deleteAll,
            reportIds,
            reportId
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