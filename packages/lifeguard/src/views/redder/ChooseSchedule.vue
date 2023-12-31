<template>
    <Container>
        <div class="flex flex-col md:mb-12">
            <h1 class="text-center font-lato font-bold text-lg md:text-xl">Keuze verlofdagen</h1>
            <div class="bg-greenx mt-1 w-[70px] h-[2px] rounded-full m-auto"></div>
        </div>

        <div v-if="!isUserInHolidays">
            <p class="mt-12 mb-2 md:mb-8 text-center"><span class="text-redx text-lg font-semibold">{{ overigeVerlofDagen }}</span>  {{ dayText }} beschikbaar</p>
    
            <div class="flex flex-col md:flex-row justify-around">
                <div class="bg-white w-full md:w-xl h-auto rounded-cardRadius shadow-cardShadow px-4 py-6 mt-3">
                    <Calendar 
                        borderless
                        expanded
                        :attributes="(attributes as any)"
                        @dayclick="onDayClick" />
                </div>
        
                <div class="mt-10 lg:min-w-[20rem]">
                    <h2 class="font-bold text-redx mb-1">Gekozen verlofdagen:</h2>
                    <ul>
                        <li v-for="selectedDate in days" :key="selectedDate.id"><span class="text-redx text-lg">• </span><span class="mb-5">{{ formatDate(selectedDate.date) }}</span></li>
                    </ul>
    
                    <PrimaryButton label="Verstuur verlofdagen" @click="logSelectedDates" class="mt-10 mb-10 flex m-auto md:mb-0 md:ml-0" v-if="overigeVerlofDagen === 0"/>
                </div>
            </div>
        </div>
        <div v-else>
            <div class="block m-auto mt-20 md:mt-0 bg-white rounded-cardRadius shadow-cardShadow max-w-4xl py-3">
                <p class="mt-12 font-bold text-base text-center">Bedankt, we hebben je verlofdagen ontvangen!</p>
                <p  class="mt-4 text-center">Je ontvangt binnenkort een mail met meer informatie.</p>
                <PrimaryButton label="Ga verder" @click="$router.push('/redder')" class="mt-10 px-10 mb-6 block m-auto"/>
            </div>
        </div>
    </Container>
</template>


<script lang="ts">
import Container from '@/components/generic/Container.vue';
import { ref, computed, watch } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import PrimaryButton from '@/components/generic/PrimaryButton.vue';
import { useMutation, useQuery } from '@vue/apollo-composable';

import type { Iholiday } from '@/interfaces/holiday.interface';
import { ADD_HOLIDAY } from '@/graphql/holiday.mutation';
import useFirebase from '@/composables/useFirebase';
import { ALL_POSTEN, GET_POST_BY_NUMBER } from '@/graphql/post.query';
import type { Ipost } from '@/interfaces/post.interface';
import { ALL_HOLIDAYS } from '@/graphql/holiday.query';


export default {
    components: {
        Container,
        Calendar,
        PrimaryButton,
    },    

    setup() {
        const maxSelectedDates = 5;
        const days = ref<Array<{ id: number; date: string }>>([]);
        const overigeVerlofDagen = ref<number>(maxSelectedDates);
        const currentUserPost = ref<number>(4);

        //const { mutate: addHoliday } = useMutation(ADD_HOLIDAY);
        const { mutate: addHoliday } = useMutation<Iholiday>(ADD_HOLIDAY);
        const { loading: postenLoading, result: postenResult, error: postenError } = useQuery<{ posten: Ipost[] }>(ALL_POSTEN);
        const { loading: holidaysLoading, result: holidaysResult, error: holidaysError } = useQuery<{ holidays: Iholiday[] }>(ALL_HOLIDAYS);


        const { firebaseUser } = useFirebase()
        const uidUser = firebaseUser.value?.uid
        console.log("uidUser: ", uidUser)
        const isUserInHolidays = ref(false);


        // Define computed properties using computed()
        const dates = computed(() => days.value.map(day => day.date));
        const attributes = computed(() => dates.value.map(date => ({
            highlight: true,
            dates: date,
        })));


        watch(() => holidaysResult.value, (newResult) => {
            // Handle changes here
            holidaysResult.value = newResult;
            console.log("Holidays: ", holidaysResult.value);
            updateIsUserInHolidays();
        });
        if (holidaysResult.value) {
            console.log("Holidays: ", holidaysResult.value);
            updateIsUserInHolidays();
        }

        function updateIsUserInHolidays() {
            if (holidaysResult.value?.holidays && firebaseUser.value?.uid) {
                isUserInHolidays.value = holidaysResult.value.holidays.some(
                    (holiday) => holiday.uid === firebaseUser.value!.uid
                );
            }

            console.log("Is user in holidays: ", isUserInHolidays.value);
        }


        //Postnummer van current user
        watch([() => uidUser, postenResult], ([newUid, newValue]) => {
            if (newUid && newValue && newValue.posten) {
                const posten = newValue.posten as Ipost[];

                posten.forEach((post) => {
                    if (
                        post.uidRedderA === newUid ||
                        post.uidRedderB === newUid ||
                        post.uidRedderC === newUid ||
                        post.uidRedderD === newUid ||
                        post.uidRedderE === newUid ||
                        post.uidRedderF === newUid ||
                        post.uidRedderG === newUid
                    ) {
                        currentUserPost.value = post.numberPost;
                    }
                });
            }
            console.log("Current user post: ", currentUserPost.value);
        });
        const { loading: postLoading, result: postResult, error: postError } = useQuery(GET_POST_BY_NUMBER, { numberPost: currentUserPost.value });


        // Define methods
        const onDayClick = (day: { id: number; date: string }) => {
            const selectedDatesCount = days.value.length;

            if (selectedDatesCount < maxSelectedDates || isSelected(day)) {
                const dayDate = new Date(day.date);
                const dayDateString = dayDate.toLocaleDateString();

                const idx = days.value.findIndex(d => {
                    const currentDate = new Date(d.date);
                    const currentDateString = currentDate.toLocaleDateString();

                    return d.id === day.id && currentDateString === dayDateString;
                });

                if (idx >= 0) {
                    // If the date is already selected, remove it
                    days.value.splice(idx, 1);
                    overigeVerlofDagen.value = (maxSelectedDates + 1) - selectedDatesCount;
                } else {
                    // If the limit is not reached, add the selected date
                    days.value.push({
                        id: day.id,
                        date: day.date,
                    });

                    // Sort the array based on the date
                    days.value.sort((a, b) => {
                        const dateA = new Date(a.date);
                        const dateB = new Date(b.date);
                        return ((dateA as any) - (dateB as any));
                    });

                    overigeVerlofDagen.value = (maxSelectedDates - 1) - selectedDatesCount;
                }
            } else {
                // Remove the last selected date to allow unselecting
                days.value.pop();
                overigeVerlofDagen.value = (maxSelectedDates + 1) - selectedDatesCount;
            }
        };
        const isSelected = (day: { id: number; date: string }) => {
            return days.value.some(d => d.id === day.id && d.date === day.date);
        };

        const formatDate = (dateString:any) => {
            const date = new Date(dateString);
            const options = { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' };
            return date.toLocaleDateString('nl-NL', options as any);
        };

        //woord dag veranderen naar dagen als het niet 1 is
        const dayText = computed(() => {
            return overigeVerlofDagen.value === 1 ? 'verlofdag' : 'verlofdagen';
        });

        const logSelectedDates = () => {
            addHoliday({
                createHolidayInput: {
                    uid: uidUser,
                    dates: dates.value,
                    post: currentUserPost.value,
                },
            });
            window.location.reload();

            // Log selected dates in JSON format
            console.log(days.value);
        };

        // Return the properties and methods
        return {
            days,
            dates,
            attributes,
            formatDate,
            onDayClick,
            overigeVerlofDagen,
            dayText,
            logSelectedDates,
            addHoliday,
            currentUserPost,
            isUserInHolidays,
        };
    },
}
</script>