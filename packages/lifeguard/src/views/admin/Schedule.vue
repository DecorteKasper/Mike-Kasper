<template>
    <Container v-if="accesUser.userByUid.accessPlatform">
        <!-- Dit is de frontend om de planning te maken -->
        <div v-if="OfficialSchedule.length <= 0">
            <div class="flex gap-12 mb-10">

                <!-- Left side -->
                <div class="w-1/2 shadow-cardShadow rounded-cardRadius p-14 h-116 my-custom-scrollbar overflow-auto">
                    <!-- Header schedule -->
                    <div class="flex flex-wrap justify-between">
                        <h2 class="font-lato font-semibold text-lg"> {{ selectedMonth }}</h2>
                        <div>
                            <label class="radio-role">
                                <input type="radio" :value=200 name="role" class="hidden" v-model="Role">
                                <span
                                    :class="{ 'bg-red text-xs font-regular text-white px-4 py-2 rounded-l-buttonRadius focus:outline-none cursor-pointer': Role === 200, 'bg-dark_grey text-xs font-medium text-black px-4 py-2 rounded-l-buttonRadius focus:outline-none cursor-pointer': Role !== 200 }">Redder</span>
                            </label>

                            <label class="radio-role">
                                <input type="radio" :value=1 name="role" class="hidden" v-model="Role">
                                <span
                                    :class="{ 'bg-red text-xs font-regular text-white px-4 py-2 focus:outline-none cursor-pointer': Role === 1, 'bg-dark_grey text-xs font-medium text-black px-4 py-2 focus:outline-none cursor-pointer': Role !== 1 }">All</span>
                            </label>

                            <label class="radio-role">
                                <input type="radio" :value=100 name="role" class="hidden" v-model="Role">
                                <span
                                    :class="{ 'bg-dark_green text-xs font-regular text-white px-4 py-2 rounded-r-buttonRadius focus:outline-none cursor-pointer': Role === 100, 'bg-dark_grey text-xs font-medium text-black px-4 py-2 rounded-r-buttonRadius focus:outline-none cursor-pointer': Role !== 100 }">Ehbo</span>
                            </label>

                        </div>
                    </div>
                    <div class="mt-12 flex flex-wrap gap-4">
                        <!-- Posten -->
                        <!-- Radio buttons posten -->
                        <label class="radio-post">
                            <input type="radio" :value=1 name="post" class="hidden" v-model="Post">
                            <span
                                :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 1, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 1, }">Post
                                1</span>
                        </label>

                        <label class="radio-post">
                            <input type="radio" :value=2 name="post" class="hidden" v-model="Post">
                            <span
                                :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 2, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 2, }">Post
                                2</span>
                        </label>
                        <label class="radio-post">
                            <input type="radio" :value=3 name="post" class="hidden" v-model="Post">
                            <span
                                :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 3, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 3, }">Post
                                3</span>
                        </label>
                        <label class="radio-post">
                            <input type="radio" :value=4 name="post" class="hidden" v-model="Post">
                            <span
                                :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 4, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 4, }">Post
                                4</span>
                        </label>
                        <label class="radio-post">
                            <input type="radio" :value=5 name="post" class="hidden" v-model="Post">
                            <span
                                :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 5, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 5, }">Post
                                5</span>
                        </label>
                        <label class="radio-post">
                            <input type="radio" :value=6 name="post" class="hidden" v-model="Post">
                            <span
                                :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 6, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 6, }">Post
                                6</span>
                        </label>
                    </div>
                    <div class="mt-8">
                        <!-- Redders -->
                        <div v-if="Role === 200 || Role === 1">
                            <div class="border-b-red border-b-2 mb-4">
                                <h3 class="font-lato text-base text-red">Redders</h3>
                            </div>
                            <div class="flex flex-wrap gap-4">
                                <!-- Redder card  -->
                                <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit cursor-pointer"
                                    v-for="(user) in shifts.filter(user => user.role === 200 && user.post === Post && user.months.some(month => selectedMonth.includes(month)))"
                                    :key="user.uid" @click="moveCard(user, 'left', selectedMonth, Post)">
                                    <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''"
                                        alt="">
                                    <div v-else>
                                        <UserCircle2 class="h-7 w-7 object-cover text-red" />
                                    </div>
                                    <p class="font-lato text-xs"> {{ user.name }} {{ user.surname }}</p>
                                    <LifeBuoyIcon class="text-red" :size="20" />
                                </div>
                            </div>
                        </div>
                        <!-- Ehbo -->
                        <div v-if="Role === 100 || Role === 1">
                            <div class="border-b-dark_green border-b-2 my-4">
                                <h3 class="font-lato text-base text-dark_green">Ehbo</h3>
                            </div>

                            <div class="flex flex-wrap gap-4">
                                <!-- ehbo card  -->
                                <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit cursor-pointer"
                                    v-for=" user in shifts.filter(user => user.role === 100 && user.post === Post && user.months.some(month => selectedMonth.includes(month)))"
                                    :key="user.uid" @click="moveCard(user, 'left', selectedMonth, Post)">
                                    <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''"
                                        alt="">
                                    <div v-else>
                                        <UserCircle2 class="h-7 w-7 object-cover text-dark_green" />
                                    </div>
                                    <p class="font-lato text-xs"> {{ user.name }} {{ user.surname }}</p>
                                    <Cross class="text-dark_green" :size="20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- Right side -->
                <div class="w-1/2 shadow-cardShadow rounded-cardRadius p-14 h-116 my-custom-scrollbar overflow-auto">
                    <!-- Header schedule -->
                    <div class="flex flex-wrap justify-between">
                        <div class="relative">
                            <select class="bg-gray px-4 py-2 w-36 rounded-inputFieldRadius font-lato cursor-pointer"
                                name="month" id="month" v-model="selectedMonth">
                                <option class="bg-gray" value="juni">Juni</option>
                                <option class="bg-gray " value="juli">Juli</option>
                                <option class="bg-gray " value="augustus">Augustus</option>
                            </select>
                            <ChevronDown class="absolute right-2 top-2 text-dark_green" :size="20" />
                        </div>

                    </div>
                    <div class="mt-8">
                        <!-- Redders -->
                        <div v-if="Role === 200 || Role === 1">
                            <div class="border-b-red border-b-2 mb-4">
                                <h3 class="font-lato text-base text-red">Redders</h3>
                            </div>
                            <div class="flex flex-wrap gap-4">
                                <!-- Redder card  -->
                                <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit cursor-pointer"
                                    v-for="(user) in availability.filter(user => user.role === 200 && user.months.some(month => selectedMonth.includes(month)))"
                                    :key="user.uid" @click="moveCard(user, 'right', selectedMonth, Post)">
                                    <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''"
                                        alt="">
                                    <div v-else>
                                        <UserCircle2 class="h-7 w-7 object-cover text-red" />
                                    </div>
                                    <p class="font-lato text-xs"> {{ user.name }} {{ user.surname }}</p>
                                    <LifeBuoyIcon class="text-red" :size="20" />
                                </div>
                            </div>
                        </div>
                        <!-- Ehbo -->
                        <div v-if="Role === 100 || Role === 1">
                            <div class="border-b-dark_green border-b-2 my-4">
                                <h3 class="font-lato text-base text-dark_green">Ehbo</h3>
                            </div>

                            <div class="flex flex-wrap gap-4">
                                <!-- ehbo card  -->
                                <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit cursor-pointer"
                                    v-for=" user in availability.filter(user => user.role === 100 && user.months.some(month => selectedMonth.includes(month)))"
                                    :key="user.uid" @click="moveCard(user, 'right', selectedMonth, Post)">
                                    <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''"
                                        alt="">
                                    <div v-else>
                                        <UserCircle2 class="h-7 w-7 object-cover text-dark_green" />
                                    </div>
                                    <p class="font-lato text-xs"> {{ user.name }} {{ user.surname }}</p>
                                    <Cross class="text-dark_green" :size="20" />
                                </div>


                            </div>
                        </div>
                    </div>
                </div>



            </div>
            <!-- Button -->
            <PrimaryButton label="Opslaan" @click="handleShifts" />
        </div>

        <!-- Als de planning is gemaakt komt deze block tevoorschijn -->
        <div v-if="OfficialSchedule.length > 0">
            <div class="flex flex-col items-center h-116">
                <div class="w-4/6 shadow-cardShadow rounded-cardRadius p-14 h-116 mb-8  my-custom-scrollbar overflow-auto">

                    <!-- Header schedule -->
                    <div class="flex flex-wrap justify-between">
                        <h2 class="font-lato font-semibold text-lg">{{ selectedMonth }}</h2>
                        <!-- FILTER OP ROL -->
                        <div>
                            <label class="radio-role">
                                <input type="radio" :value=200 name="role" class="hidden" v-model="Role">
                                <span
                                    :class="{ 'bg-red text-xs font-regular text-white px-4 py-2 rounded-l-buttonRadius focus:outline-none cursor-pointer': Role === 200, 'bg-dark_grey text-xs font-medium text-black px-4 py-2 rounded-l-buttonRadius focus:outline-none cursor-pointer': Role !== 200 }">Redder</span>
                            </label>
                            <label class="radio-role">
                                <input type="radio" :value=1 name="role" class="hidden" v-model="Role">
                                <span
                                    :class="{ 'bg-red text-xs font-regular text-white px-4 py-2 focus:outline-none cursor-pointer': Role === 1, 'bg-dark_grey text-xs font-medium text-black px-4 py-2 focus:outline-none cursor-pointer': Role !== 1 }">All</span>
                            </label>
                            <label class="radio-role">
                                <input type="radio" :value=100 name="role" class="hidden" v-model="Role">
                                <span
                                    :class="{ 'bg-dark_green text-xs font-regular text-white px-4 py-2 rounded-r-buttonRadius focus:outline-none cursor-pointer': Role === 100, 'bg-dark_grey text-xs font-medium text-black px-4 py-2 rounded-r-buttonRadius focus:outline-none cursor-pointer': Role !== 100 }">Ehbo</span>
                            </label>
                        </div>
                    </div>
                    <!-- OM TE FILTEREN OP POSTEN -->
                    <div class="mt-12 flex flex-wrap justify-between items-center">
                        <!-- Radio buttons posten -->
                        <div class="flex flex-wrap gap-4">
                            <label class="radio-post">
                                <input type="radio" :value=1 name="post" class="hidden" v-model="Post">
                                <span
                                    :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 1, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 1, }">Post
                                    1</span>
                            </label>
                            <label class="radio-post">
                                <input type="radio" :value=2 name="post" class="hidden" v-model="Post">
                                <span
                                    :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 2, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 2, }">Post
                                    2</span>
                            </label>
                            <label class="radio-post">
                                <input type="radio" :value=3 name="post" class="hidden" v-model="Post">
                                <span
                                    :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 3, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 3, }">Post
                                    3</span>
                            </label>
                            <label class="radio-post">
                                <input type="radio" :value=4 name="post" class="hidden" v-model="Post">
                                <span
                                    :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 4, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 4, }">Post
                                    4</span>
                            </label>
                            <label class="radio-post">
                                <input type="radio" :value=5 name="post" class="hidden" v-model="Post">
                                <span
                                    :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 5, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 5, }">Post
                                    5</span>
                            </label>
                            <label class="radio-post">
                                <input type="radio" :value=6 name="post" class="hidden" v-model="Post">
                                <span
                                    :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === 6, 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== 6, }">Post
                                    6</span>
                            </label>
                        </div>
                        <!-- FILTEREN OP MAAND -->
                        <div class="flex flex-wrap justify-between">
                            <div class="relative">
                                <select class="bg-gray px-4 py-2 w-36 rounded-inputFieldRadius font-lato cursor-pointer"
                                    name="month" id="month" v-model="selectedMonth">
                                    <option class="bg-gray" value="juni">Juni</option>
                                    <option class="bg-gray " value="juli">Juli</option>
                                    <option class="bg-gray " value="augustus">Augustus</option>
                                </select>
                                <ChevronDown class="absolute right-2 top-2 text-dark_green" :size="20" />
                            </div>

                        </div>
                    </div>



                    <!-- CARDS VOOR REDDERS EN EHBO -->
                    <div class="mt-8">
                        <!--REDDERS CARD -->
                        <div v-if="Role === 200 || Role === 1">
                            <div class="border-b-red border-b-2 mb-4">
                                <h3 class="font-lato text-base text-red">Redders</h3>
                            </div>
                            <div class="flex flex-wrap gap-4">
                                <!-- Redder card  -->
                                <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit"
                                    v-for="(user) in OfficialSchedule.filter(user => user.role === 200 && user.post === Post && user.months.some(month => selectedMonth.includes(month)))"
                                    :key="user.uid">
                                    <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''"
                                        alt="">
                                    <div v-else>
                                        <UserCircle2 class="h-7 w-7 object-cover text-red" />
                                    </div>
                                    <p class="font-lato text-xs"> {{ user.name }} {{ user.surname }}</p>
                                    <LifeBuoyIcon class="text-red" :size="20" />
                                </div>
                            </div>
                        </div>
                        <!-- EHBO CARD -->
                        <div v-if="Role === 100 || Role === 1">
                            <div class="border-b-dark_green border-b-2 my-4">
                                <h3 class="font-lato text-base text-dark_green">Ehbo</h3>
                            </div>

                            <div class="flex flex-wrap gap-4">
                                <!-- ehbo card  -->
                                <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit cursor-pointer"
                                    v-for=" user in OfficialSchedule.filter(user => user.role === 100 && user.post === Post && user.months.some(month => selectedMonth.includes(month)))"
                                    :key="user.uid">
                                    <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''"
                                        alt="">
                                    <div v-else>
                                        <UserCircle2 class="h-7 w-7 object-cover text-dark_green" />
                                    </div>
                                    <p class="font-lato text-xs"> {{ user.name }} {{ user.surname }}</p>
                                    <Cross class="text-dark_green" :size="20" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex gap-6">
                    <PrimaryButton v-if="confirmation === true" label="Bevestigen" @click="handleDelete" />
                    <SecondaryButton v-if="confirmation === true" label="Annuleren" @click="cancelDelete" />
                    <SecondaryButton v-if="confirmation === false" label="Verwijder planning" @click="confirmDelete()" />
                </div>
            </div>
        </div>

    </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue';
import Schedule from '@/components/generic/Schedule.vue';

import margotRobbie from "../../img/MargotRobbie.jpg"
import { LifeBuoyIcon, UserCircle2, Cross, ChevronDown } from 'lucide-vue-next'
import { ref, watch } from 'vue';
import { User } from 'lucide-vue-next';
import { useMutation, useQuery } from '@vue/apollo-composable'
import useFirebase from '@/composables/useFirebase'
import { GET_USER_BY_UID, GET_USERS } from '@/graphql/user.query'
import { ALL_MONTHS } from '@/graphql/month.query'
import { ADD_POST, DELETE_ALL_POSTEN } from '@/graphql/post.mutation'
import { DELETE_ALL_MONTHS } from '@/graphql/month.mutation'
import { ALL_POSTEN } from '@/graphql/post.query'
import router from '@/router'
import type { Iuser } from '@/interfaces/user.interface';
import PrimaryButton from '@/components/generic/PrimaryButton.vue';
import SecondaryButton from '@/components/generic/SecondaryButton.vue';
import type { Ipost } from '@/interfaces/post.interface';
import ModalWindow from '@/components/generic/ModalWindow.vue';
import type { Imonth } from '@/interfaces/month.interface';



export default {

    components: {
        Container,
        Schedule,
        LifeBuoyIcon,
        UserCircle2,
        Cross,
        ChevronDown,
        PrimaryButton,
        SecondaryButton,
        ModalWindow
    },

    setup() {

        // Firebase
        const { firebaseUser } = useFirebase()
        const { result: user, error: userError } = useQuery(GET_USER_BY_UID, {
            uid: firebaseUser.value?.uid,
        })

        // Algemeen
        const Post = ref<number>(1);
        const selectedMonth = ref('juni');
        const Role = ref<number>(1);
        const confirmation = ref(false);

        // Query's
        const { result: months, error: monthsError } = useQuery(ALL_MONTHS)
        const { result: users, error: usersError } = useQuery(GET_USERS)
        const { result: posten, error: postenError } = useQuery(ALL_POSTEN)

        // Mutations
        const { mutate: deleteAllMonths } = useMutation(DELETE_ALL_MONTHS)
        const { mutate: deleteAllPosten } = useMutation(DELETE_ALL_POSTEN)
        const { mutate: addPost } = useMutation(ADD_POST)

        // Constanten voor het maken van de planning
        const availability = ref<Iavalability[]>([])
        const shifts = ref<Iavalability[]>([]);

        // Constanten voor de officieële planning
        // const usersList = ref<Iuser[]>([]);
        const monthList = ref<Imonth[]>([]);
        const postenList = ref<Ipost[]>([]);
        const OfficialSchedule = ref<Iavalability[]>([]);

        // Watch 
        watch([users, months, posten], ([usersValue, monthsValue, postenValue]) => {
            if (usersValue && monthsValue && postenValue) {
                const { users: ArrayUsers } = usersValue;
                const { months: ArrayMonths } = monthsValue;
                const { posten: ArrayPosten } = postenValue;

                // Functie voor planning te maken
                if (postenList) {
                    CheckAvailability(ArrayUsers, ArrayMonths); // Call the function here
                    processDataOfficialplanning(ArrayUsers, ArrayMonths, ArrayPosten);
                }

            }
        })

        // Functie wordt uitgevoerd als de gebruiker niet de juiste rechten heeft
        const acces = (() => {
            if (user.value?.userByUid.accessPlatform === false) {
                // Ga terug naar de homepagina
                router.push({ path: '/' });
            }
        })()

        // Functies om de planning te maken
        const CheckAvailability = (ArrayUsers: Iuser[], ArrayMonths: Imonth[]) => {
            // console.log(ArrayUsers);
            // console.log(ArrayMonths);
            if (ArrayUsers.length > 0 && ArrayMonths.length > 0) {
                ArrayUsers.forEach(itemUser => {
                    ArrayMonths.forEach(itemMonth => {
                        if (itemUser.uid === itemMonth.uid) {
                            // console.log('Name:', itemUser.name + 'Month:', itemMonth.months);
                            const values = {
                                uid: itemUser.uid,
                                role: itemUser.role,
                                name: itemUser.name,
                                surname: itemUser.surname,
                                photoURL: itemUser.photoURL,
                                post: 1,
                                months: itemMonth.months as any,
                            }
                            // console.log('Dit zijn de values:', values)
                            availability.value.push(values);
                        }
                    });
                });
                availability.value = [...availability.value];
            }
        }


        const moveCard = ((user: Iavalability, direction: string, currentMonth: string, post: number) => {

            // console.log('Dit is de user in moveCard function:', user.name + ' ' + user.surname + ' ' + post + ' ' + currentMonth)

            let sourceArray: Iavalability[], destinationArray: Iavalability[];

            // Bepaal de bron- en doelarray op basis van de richting
            if (direction === 'left') {
                sourceArray = shifts.value;
                destinationArray = availability.value;

            } else if (direction === 'right') {

                sourceArray = availability.value;
                destinationArray = shifts.value;

                console.log('Dit is de destinationArray', destinationArray)

                console.log('Er wordt naar Links verplaatst.')
            } else {
                console.warn('Ongeldige richting');
                return;
            }

            // Zoek de index van de gebruiker in de sourceArray
            const userIndex = sourceArray.findIndex((u) => u.uid === user.uid);
            // Controleer of de gebruiker is gevonden
            if (userIndex !== -1) {
                // Verwijder de gebruiker uit de sourceArray
                const movedUser = sourceArray.splice(userIndex, 1)[0];

                // Pas de maand aan in de destinationArray
                // movedUser.months = [currentMonth];
                // Wijzig de post van de gebruiker
                movedUser.post = Post.value;
                // Voeg de gebruiker toe aan de doelarray
                destinationArray.push(movedUser);


                // console.log('Dit is de sourceArray:', destinationArray)
                // Logbericht
                // console.log(`Verplaats kaartje: ${user.name} ${user.surname} naar ${direction} kolom en naar post ${Post.value}`);
            } else {
                console.warn('Gebruiker niet gevonden in beschikbaarheid array');
            }
        })

        // Functie om de planning op te slaan
        const handleShifts = () => {
            const postUids: Record<number, string[]> = {};

            // Itereer over shifts.value om de uids per post te groeperen
            for (let i = 0; i < shifts.value.length; i++) {
                const element = shifts.value[i];

                // Bepaal de post van het huidige element
                const postNumber = element.post;

                // Controleer of postNumber niet null is voordat je het als index gebruikt
                if (postNumber !== null && postNumber !== undefined) {
                    // Voeg de post toe aan het object als deze nog niet bestaat
                    if (!postUids[postNumber]) {
                        postUids[postNumber] = [];
                    }

                    // Voeg de uid toe aan de array voor deze post (als het nog niet bestaat)
                    if (!postUids[postNumber].includes(element.uid)) {
                        postUids[postNumber].push(element.uid);
                    }
                }
            }

            // Toon de resultaten voor elke post
            for (const postNumber in postUids) {
                console.log('In de lus voor post', postNumber);

                const uids = postUids[postNumber];
                const result: Record<string, any> = { numberPost: parseInt(postNumber) };

                // Voeg uids toe aan het resultaat met de juiste sleutels (A tot I)
                for (let j = 0; j < Math.min(uids.length, 9); j++) {
                    result[`uidRedder${String.fromCharCode(65 + j)}`] = uids[j];
                }


                addPost({
                    createPostenInput: result
                }).then(() => {
                    console.log('Post toegevoegd');
                    window.location.reload();
                }).catch((error) => {
                    console.error(error);
                });
            }
        };

        // const isPostField = (field: string): field is keyof Ipost => {
        //     // Controleer of de veldnaam overeenkomt met een veld in Ipost
        //     return ['id', 'numberPost', 'uidRedderA', 'uidRedderB', 'uidRedderC', 'uidRedderD', 'uidRedderE', 'uidRedderF', 'uidRedderG', 'uidRedderH', 'uidRedderI'].includes(field);
        // };

        const processDataOfficialplanning = (users: Iuser[], months: Imonth[], posten: Ipost[]) => {
            if (users && months && posten) {

                const combinedData: Iavalability[] = [];

                const isPostField = (field: string): field is keyof Ipost => {
                    return ['uidRedderA', 'uidRedderB', 'uidRedderC', 'uidRedderD', 'uidRedderE', 'uidRedderF', 'uidRedderG', 'uidRedderH', 'uidRedderI'].includes(field);
                };

                for (const user of users) {
                    const userPosten = posten.filter(post => {
                        const postFields = ['uidRedderA', 'uidRedderB', 'uidRedderC', 'uidRedderD', 'uidRedderE', 'uidRedderF', 'uidRedderG', 'uidRedderH', 'uidRedderI'];
                        return postFields.some(field => isPostField(field) && post[field] === user.uid);
                    }).map(post => post.numberPost);

                    // Vind de bijbehorende maanden voor de gebruiker
                    const userMonths = months
                        .filter(month => month.uid === user.uid)  // Filter maanden voor de gebruiker
                        .map(month => month.months)  // Neem alleen de 'months' array

                    // Voeg de gebruiker alleen toe als post niet null is
                    if (userPosten.length > 0 && userPosten[0] !== null) {
                        combinedData.push({
                            uid: user.uid,
                            role: user.role,
                            name: user.name,
                            surname: user.surname,
                            photoURL: user.photoURL,
                            post: userPosten[0],
                            // @ts-ignore
                            months: userMonths.length > 0 ? userMonths[0] : [],
                        });
                    }
                }

                console.log('Dit is de OfficialSchedule:', combinedData)
                OfficialSchedule.value = combinedData;
            }
        };

        const confirmDelete = () => {
            confirmation.value = true;
        }
        const cancelDelete = () => {
            confirmation.value = false;
        }
        const handleDelete = () => {
            const monthUids = monthList.value.map(month => month.uid);
            const postids = postenList.value.map(post => post.id);


            // Verwijder zowel maanden als posten en herlaad de pagina na voltooiing
            Promise.all([
                deleteAllMonths({ uids: monthUids }),
                deleteAllPosten({ ids: postids }),
            ])
                .then(() => {
                    console.log('Maanden en posten verwijderd');
                    confirmation.value = false;
                    // Herlaad de pagina
                    window.location.reload();
                })
                .catch((error) => {
                    console.error(error);
                });

        }


        return {
            Role,
            Post,
            availability,
            shifts,
            moveCard,
            selectedMonth,
            accesUser: user,
            handleShifts,
            postenList,
            OfficialSchedule,
            handleDelete,
            confirmDelete,
            cancelDelete,
            confirmation,
        }
    }
}




</script>