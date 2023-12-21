<template>
    <div class="w-1/2 shadow-cardShadow rounded-cardRadius h-116 pb-20 pt-14 px-14">
        <h1 class="font-lato text-lg font-semibold mb-6">Opkomende verlofdagen</h1>

        <div class="overflow-auto h-full my-custom-scrollbar">
            <div v-for="date in sortedDates" :key="date">
                <div class="font-lato text-sm pb-2 mb-4 border-b-2 border-dark_grey">{{ formatDate(date) }}</div>
                <div v-for="holiday in usersWithFutureHolidaysByDate[date]" :key="holiday.uid">
                    <!-- Card -->
                    <div class="bg-dark_grey rounded-inputFieldRadius px-4 py-2 flex items-center gap-4 w-fit mb-4"
                        :key="holiday.uid">
                        <img v-if="holiday.photoURL" class="h-8 w-8 rounded-full" :src="holiday.photoURL || ''" alt="" />
                        <div v-else>
                            <UserCircle2 v-if="holiday.role === 200" class="h-7 w-7 object-cover text-red" />
                            <UserCircle2 v-else-if="holiday.role === 100" class="h-7 w-7 object-cover text-dark_green" />
                        </div>
                        <p class="font-lato text-xs">{{ holiday.name }} {{ holiday.surname }}</p>
                        <LifeBuoyIcon v-if="holiday.role === 200" class="text-red" :size="20" />
                        <Cross v-else-if="holiday.role === 100" class="text-dark_green" :size="20" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script lang="ts">
import { ref, watch } from 'vue';
import { ALL_HOLIDAYS } from '@/graphql/holiday.query';
import { GET_USERS } from '@/graphql/user.query';
import { useQuery } from '@vue/apollo-composable';
import type { Iuser } from '@/interfaces/user.interface';
import type { Iholiday } from '@/interfaces/holiday.interface';
import { UserCircle2, LifeBuoyIcon, Cross } from 'lucide-vue-next';

export default {

    components: {
        LifeBuoyIcon,
        UserCircle2,
        Cross
    },

    setup() {
        const { result: usersResult } = useQuery(GET_USERS);
        const { result: holidaysResult } = useQuery(ALL_HOLIDAYS);

        const usersWithFutureHolidaysByDate = ref<Record<string, IuserWithHoliday[]>>({});

        watch([usersResult, holidaysResult], ([usersValue, holidaysValue]) => {
            if (usersValue && holidaysValue) {
                const { users: ArrayUsers } = usersValue;
                const { holidays: Arrayholidays } = holidaysValue;
                fetchAndCombineData(ArrayUsers, Arrayholidays);
            }
        });

        const fetchAndCombineData = (ArrayUsers: Iuser[], Arrayholidays: Iholiday[]) => {
            usersWithFutureHolidaysByDate.value = {};

            const currentDate = new Date();

            ArrayUsers.forEach((itemUser: Iuser) => {
                Arrayholidays.forEach((itemHoliday: Iholiday) => {
                    if (itemUser.uid === itemHoliday.uid) {
                        const futureDates = itemHoliday.dates.filter((date) => new Date(date) >= currentDate);

                        futureDates.forEach((date) => {
                            if (!usersWithFutureHolidaysByDate.value[date]) {
                                usersWithFutureHolidaysByDate.value[date] = [];
                            }

                            usersWithFutureHolidaysByDate.value[date].push({
                                uid: itemUser.uid,
                                name: itemUser.name,
                                surname: itemUser.surname,
                                photoURL: itemUser.photoURL,
                                role: itemUser.role,
                                dates: [date],
                            });
                        });
                    }
                });
            });
        };

        // Sorteer de datums
        const sortedDates = ref<string[]>([]);
        watch(usersWithFutureHolidaysByDate, (newUsersByDate) => {
            sortedDates.value = Object.keys(newUsersByDate).sort();
        });

        // Functie om de datum op een bepaalde manier weer te geven (aan te passen aan je behoeften)
        const formatDate = (date: string) => {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            // @ts-ignore
            return new Date(date).toLocaleDateString('nl-BE', options);
        };

        return {
            usersWithFutureHolidaysByDate,
            sortedDates,
            formatDate,
        };
    },
};
</script>
  