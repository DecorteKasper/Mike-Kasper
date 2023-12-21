<template>
    <div class="w-full md:w-1/2 shadow-cardShadow rounded-cardRadius p-14 h-116 my-custom-scrollbar overflow-auto">
        <!-- Header schedule -->
        <div class="flex flex-wrap justify-between">
            <h2 class="font-lato font-semibold text-lg mb-4 md:mb-0">{{ currentMonth }}</h2>
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
                    <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit"
                        v-for="(user) in OfficialSchedule.filter(user => user.role === 200 && user.post === Post && user.months.some(month => currentMonth.includes(month)))">
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
            <div v-if="Role === 100 || Role === 1">
                <div class="border-b-dark_green border-b-2 my-4">
                    <h3 class="font-lato text-base text-dark_green">Ehbo</h3>
                </div>

                <div class="flex flex-wrap gap-4">
                    <!-- ehbo card  -->
                    <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit"
                        v-for="(user) in OfficialSchedule.filter(user => user.role === 100 && user.post === Post && user.months.some(month => currentMonth.includes(month)))">
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
import { ref, watch } from 'vue'

import margotRobbie from "../../img/MargotRobbie.jpg"
import { LifeBuoyIcon, UserCircle2, Cross } from 'lucide-vue-next'
import type { Iuser } from '@/interfaces/user.interface';
import { useQuery } from '@vue/apollo-composable';
import { ALL_MONTHS } from '@/graphql/month.query';
import { GET_USERS } from '@/graphql/user.query';
import { ALL_POSTEN } from '@/graphql/post.query';
import type { Ipost } from '@/interfaces/post.interface';


interface IAvalability {
    uid: string;
    role: number | null;
    name: string | null;
    surname: string | null;
    photoURL: string | null;
    post: number | null;
    months: string[] | [];
}

interface IMonth {
    id: string;
    uid: string;
    months: string;
}


export default {

    components: {
        LifeBuoyIcon,
        UserCircle2,
        Cross
    },

    setup() {
        const Role = ref<number>(1);
        const Post = ref<number>(1);
        const currentMonth = "augustus";

        const { result: months, error: monthsError } = useQuery(ALL_MONTHS)
        const { result: users, error: usersError } = useQuery(GET_USERS)
        const { result: posten, error: postenError } = useQuery(ALL_POSTEN)


        const monthList = ref<IMonth[]>([]);
        const postenList = ref<Ipost[]>([]);
        const OfficialSchedule = ref<IAvalability[]>([]);

        // Watch 
        watch([users, months, posten], ([usersValue, monthsValue, postenValue]) => {
            if (usersValue && monthsValue && postenValue) {
                const { users: ArrayUsers } = usersValue;
                const { months: ArrayMonths } = monthsValue;
                const { posten: ArrayPosten } = postenValue;
                postenList.value = ArrayPosten;
                monthList.value = ArrayMonths;
                // Functie voor planning te maken
                if (postenList) {
                    processDataOfficialplanning(ArrayUsers, ArrayMonths, ArrayPosten);
                }

            }
        })

        const processDataOfficialplanning = (users: Iuser[], months: IMonth[], posten: Ipost[]) => {
            if (users && months && posten) {

                const combinedData: IAvalability[] = [];

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



        return {
            Role,
            Post,
            users,
            OfficialSchedule,
            currentMonth
        }
    }
}
</script>