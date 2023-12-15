<template>
    <Container class="text-lato">
        <div class="flex flex-col mt-2 mb-12 lg:mt-8 lg:mb-20">
            <h1 class="text-lato font-bold text-lg text-center lg:text-xl">Verlofplanning</h1>
            <div class="h-[2px] lg:h-[3px] w-20 bg-greenx m-auto mt-1 lg:mt-2 rounded-full"></div>
        </div>

        <div class="flex flex-col lg:flex-row lg:justify-around lg:mt-14 lg:items-baseline items-center font-lato ">
<!-- EERSTE CARD -->
            <div class="bg-white w-full h-auto min-h-[20rem] rounded-cardRadius shadow-cardShadow px-6 py-7 lg:px-16 lg:max-w-xl lg:h-[28rem]">
                <div class="flex flex-row justify-between items-center m-auto max-w-lg">
                    <button class="text-lg" @click="showPreviousDay">&larr;</button>
                    <h2 class="font-bold text-center text-base">Verlof op <span class="text-red">{{ currentDateString }}</span></h2>
                    <button class="text-lg" @click="showNextDay">&rarr;</button>
                </div>

                <div class="mt-7 m-auto max-w-lg">


                    <div v-if="workersInPost && workersInPost.length">
                        <div v-for="(worker, index) in  workersInPost "
                            :key="index"
                            :class="{ 'bg-greenx': isWorkerWithHoliday(worker), 'bg-gray': !isWorkerWithHoliday(worker) }"
                            class="rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                            <img class="w-4 mr-7" :src="isWorkerWithHoliday(worker) ? check_icon : uncheck_icon" alt="check">
                            <div class="font-normal">
                            <p>
                                <span class="font-bold mr-3">{{ String.fromCharCode(65 + index) }}</span>
                                <span>{{ worker }}</span>
                            </p>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <p>No workers available.</p>
                    </div>
                </div>
            </div>

<!-- TWEEDE CARD -->
            <div class="bg-white w-full h-auto min-h-[20rem] rounded-cardRadius shadow-cardShadow px-6 py-7 mt-10 lg:mt-0 lg:ml-8 lg:px-16 lg:max-w-xl lg:h-[28rem]">
                <h2 class="font-bold text-center text-base">Verlofverdeling Post 3</h2>

                <div class="mt-7 m-auto max-w-lg">
                    <div class="flex flex-row">
                        <div class="w-40"></div>
                        <div class="w-6 m-auto"><p class="text-greenx text-[10px]">Verlofdagen</p></div>
                        <div class="w-6 m-auto"><p class="text-red text-[10px]">Werkdagen</p></div>
                    </div>

                    <div v-if="userHolidayDetails && userHolidayDetails.length">
                        <div v-for="(user, index) in userHolidayDetails" :key="index" class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                            <div class="font-normal w-44">
                                <p>
                                    <span class="font-bold mr-6">{{ String.fromCharCode(65 + index) }}</span>
                                    <span>{{ user.name }}</span>
                                </p>
                            </div>
                            <div class="w-6 m-auto"><p class="text-greenx">{{ user.aantalVerlofdagen }}</p></div>
                            <div class="w-6 pl-3 m-auto"><p class="text-red">{{ user.aantalWerkdagen }}</p></div>
                        </div>
                    </div>
                    <div v-else>
                        <p>No workers available.</p>
                    </div>
                </div>
            </div>
        </div>  

        <section class="font-lato mt-16 lg:mt-36">
            <div>
                <h1 class="text-center text-lg font-bold">Persoonlijke verlofdagen</h1>
                <div class="h-[2px] w-20 bg-greenx m-auto mt-1 rounded-full"></div>
            </div>

            <div class="bg-white w-full h-auto rounded-cardRadius shadow-cardShadow px-6 py-7 mt-6 mb-6 lg:max-w-5xl m-auto">
                <Calendar borderless expanded :attributes='(attrs as any)' :min-date="new Date()"/>
            </div>
        </section>
    </Container>
</template>



<script lang="ts">
import { ref, computed, watch } from 'vue';
import Container from '@/components/generic/Container.vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';

import check_icon from '@/assets/icons/checked.svg';
import uncheck_icon from '@/assets/icons/unchecked.svg';
import { ALL_HOLIDAYS } from '@/graphql/holiday.query';
import { GET_POST_BY_NUMBER } from '@/graphql/post.query';
import { GET_USERS } from '@/graphql/user.query';
import type { Iholiday } from '@/interfaces/holiday.interface';
import type { Ipost } from '@/interfaces/post.interface';
import { useQuery } from '@vue/apollo-composable';
import useFirebase from '@/composables/useFirebase';

interface User {
    name: string;
    uid: string;
    surname?: string;
}


interface UserHolidayDetails {
    name: string;
    aantalVerlofdagen: number;
    aantalWerkdagen: number;
}

export default {
    components: {
        Container,
        Calendar,
        DatePicker,
    },

    setup() {
        const currentDate = ref(new Date());
        const date = ref(new Date());
        const workersInPost = ref<string[] | null>();
        const namesUsersWithHoliday = ref<string[] | null>();
        const userHolidayDetails = ref<UserHolidayDetails[]>([]);
        const { firebaseUser } = useFirebase();
        const currentUserUid = firebaseUser.value?.uid;
        const currentUserHolidays = ref<Iholiday[]>([]);

        const { loading: usersLoading, result: usersResult, error: usersError } = useQuery<{ users: User[] }>(GET_USERS);
        const { loading: postLoading, result: postResult, error: postError } = useQuery(GET_POST_BY_NUMBER, { numberPost: 4 });
        const { loading: holidaysLoading, result: holidaysResult, error: holidaysError } = useQuery<{ holidays: Iholiday[] }>(ALL_HOLIDAYS);


        watch(holidaysResult, (holidaysResultValue) => {
            if (holidaysResultValue && holidaysResultValue.holidays) {
                const holidaysData = holidaysResultValue.holidays;

                // Filter holidaysData for the user with currentUserUid
                currentUserHolidays.value = holidaysData.filter(holiday => holiday.uid === currentUserUid);
            }
        });

        //Redders van de post
        watch([usersResult, postResult, holidaysResult], ([usersValue, postValue, holidaysResultValue]) => {
            if (usersValue && usersValue.users && postValue && postValue.postByNumber && holidaysResultValue && holidaysResultValue.holidays) {
                const users = usersValue.users as User[];
                const post = postValue.postByNumber as Ipost;
                const holidaysData = holidaysResultValue.holidays;

                //currentUserHolidays.value = holidaysData.filter(holiday => holiday.uid === currentUserUid);
                //console.log(currentUserHolidays);

                // Get the current date
                const today = new Date().toISOString().split('T')[0];

                // Get the UIDs of users in the current post
                const postUIDs = [post.uidRedderA, post.uidRedderB, post.uidRedderC, post.uidRedderD, post.uidRedderE, post.uidRedderF, post.uidRedderG];

                //Calculate the total number of days in the current month
                const currentMonth = currentDate.value.getMonth();
                const currentYear = currentDate.value.getFullYear();
                const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
                const totalDaysInMonth = lastDayOfMonth.getDate();

                // Store the count of dates for each uid
                const dateCountByUID: Record<string, number> = {};

                // Iterate through holidaysData to count dates for each uid
                holidaysData.forEach((holiday) => {
                    if (postUIDs.includes(holiday.uid)) {
                        dateCountByUID[holiday.uid] = (dateCountByUID[holiday.uid] || 0) + holiday.dates.length;
                    }
                });

                // Check if there is a matching uid and display the full name in the console
                userHolidayDetails.value = users.map((user) => {
                    const fullName = `${user.name} ${user.surname}`;
                    const holidaysAmount = dateCountByUID[user.uid] || 0;
                    return { name: fullName, aantalVerlofdagen: holidaysAmount, aantalWerkdagen: totalDaysInMonth - holidaysAmount };
                });
                console.log(userHolidayDetails);

            

                // Get the users who have a holiday today
                const usersWithHolidayToday = users.filter((user) =>
                    holidaysData.some((holiday) =>
                        postUIDs.includes(holiday.uid) &&
                        holiday.dates.some((date) => date.split('T')[0] === today) &&
                        holiday.uid === user.uid
                    )
                );                

                namesUsersWithHoliday.value = usersWithHolidayToday.map((user) => `${user.name} ${user.surname}`);

                // Get the names of users who work in the specific post
                const namesOfUsersInSpecificPost = users
                    .filter((user) => postUIDs.includes(user.uid))
                    .map((user) => `${user.name} ${user.surname}`);

                workersInPost.value = namesOfUsersInSpecificPost;
            }

            

        });
        


        // Function to check if a worker has a holiday today
        const isWorkerWithHoliday = (worker: string): boolean => {
            return namesUsersWithHoliday.value?.includes(worker) || false;
        };



        const currentDateString = computed(() => {
            const months = [
                'januari', 'februari', 'maart', 'april', 'mei', 'juni',
                'juli', 'augustus', 'september', 'oktober', 'november', 'december',
            ];

            const day = currentDate.value.getDate();
            const month = months[currentDate.value.getMonth()];


            return `${day} ${month}`;
        });

        const showPreviousDay = () => {
            const newDate = new Date(currentDate.value);
            newDate.setDate(currentDate.value.getDate() - 1);
            currentDate.value = newDate;
        };

        const showNextDay = () => {
            const newDate = new Date(currentDate.value);
            newDate.setDate(currentDate.value.getDate() + 1);
            currentDate.value = newDate;
        };


        //Calendar persoonlijk verlof
        const attrs = ref([
            {
                key: 'today',
                highlight: {
                    color: 'blue',
                    fillMode: 'outline',
                },
                dates: ref(new Date()),
            },
            {
                key: 'Not working',
                highlight: {
                    color: 'red',
                    fillMode: 'light',
                },
                dates: computed(() => {
                    // Convert dates to the desired format
                    return currentUserHolidays.value.flatMap(holiday =>
                        holiday.dates.map(date => new Date(date))
                    );
                }),
            },
        ]);

        return {
            check_icon,
            uncheck_icon,
            currentDate,
            date,
            currentDateString,
            showPreviousDay,
            showNextDay,
            attrs,
            workersInPost,
            isWorkerWithHoliday,
            userHolidayDetails,
        };
    },
};
</script>