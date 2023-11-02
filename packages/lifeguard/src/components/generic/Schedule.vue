<template>
    <div class="w-1/2 shadow-cardShadow rounded-cardRadius p-14 h-116 my-custom-scrollbar overflow-auto">
        <!-- Header schedule -->
        <div class="flex flex-wrap justify-between">
            <h2 class="font-lato font-semibold text-lg">Dagelijkse planning</h2>
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
                    5</span>
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
                    <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit"
                        v-for="(user) in users.filter(user => user.role === '200' && user.post === Post)">


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
                    <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit"
                        v-for=" user  in   users.filter(user => user.role === '100' && user.post === Post) ">
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
</template>

<script lang="ts">
import { ref } from 'vue'
import margotRobbie from "../../img/MargotRobbie.jpg"
import { LifeBuoyIcon, UserCircle2, Cross } from 'lucide-vue-next'


interface User {
    id: string;
    uid: string;
    locale: string;
    role: string;
    name: string;
    surname: string;
    email: string;
    bathingPlace: string;
    photoURL: string | null;
    phoneNumber: string | null;
    zipCode: number | null;
    street: string | null;
    numberOfHouse: number | null;
    birth: Date | null;
    createdAt: Date;
    updateAt: Date;
    post: string;
}

export default {

    components: {
        LifeBuoyIcon,
        UserCircle2,
        Cross
    },


    setup() {
        const Role = ref<string>("1");
        const Post = ref<string>("1");

        const users = ref<User[]>([

            {
                id: "653e40a340a50bedb1c53925",
                uid: "VqrsOpd6zqVQi7P8gOfLCv2ofCI3",
                locale: "nl",
                role: "200",
                name: "Mike",
                surname: "Vanoosthuyze",
                email: "mvanoosthuyze@gmail.com",
                bathingPlace: "Nieuwpoort",
                photoURL: margotRobbie,
                phoneNumber: null,
                zipCode: null,
                street: null,
                numberOfHouse: null,
                birth: null,
                createdAt: new Date("2023-10-29T11:23:15.565+00:00"),
                updateAt: new Date("2023-10-29T11:23:15.565+00:00"),
                post: "1",
            },
            {
                id: "654e40a340a50bedb1c53926",
                uid: "AbcOpd6zqVQi7P8gOfLCv2ofCI3",
                locale: "en",
                role: "100",
                name: "Sarah",
                surname: "Smith",
                email: "ssmith@example.com",
                bathingPlace: "Miami",
                photoURL: null,
                phoneNumber: "123-456-7890",
                zipCode: 33123,
                street: "Ocean Drive",
                numberOfHouse: 42,
                birth: new Date("1990-05-15T08:00:00.000Z"),
                createdAt: new Date("2023-10-28T14:45:30.123+00:00"),
                updateAt: new Date("2023-10-28T14:45:30.123+00:00"),
                post: "1",
            },
            {
                id: "655e40a340a50bedb1c53927",
                uid: "XyzOpd6zqVQi7P8gOfLCv2ofCI3",
                locale: "es",
                role: "100",
                name: "Carlos",
                surname: "Rodriguez",
                email: "crodriguez@example.com",
                bathingPlace: "Barcelona",
                photoURL: null,
                phoneNumber: "987-654-3210",
                zipCode: 8520,
                street: "Ramblas",
                numberOfHouse: 7,
                birth: new Date("1985-11-20T12:30:00.000Z"),
                createdAt: new Date("2023-10-27T09:15:45.987+00:00"),
                updateAt: new Date("2023-10-27T09:15:45.987+00:00"),
                post: "1",
            },
            // Voeg meer gebruikers toe zoals nodig
            {
                id: "656e40a340a50bedb1c53928",
                uid: "PqrOpd6zqVQi7P8gOfLCv2ofCI3",
                locale: "fr",
                role: "200",
                name: "Marie",
                surname: "Dupont",
                email: "mdupont@example.com",
                bathingPlace: "Paris",
                photoURL: null,
                phoneNumber: "33-1-23456789",
                zipCode: 75001,
                street: "Champs-Elysées",
                numberOfHouse: 12,
                birth: new Date("1988-07-05T14:45:00.000Z"),
                createdAt: new Date("2023-10-26T15:30:20.456+00:00"),
                updateAt: new Date("2023-10-26T15:30:20.456+00:00"),
                post: "1",
            },
            {
                id: "657e40a340a50bedb1c53929",
                uid: "LmnOpd6zqVQi7P8gOfLCv2ofCI3",
                locale: "de",
                role: "100",
                name: "Hans",
                surname: "Schmidt",
                email: "hschmidt@example.com",
                bathingPlace: "Berlin",
                photoURL: null,
                phoneNumber: "49-30-12345678",
                zipCode: 10117,
                street: "Unter den Linden",
                numberOfHouse: 18,
                birth: new Date("1992-02-10T10:00:00.000Z"),
                createdAt: new Date("2023-10-25T12:15:10.789+00:00"),
                updateAt: new Date("2023-10-25T12:15:10.789+00:00"),
                post: "1",
            },
            {
                id: "658e40a340a50bedb1c53930",
                uid: "RstOpd6zqVQi7P8gOfLCv2ofCI3",
                locale: "it",
                role: "100",
                name: "Giuseppe",
                surname: "Bianchi",
                email: "gbianchi@example.com",
                bathingPlace: "Rome",
                photoURL: null,
                phoneNumber: "39-06-98765432",
                zipCode: 8520,
                street: "Via del Corso",
                numberOfHouse: 24,
                birth: new Date("1987-03-18T09:30:00.000Z"),
                createdAt: new Date("2023-10-24T16:50:40.234+00:00"),
                updateAt: new Date("2023-10-24T16:50:40.234+00:00"),
                post: "1",
            },

            {
                id: "659e40a340a50bedb1c53931",
                uid: "FghOpd6zqVQi7P8gOfLCv2ofCI3",
                locale: "pt",
                role: "200",
                name: "Maria",
                surname: "Santos",
                email: "msantos@example.com",
                bathingPlace: "Lisbon",
                photoURL: margotRobbie,
                phoneNumber: "351-21-1234567",
                zipCode: 1100,
                street: "Rua Augusta",
                numberOfHouse: 30,
                birth: new Date("1995-09-22T11:15:00.000Z"),
                createdAt: new Date("2023-10-23T13:40:50.678+00:00"),
                updateAt: new Date("2023-10-23T13:40:50.678+00:00"),
                post: "1",
            },
            {
                id: "660e40a340a50bedb1c53932",
                uid: "MnoOpd6zqVQi7P8gOfLCv2ofCI3",
                locale: "ru",
                role: "100",
                name: "Elena",
                surname: "Ivanova",
                email: "eivanova@example.com",
                bathingPlace: "Moscow",
                photoURL: margotRobbie,
                phoneNumber: "7-495-7654321",
                zipCode: 101000,
                street: "Tverskaya Street",
                numberOfHouse: 15,
                birth: new Date("1991-12-03T17:20:00.000Z"),
                createdAt: new Date("2023-10-22T10:25:35.543+00:00"),
                updateAt: new Date("2023-10-22T10:25:35.543+00:00"),
                post: "1",
            },
            {
                id: "661e40a340a50bedb1c53933",
                uid: "QweOpd6zqVQi7P8gOfLCv2ofCI3",
                locale: "ja",
                role: "200",
                name: "Yuki",
                surname: "Suzuki",
                email: "ysuzuki@example.com",
                bathingPlace: "Tokyo",
                photoURL: margotRobbie,
                phoneNumber: "81-3-9876-5432",
                zipCode: 8520,
                street: "Ginza Street",
                numberOfHouse: 8,
                birth: new Date("1993-06-25T10:10:00.000Z"),
                createdAt: new Date("2023-10-21T11:35:25.456+00:00"),
                updateAt: new Date("2023-10-21T11:35:25.456+00:00"),
                post: "1",
            },
        ]);

        return {
            Role,
            Post,
            users,
        }
    }
}
</script>