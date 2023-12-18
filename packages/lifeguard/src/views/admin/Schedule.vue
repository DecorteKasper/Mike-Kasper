<template>
    <Container v-if="accesUser.userByUid.accessPlatform">
        <div class="flex">

            <!-- Left side -->
            <div class="w-1/2 shadow-cardShadow rounded-cardRadius p-14 h-116 my-custom-scrollbar overflow-auto">
                <!-- Header schedule -->
                <div class="flex flex-wrap justify-between">
                    <h2 class="font-lato font-semibold text-lg"> {{ selectedMonth }}</h2>
                    <div>
                        <label class="radio-role">
                            <input type="radio" value="200" name="role" class="hidden" v-model="Role">
                            <span
                                :class="{ 'bg-red text-xs font-regular text-white px-4 py-2 rounded-l-buttonRadius focus:outline-none cursor-pointer': Role === '200', 'bg-dark_grey text-xs font-medium text-black px-4 py-2 rounded-l-buttonRadius focus:outline-none cursor-pointer': Role !== '200' }">Redder</span>
                        </label>

                        <label class="radio-role">
                            <input type="radio" value="1" name="role" class="hidden" v-model="Role">
                            <span
                                :class="{ 'bg-red text-xs font-regular text-white px-4 py-2 focus:outline-none cursor-pointer': Role === '1', 'bg-dark_grey text-xs font-medium text-black px-4 py-2 focus:outline-none cursor-pointer': Role !== '1' }">All</span>
                        </label>

                        <label class="radio-role">
                            <input type="radio" value="100" name="role" class="hidden" v-model="Role">
                            <span
                                :class="{ 'bg-dark_green text-xs font-regular text-white px-4 py-2 rounded-r-buttonRadius focus:outline-none cursor-pointer': Role === '100', 'bg-dark_grey text-xs font-medium text-black px-4 py-2 rounded-r-buttonRadius focus:outline-none cursor-pointer': Role !== '100' }">Ehbo</span>
                        </label>

                    </div>
                </div>
                <div class="mt-12 flex flex-wrap gap-4">
                    <!-- Posten -->
                    <!-- Radio buttons posten -->
                    <label class="radio-post">
                        <input type="radio" value="1" name="post" class="hidden" v-model="Post">
                        <span
                            :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === '1', 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== '1', }">Post
                            1</span>
                    </label>

                    <label class="radio-post">
                        <input type="radio" value="2" name="post" class="hidden" v-model="Post">
                        <span
                            :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === '2', 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== '2', }">Post
                            2</span>
                    </label>
                    <label class="radio-post">
                        <input type="radio" value="3" name="post" class="hidden" v-model="Post">
                        <span
                            :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === '3', 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== '3', }">Post
                            3</span>
                    </label>
                    <label class="radio-post">
                        <input type="radio" value="4" name="post" class="hidden" v-model="Post">
                        <span
                            :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === '4', 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== '4', }">Post
                            4</span>
                    </label>
                    <label class="radio-post">
                        <input type="radio" value="5" name="post" class="hidden" v-model="Post">
                        <span
                            :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === '5', 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== '5', }">Post
                            5</span>
                    </label>
                    <label class="radio-post">
                        <input type="radio" value="6" name="post" class="hidden" v-model="Post">
                        <span
                            :class="{ 'bg-dark_green text-xs text-white px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post === '6', 'bg-dark_grey text-xs text-black px-4 py-2 rounded-buttonRadius focus:outline-none cursor-pointer': Post !== '6', }">Post
                            6</span>
                    </label>
                </div>
                <div class="mt-8">
                    <!-- Redders -->
                    <div v-if="Role === '200' || Role === '1'">
                        <div class="border-b-red border-b-2 mb-4">
                            <h3 class="font-lato text-base text-red">Redders</h3>
                        </div>
                        <div class="flex flex-wrap gap-4">
                            <!-- Redder card  -->
                            <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit cursor-pointer"
                                v-for="(user) in shifts.filter(user => user.role === '200' && user.post === Post && user.beschikbaarheid == selectedMonth)"
                                :key="user.id" @click="moveCard(user, 'left')">
                                <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''" alt="">
                                <div v-else>
                                    <UserCircle2 class="h-7 w-7 object-cover text-red" />
                                </div>
                                <p class="font-lato text-xs"> {{ user.name }} {{ user.surname }}</p>
                                <LifeBuoyIcon class="text-red" :size="20" />
                            </div>
                        </div>
                    </div>
                    <!-- Ehbo -->
                    <div v-if="Role === '100' || Role === '1'">
                        <div class="border-b-dark_green border-b-2 my-4">
                            <h3 class="font-lato text-base text-dark_green">Ehbo</h3>
                        </div>

                        <div class="flex flex-wrap gap-4">
                            <!-- ehbo card  -->
                            <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit cursor-pointer"
                                v-for=" user  in   shifts.filter(user => user.role === '100' && user.post === Post && user.beschikbaarheid == selectedMonth)"
                                :key="user.id" @click="moveCard(user, 'left')">
                                <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''" alt="">
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
                            <option class="bg-gray" value="Juni">Juni</option>
                            <option class="bg-gray " value="Juli">Juli</option>
                            <option class="bg-gray " value="Augustus">Augustus</option>
                        </select>
                        <ChevronDown class="absolute right-2 top-2 text-dark_green" :size="20" />
                    </div>
                    <div>
                        <label class="radio-role">
                            <input type="radio" value="200" name="role" class="hidden" v-model="Role">
                            <span
                                :class="{ 'bg-red text-xs font-regular text-white px-4 py-2 rounded-l-buttonRadius focus:outline-none cursor-pointer': Role === '200', 'bg-dark_grey text-xs font-medium text-black px-4 py-2 rounded-l-buttonRadius focus:outline-none cursor-pointer': Role !== '200' }">Redder</span>
                        </label>

                        <label class="radio-role">
                            <input type="radio" value="1" name="role" class="hidden" v-model="Role">
                            <span
                                :class="{ 'bg-red text-xs font-regular text-white px-4 py-2 focus:outline-none cursor-pointer': Role === '1', 'bg-dark_grey text-xs font-medium text-black px-4 py-2 focus:outline-none cursor-pointer': Role !== '1' }">All</span>
                        </label>

                        <label class="radio-role">
                            <input type="radio" value="100" name="role" class="hidden" v-model="Role">
                            <span
                                :class="{ 'bg-dark_green text-xs font-regular text-white px-4 py-2 rounded-r-buttonRadius focus:outline-none cursor-pointer': Role === '100', 'bg-dark_grey text-xs font-medium text-black px-4 py-2 rounded-r-buttonRadius focus:outline-none cursor-pointer': Role !== '100' }">Ehbo</span>
                        </label>
                    </div>

                </div>
                <div class="mt-8">
                    <!-- Redders -->
                    <div v-if="Role === '200' || Role === '1'">
                        <div class="border-b-red border-b-2 mb-4">
                            <h3 class="font-lato text-base text-red">Redders</h3>
                        </div>
                        <div class="flex flex-wrap gap-4">
                            <!-- Redder card  -->
                            <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit cursor-pointer"
                                v-for="(user) in beschikbaarheid.filter(user => user.role === '200' && user.beschikbaarheid == selectedMonth)"
                                :key="user.id" @click="moveCard(user, 'right')">
                                <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''" alt="">
                                <div v-else>
                                    <UserCircle2 class="h-7 w-7 object-cover text-red" />
                                </div>
                                <p class="font-lato text-xs"> {{ user.name }} {{ user.surname }}</p>
                                <LifeBuoyIcon class="text-red" :size="20" />
                            </div>
                        </div>
                    </div>
                    <!-- Ehbo -->
                    <div v-if="Role === '100' || Role === '1'">
                        <div class="border-b-dark_green border-b-2 my-4">
                            <h3 class="font-lato text-base text-dark_green">Ehbo</h3>
                        </div>

                        <div class="flex flex-wrap gap-4">
                            <!-- ehbo card  -->
                            <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit cursor-pointer"
                                v-for=" user in beschikbaarheid.filter(user => user.role === '100' && user.beschikbaarheid == selectedMonth)"
                                :key="user.id" @click="moveCard(user, 'right')">
                                <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''" alt="">
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
    </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue';
import Schedule from '@/components/generic/Schedule.vue';

import margotRobbie from "../../img/MargotRobbie.jpg"
import { LifeBuoyIcon, UserCircle2, Cross, ChevronDown } from 'lucide-vue-next'
import { ref } from 'vue';
import { User } from 'lucide-vue-next';
import { useQuery } from '@vue/apollo-composable'
import useFirebase from '@/composables/useFirebase'
import { GET_USER_BY_UID } from '@/graphql/user.query'
import router from '@/router'


interface User {
    id: string;
    uid: string;
    role: string;
    name: string;
    surname: string;
    photoURL: string | null;
    post: string;
    beschikbaarheid: string;
}

export default {

    components: {
        Container,
        Schedule,
        LifeBuoyIcon,
        UserCircle2,
        Cross,
        ChevronDown

    },

    setup() {


        const Role = ref<string>("1");
        const Post = ref<string>("1");
        const selectedMonth = ref("Juni");

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



        const beschikbaarheid = ref<User[]>([
            {
                id: "653e40a340a50bedb1c53925",
                uid: "VqrsOpd6zqVQi7P8gOfLCv2ofCI3",
                role: "200",
                name: "Mike",
                surname: "Vanoosthuyze",
                photoURL: margotRobbie,
                // createdAt: new Date("2023-10-29T11:23:15.565+00:00"),
                // updateAt: new Date("2023-10-29T11:23:15.565+00:00"),
                post: "1",
                beschikbaarheid: "Juli",
            },
            {
                id: "654e40a340a50bedb1c53926",
                uid: "AbcOpd6zqVQi7P8gOfLCv2ofCI3",

                role: "100",
                name: "Sarah",
                surname: "Smith",
                photoURL: null,
                // createdAt: new Date("2023-10-28T14:45:30.123+00:00"),
                // updateAt: new Date("2023-10-28T14:45:30.123+00:00"),
                post: "1",
                beschikbaarheid: "Juli",
            },
            {
                id: "655e40a340a50bedb1c53927",
                uid: "XyzOpd6zqVQi7P8gOfLCv2ofCI3",

                role: "100",
                name: "Carlos",
                surname: "Rodriguez",
                photoURL: null,
                // createdAt: new Date("2023-10-27T09:15:45.987+00:00"),
                // updateAt: new Date("2023-10-27T09:15:45.987+00:00"),
                post: "1",
                beschikbaarheid: "Augustus",
            },
        ]);
        const shifts = ref<User[]>([
            {
                id: "",
                uid: "",
                role: "",
                name: "",
                surname: "",
                photoURL: null,
                // createdAt: new Date("2023-10-29T11:23:15.565+00:00"),
                // updateAt: new Date("2023-10-29T11:23:15.565+00:00"),
                post: "",
                beschikbaarheid: "",
            },
        ]);

        const moveCard = ((user: User, direction: string) => {

            let sourceArray: User[], destinationArray: User[];

            // Bepaal de bron- en doelarray op basis van de richting
            if (direction === 'left') {
                sourceArray = shifts.value;
                destinationArray = beschikbaarheid.value;
            } else if (direction === 'right') {
                sourceArray = beschikbaarheid.value;
                destinationArray = shifts.value;
            } else {
                console.warn('Ongeldige richting');
                return;
            }
            // Zoek de index van de gebruiker in de sourceArray
            const userIndex = sourceArray.findIndex((u) => u.id === user.id);
            // Controleer of de gebruiker is gevonden
            if (userIndex !== -1) {
                // Verwijder de gebruiker uit de sourceArray
                const movedUser = sourceArray.splice(userIndex, 1)[0];
                // Wijzig de post van de gebruiker
                movedUser.post = Post.value;
                // Voeg de gebruiker toe aan de doelarray
                destinationArray.push(movedUser);
                // Logbericht
                console.log(`Verplaats kaartje: ${user.name} ${user.surname} naar ${direction} kolom en naar post ${Post.value}`);
            } else {
                console.warn('Gebruiker niet gevonden in beschikbaarheid array');
            }
        })

        console.log(Post.value);
        return {
            // Return value
            Role,
            Post,
            beschikbaarheid,
            shifts,
            moveCard,
            selectedMonth,
            accesUser: user
        }
    }
}
</script>