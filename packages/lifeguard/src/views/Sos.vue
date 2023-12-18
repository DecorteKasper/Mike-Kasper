<template>
    <Container v-if="accessUser.userByUid.accessPlatform" class="font-lato">
        <div class="flex flex-col mt-4 md:flex-row md:justify-evenly">



            <div v-if="userRole == 200 || userRole == 100">
                <div class="bg-white rounded-cardRadius shadow-cardShadow px-10 py-5 md:min-w-[40rem] md:min-h-[15rem]">
                    <h2 class="font-bold text-center text-black text-lg">Todo hoofdredder</h2>

                    <div class="mt-5 mb-13">
                        <Form @submit.prevent="SendTodo" class="flex flex-col gap-4">
                            <div class="flex flex-col gap-2">
                                <label for="post">Nummer post:</label>
                                <input class="bg-dark_grey px-2 py-1 rounded-md w-20" type="number" name="post" id="post" placeholder="0" v-model="todoMessage.post">
                            </div>
                            <div class="flex flex-col gap-2 mt-3">
                                <label for="todoMessage">Wat is je todo voor de hoofdredder?</label>
                                <textarea class="bg-dark_grey px-2 py-1" rows="5" name="todoMessage" id="todoMessage" v-model="todoMessage.description" placeholder="Vul hier je todo in..."></textarea>
                            </div>

                            <button class="bg-greenx rounded-full text-white font-bold py-2 cursor-pointer hover:bg-dark_green transition-all">Verstuur todo</button>
                        </Form>
                    </div>
                </div>
            </div>


            <div class="bg-white rounded-cardRadius shadow-cardShadow px-3 py-5 mt-0 md:min-w-[40rem]">
                <h2 class="font-bold text-center text-black text-lg">Belangrijke telefoonnummers</h2>

                <div class="mt-8">
                    <div class="flex flex-row items-center px-4 py-2 gap-6 bg-greenx text-white font-semibold rounded-lg mt-4 cursor-pointer hover:bg-dark_green transition-all m-auto md:max-w-[30rem]"
                        @click="makePhoneCall(phoneNumberHoofdpost)">
                        <img class="w-7" :src="iconHoofdpost" alt="Icon Hoofdpost">
                        <a :href="'tel:' + phoneNumberHoofdpost">Hoofdpost</a>
                    </div>

                    <div class="flex flex-row items-center px-4 py-2 gap-6 bg-greenx text-white font-semibold rounded-lg mt-4 cursor-pointer hover:bg-dark_green transition-all m-auto md:max-w-[30rem]"
                        @click="makePhoneCall(phoneNumber112)">
                        <img class="w-7" :src="iconFireFighter" alt="Icon brandweer">
                        <a :href="'tel:' + phoneNumber112">Brandweer/Ambulance</a>
                    </div>

                    <div class="flex flex-row items-center px-4 py-2 gap-6 bg-greenx text-white font-semibold rounded-lg mt-4 cursor-pointer hover:bg-dark_green transition-all m-auto md:max-w-[30rem]"
                        @click="makePhoneCall(phoneNumberPolice)">
                        <img class="w-7" :src="iconPolice" alt="Icon politie">
                        <a :href="'tel:' + phoneNumberPolice">Politie</a>
                    </div>

                    <div class="flex flex-row items-center px-4 py-2 gap-6 bg-greenx text-white font-semibold rounded-lg mt-4 cursor-pointer hover:bg-dark_green transition-all m-auto md:max-w-[30rem]"
                        @click="makePhoneCall(phoneNumberVogels)">
                        <img class="w-7" :src="iconVogels" alt="Icon Zeemeeuw">
                        <a :href="'tel:' + phoneNumberVogels">Vogelbescherming</a>
                    </div>
                </div>
            </div>
        </div>


            <v-dialog v-model="isConfirmationDialogOpen" persistent>
                <v-card class="min-h-[10rem] max-w-[20rem] m-auto min-w-full">
                    <p class="text-center font-medium text-lg mt-6">Todo is verzonden!</p>
                    <v-card-actions>
                        <button class="text-white font-bold bg-greenx px-10 py-2 rounded-lg m-auto mt-12" @click="toggleConfirmationDialog">Sluiten</button>
                    </v-card-actions>
                </v-card>
            </v-dialog>


    </Container>
</template>

<script lang="ts">
import { ADD_TODO } from '@/graphql/todo.mutation'
import { useMutation, useQuery } from '@vue/apollo-composable'
import Container from '@/components/generic/Container.vue'
import { ref, watch } from 'vue'
import iconFireFighter from '@/assets/icons/firefighter.svg'
import iconPolice from '@/assets/icons/police.svg'
import iconVogels from '@/assets/icons/seagull.svg'
import iconHoofdpost from '@/assets/icons/hoofdpost.svg'
import { GET_USER_BY_UID } from '@/graphql/user.query';
import { useQuery } from '@vue/apollo-composable';
import useFirebase from '@/composables/useFirebase'

import useFirebase from '@/composables/useFirebase'
import { GET_USER_BY_UID } from '@/graphql/user.query'
import router from '@/router'



export default {
    components: {
        Container,
    },

    setup() {
        const phoneNumber112 = ref('+1234567890');
        const phoneNumberPolice = ref('+1234567890');
        const phoneNumberHoofdpost = ref('+1234567890');
        const phoneNumberVogels = ref('+1234567890');

        const userRole = ref();
        const { firebaseUser } = useFirebase();
        const isConfirmationDialogOpen = ref(false);
        const { loading: userLoading, result: user, error: userError } = useQuery(GET_USER_BY_UID, { uid: firebaseUser.value?.uid, });


        const toggleConfirmationDialog = () => {
            isConfirmationDialogOpen.value = !isConfirmationDialogOpen.value;
        };


        const { mutate: addTodo } = useMutation(ADD_TODO)
        const todoMessage = ref(
            {
                post: 0,
                description: "",
            }
        )



        watch(user, (newValue) => {
            if (newValue && newValue.userByUid) {
            }
        });
        if (user) {
            userRole.value = user.value?.userByUid.role
        }


        const SendTodo = () => {
            const todo = {
                post: todoMessage.value.post,
                description: todoMessage.value.description,
                status: false,
                createdAt: new Date().toISOString(),
            }

            if(todo.post === 0 || todo.description === "") {
                alert('Vul alle velden in!')
                return
            } else {
                addTodo({
                    createTodoInput: todo,
                }).then((result) => {
                    if (!result?.data) {
                        throw new Error('Failed to add todo')
                    }
                }).catch((error) => {
                    console.log(error)
                })
                toggleConfirmationDialog();
            }
        }


        const makePhoneCall = (phoneNumber: string) => {
            window.location.href = 'tel:' + phoneNumber;
        };

        const acces = (() => {
            if (user.value?.userByUid.accessPlatform === false) {
                // Ga terug naar de homepagina
                router.push({ path: '/' });
            }
        })();

        return {
            SendTodo,
            todoMessage,
            iconFireFighter,
            iconPolice,
            iconVogels,
            iconHoofdpost,
            makePhoneCall,
            phoneNumber112,
            phoneNumberPolice,
            phoneNumberHoofdpost,
            phoneNumberVogels,

            accessUser: user

            userRole,
            isConfirmationDialogOpen,
            toggleConfirmationDialog,

        }
    }
}
</script>