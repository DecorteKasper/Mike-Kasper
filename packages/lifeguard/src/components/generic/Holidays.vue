<template>
    <div class="w-1/2 shadow-cardShadow rounded-cardRadius p-14 h-116 my-custom-scrollbar overflow-auto">
        <div>
            <h2 class="font-semibold font-lato text-lg pb-2 mb-8">
                Opkomende verlofdagen
            </h2>
            <div v-for="(verlofDate, index) in VerlofDates" :key="index">
                <div class="border-b-1 border-black">
                    <h3 class="font-lato text-xs pb-2">{{ formatDate(verlofDate) }}</h3>
                </div>
                <div class="flex flex-wrap gap-4 py-4">


                    <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit"
                        v-for="(user) in getUsersForVerlofDate(verlofDate)" :key="user.uid">
                        <img v-if="user.photoURL" class="h-8 w-8 rounded-full" :src="user.photoURL || ''" alt="" />
                        <div v-else>
                            <UserCircle2 v-if="user.role === '200'" class="h-7 w-7 object-cover text-red" />
                            <UserCircle2 v-else-if="user.role === '100'" class="h-7 w-7 object-cover text-dark_green" />
                        </div>
                        <p class="font-lato text-xs">{{ user.name }} {{ user.surname }}</p>
                        <LifeBuoyIcon v-if="user.role === '200'" class="text-red" :size="20" />
                        <Cross v-else-if="user.role === '100'" class="text-dark_green" :size="20" />
                    </div>


                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, computed } from 'vue';
import margotRobbie from '../../img/MargotRobbie.jpg';
import { LifeBuoyIcon, UserCircle2, Cross } from 'lucide-vue-next';

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
    verlof: Date | null;
}

export default {
    components: {
        LifeBuoyIcon,
        UserCircle2,
        Cross
    },

    setup() {


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
                verlof: new Date("2023-11-03"),
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
                verlof: new Date("2023-11-08"),
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
                verlof: new Date("2023-11-08"),
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
                verlof: new Date("2023-11-08"),
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
                verlof: new Date("2023-11-12"),
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
                verlof: new Date("2023-11-12"),
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
                verlof: new Date("2023-11-12"),
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
                verlof: new Date("2023-11-12"),
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
                verlof: new Date("2023-11-14"),
            },
        ]);

        // Bereken verlofdatums en sorteer ze oplopend
        const VerlofDates = computed(() => {
            const currentDate = new Date();
            const datesSet = new Set<string>();
            users.value.forEach((user) => {
                if (user.verlof && user.verlof >= currentDate) {
                    datesSet.add(user.verlof.toISOString().split('T')[0]);
                }
            });

            return Array.from(datesSet).sort();
        });

        // Functie om gebruikers op te halen voor een specifieke verlofdatum
        function getUsersForVerlofDate(verlofDate: string) {
            return users.value.filter((user) => {
                if (user.verlof && user.verlof.toISOString().split('T')[0] === verlofDate) {
                    return user.verlof.toISOString().split('T')[0] === verlofDate;
                }
                return false;
            });
        }

        // Functie om datum te formatteren naar gewenste notatie
        function formatDate(date: string) {
            const parts = date.split('-');
            return `${parts[2]}/${parts[1]}/${parts[0]}`;
        }

        return {
            VerlofDates,
            getUsersForVerlofDate,
            formatDate,
        };
    },
};
</script>
  