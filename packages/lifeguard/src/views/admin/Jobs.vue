<template>
    <!-- {{ firebaseUser }} -->
    <Container v-if="accesUser.userByUid.accessPlatform">
        <div class="flex gap-6">
            <ul class="shadow-cardShadow rounded-cardRadius p-10 h-fit">
                <li @click="showJobs"
                    class="font-lato rounded-inputFieldRadius cursor-pointer  hover:translate-x-2 py-2 px-4 mb-4 transition-all duration-75 ease-in"
                    :class="{ 'bg-greenx text-white': currentMenuItem === 'jobs' }">
                    Werknemers
                </li>
                <li @click="showSollis"
                    class="font-lato rounded-inputFieldRadius cursor-pointer hover:translate-x-2 py-2 px-4 transition-all duration-75 ease-in"
                    :class="{ 'bg-greenx text-white': currentMenuItem === 'solli' }">
                    sollicitaties
                </li>
            </ul>


            <!-- <div>DIT ZIJN DE JOBS {{ jobs }}</div>
            <div>-----------------------------------------------</div>
            <div>DIT ZIJN DE SOLLIS {{ solli }}</div> -->

            <CostumTable @show-modal="showModal" v-if="currentMenuItem === 'jobs'" :jobsData="jobs" class="flex-1" />
            <CostumTable @show-modal="showModal" v-if="currentMenuItem === 'solli'" :sollisData="solli" class="flex-1" />

        </div>

        <div>
            <ModalWindow @close-modal="closeModal" :isVisible="isModalVisible" :deleteOneUser="(modalDelete as string)"
                :deleteManyUsers="(modalDeleteMany as string[])" :updateOneUser="(modalUpdate as string)" />
        </div>


    </Container>
</template>

<script lang="ts">
import { ref } from 'vue';
import CostumTable from '@/components/generic/CustomTable.vue'
import Container from '@/components/generic/Container.vue';
import useFirebase from '@/composables/useFirebase';
import { GET_USER_BY_UID, GET_USERS } from '@/graphql/user.query'
import router from '@/router'
import { useQuery } from '@vue/apollo-composable';
import { watch, onBeforeUnmount } from 'vue';
import type { Iuser } from '@/interfaces/user.interface';
import ModalWindow from '@/components/generic/ModalWindow.vue';
import UseRealtime from "@/composables/useRealtime"


export default {

    components: {
        CostumTable,
        Container,
        ModalWindow
    },


    setup() {

        const { firebaseUser } = useFirebase();
        const { result: user, error: userError } = useQuery(GET_USER_BY_UID, {
            uid: firebaseUser.value?.uid,
        });

        // GET ALL USERS
        const { result: users, error: usersError } = useQuery(GET_USERS)
        const solli = ref<Iuser[]>([])
        const jobs = ref<Iuser[]>([])
        const currentMenuItem = ref('jobs');


        const { on } = UseRealtime()

        on('users', (users) => {
            console.log('users', users);
            solli.value = users.filter((user: Iuser) => user.accessPlatform === false);
            jobs.value = users.filter((user: Iuser) => user.accessPlatform === true);
        })

        // voer een watch uit op de users
        // watch(users, () => {
        //     const value = users.value?.users;
        //     solli.value = value.filter((user: Iuser) => user.accessPlatform === false);
        //     jobs.value = value.filter((user: Iuser) => user.accessPlatform === true);

        //     console.log('solli', users);
        // })

        if (users) {
            const value = users.value?.users;
            value?.forEach((user: Iuser) => {
                if (user.accessPlatform === false) {
                    solli.value = value.filter((user: Iuser) => user.accessPlatform === false);
                } else {
                    jobs.value = value.filter((user: Iuser) => user.accessPlatform === true);
                }
            });
        }

        const acces = (() => {
            if (user.value?.userByUid.accessPlatform === false) {
                // Ga terug naar de homepagina
                router.push({ path: '/' });
            }
        })();

        const showJobs = () => {
            currentMenuItem.value = 'jobs';
        }
        const showSollis = () => {
            currentMenuItem.value = 'solli';
        }

        // variabelen die ik kan meegeven aan de modalwindow
        const modalDelete = ref<string | null>()
        const modalDeleteMany = ref<string[] | null>()
        const modalUpdate = ref<string | null>()
        // Het modal venster is standaard niet zichtbaar
        const isModalVisible = ref(false)



        const showModal = (options: { id?: string, ids?: string[], uidToUpdate?: string }) => {
            // Controleer of er een report of id beschikbaar is
            if (options.id) {
                isModalVisible.value = true
                modalDelete.value = options.id;
                console.log('modalDelete', modalDelete.value);
            } else if (options.ids) {
                isModalVisible.value = true
                modalDeleteMany.value = options.ids;
                console.log('modalDeleteMany', modalDeleteMany.value);
            } else if (options.uidToUpdate) {
                console.log('uidToUpdate', options.uidToUpdate);
                isModalVisible.value = true
                modalUpdate.value = options.uidToUpdate;
            }
            else {
                console.log('Geen report of id beschikbaar');
            }
        }


        const closeModal = () => {
            isModalVisible.value = false
            modalDelete.value = null
            modalDeleteMany.value = null
        }


        return {
            solli,
            jobs,
            showJobs,
            showSollis,
            currentMenuItem,
            firebaseUser,
            accesUser: user,
            showModal,
            closeModal,
            isModalVisible,
            modalDelete,
            modalDeleteMany,
            modalUpdate
        }
    }
}
</script>