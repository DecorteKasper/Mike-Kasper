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
            <div class="flex flex-col">
                <div>
                    <h1 v-if="reportId" class="mb-8 font-lato font-medium text-lg text-black">Ben je zeker dat je dit
                        verslag wilt
                        verwijderen?
                    </h1>
                    <h1 v-if="reportIds" class="mb-8 font-lato font-medium text-lg text-black">Ben je zeker dat je deze
                        verslagen wilt
                        verwijderen?</h1>

                    <h1 v-if="userId" class="mb-8 font-lato font-medium text-lg text-black">Ben je zeker dat je deze user
                        wil verwijdereren?
                    </h1>
                    <h1 v-if="userIds" class="mb-8 font-lato font-medium text-lg text-black">Ben je zeker dat je deze users
                        wil verwijdereren?
                    </h1>
                    <h1 v-if="userUpdateId" class="mb-8 font-lato font-medium text-lg text-black">Wil je deze user
                        accepteren?
                    </h1>

                </div>

                <div class="flex gap-4 justify-center">
                    <!-- Reports -->
                    <PrimaryButton v-if="reportId" label="Verwijderen" @click="deleteItem(deleteOneReport)" />
                    <PrimaryButton v-if="reportIds" label="Verwijderen" @click="deleteAll(deleteManyReports)" />
                    <!-- Users -->
                    <PrimaryButton v-if="userId" label="Verwijderen" @click="HandleDeleteOneUser(userId)" />
                    <PrimaryButton v-if="userIds" label="Verwijderen" @click="HandleDeleteManyUser(userIds)" />
                    <PrimaryButton v-if="userUpdateId" label="Accepteren" @click="HandleUpdateUser(userUpdateId)" />

                    <!-- Dit zal de secundary button zijn -->
                    <SecondaryButton label="Annuleren" @click="CloseModal" />
                </div>
            </div>


            <!-- Delete user -->




        </div>
    </Transition>
</template>


<script lang="ts">
import { X } from 'lucide-vue-next';
import { ref, watch, defineProps } from 'vue';
import type { Itask } from '@/interfaces/task.interface'
import type { Ireport } from '@/interfaces/report.interface';
import { useMutation, useQuery } from '@vue/apollo-composable';
import { ALL_RECORDS } from '@/graphql/report.query';
import { DELETE_REPORT, DELETE_ALL_REPORTS } from '@/graphql/report.mutation'
import { DELETE_USER, DELETE_ALL_USERS, UPDATE_USER } from '@/graphql/user.mutation'
import PrimaryButton from '@/components/generic/PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';


export default {

    components: { X, PrimaryButton, SecondaryButton },
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
        ReportsData: {
            type: Array as () => Ireport[],
            default: () => []
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
        // Users deletes
        deleteOneUser: {
            type: String,
            default: null
        },
        deleteManyUsers: {
            type: Array as () => string[],
            default: () => []
        },
        // user update
        updateOneUser: {
            type: String,
            default: null
        },
        // Delete months en posten
        deleteManyPosten: {
            type: Array as () => string[],
            default: () => []
        },
        deleteManyMonths: {
            type: Array as () => string[],
            default: () => []
        },


    },

    setup(props, { emit }) {

        const deleteManyMonths = ref([]);
        const deleteManyPosten = ref([]);

        console.log('Dit is de modal window', deleteManyMonths)

        // const localTaskData = ref<Itask>(props.taskData)
        const localReportData = ref<Ireport | null>()
        const reportId = ref<string | null>()
        const userId = ref<string | null>()
        const userUpdateId = ref<string | null>()
        const userIds = ref<string[]>()
        const reportIds = ref<string[]>()
        const reports = ref<Ireport[]>(props.ReportsData);

        const { mutate: deleteReport } = useMutation(DELETE_REPORT)
        const { mutate: deleteUser } = useMutation(DELETE_USER)
        const { mutate: deleteAllReports } = useMutation(DELETE_ALL_REPORTS)
        const { mutate: deleteAllUsers } = useMutation(DELETE_ALL_USERS)
        const { mutate: updateUser } = useMutation(UPDATE_USER)


        watch(([props.deleteManyMonths, props.deleteManyPosten]), ([monthsIds, postenIds]) => {
            console.log('deleteManyMonths', props.deleteManyMonths)
            console.log('deleteManyPosten', props.deleteManyPosten)
        })



        watch(() => props.updateOneUser, (newValue) => {
            userUpdateId.value = newValue;
        })
        // Users deletes
        watch(() => props.deleteOneUser, (newValue) => {
            userId.value = newValue;
        });
        watch(() => props.deleteManyUsers, (newValue) => {
            userIds.value = newValue;
        });
        // Reports deletes
        watch(() => props.deleteOneReport, (newValue) => {
            reportId.value = newValue;
        });
        watch(() => props.deleteManyReports, (newValue) => {
            reportIds.value = newValue;
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
        };
        const HandleDeleteOneUser = (id: string) => {
            console.log('userId', id)
            if (id) {
                // Delete from database
                deleteUser({
                    uid: id.valueOf()
                }).then((result) => {
                    if (!result?.data) {
                        throw new Error('Failed to delete report')
                    }
                    console.log('user deleted', result.data)
                    emit('close-modal')
                    emit('item-deleted', id);
                }).catch((error) => {
                    console.log(error)
                })
            }
        }

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
        };
        const HandleDeleteManyUser = (ids: string[]) => {

            if (ids) {
                // Delete from database
                deleteAllUsers({
                    uids: ids
                }).then((result) => {
                    if (!result?.data) {
                        throw new Error('Failed to delete report')
                    }
                    console.log('report deleted', result.data)
                    emit('close-modal')
                    emit('items-deleted', ids);
                }).catch((error) => {
                    console.log(error)
                })
            }
        }

        // Update user
        const HandleUpdateUser = (uid: string) => {
            console.log('Dit is de uid in de HandleUpdateUser', uid)
            const userUpdate = {
                uid: uid,
                accessPlatform: true
            }
            if (uid) {
                updateUser({
                    updateUserInput: userUpdate
                }).then((result) => {
                    if (!result?.data) {
                        throw new Error('Failed to delete report')
                    }
                    console.log('user updated', result.data)
                    emit('close-modal')
                    emit('item-updated', uid);
                }).catch((error) => {
                    console.log(error)
                })
            }
        }

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
            HandleDeleteOneUser,
            HandleDeleteManyUser,
            HandleUpdateUser,
            reportIds,
            reportId,
            userId,
            userIds,
            userUpdateId,
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