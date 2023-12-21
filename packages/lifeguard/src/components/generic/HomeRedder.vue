<template>
    <Container>
        <h1 class="text-2xl text-center font-lato font-bold">Dag {{ nameUser }}, jij moet vandaag <span
                class="text-red">werken</span>!</h1>
        <div
            class="flex flex-col items-center justify-center bg-white font-lato rounded-cardRadius shadow-cardShadow mt-10 h-full md:h-72 max-w-7xl m-auto">
            <div class="flex flex-col md:flex-row items-center justify-between h-full w-full px-8 py-8">
                <div class="flex flex-col items-center">
                    <p class="font-bold">Weersverwachting <span class="text-red">{{ dayOfMonth }} {{ monthName }}</span></p>
                    <img class="w-26 mt-2 md:mt-8" :src="weatherIconUrl" alt="Icon van het weer" />
                </div>

                <div class="flex flex-row justify-between w-full max-w-[15rem] items-center">
                    <div class="flex flex-col">
                        <p class="flex flex-col items-center"><span class="font-bold text-red text-base mb-1">{{ temperature
                        }} °C</span><span class="text-xs">Temperatuur</span></p>
                        <p class="flex flex-col items-center mt-8"><span class="font-bold text-red text-base mb-1">{{
                            windSpeed }} km/h</span><span class="text-xs">Windsnelheid</span></p>
                        <p class="flex flex-col items-center mt-8"><span class="font-bold text-red text-base mb-1">{{
                            windRichting }}</span><span class="text-xs">Windrichting</span></p>
                        <!--<p class="flex flex-col items-center mt-8"><span class="font-bold text-red">{{ highTide }}</span><span
                  class="text-xs">Hoogwater</span></p>-->
                    </div>
                    <div class="flex flex-col ">
                        <p class="flex flex-col items-center"><span class="font-bold text-red text-base mb-1">{{ uvIndex
                        }}</span><span class="text-xs">UV-index</span></p>
                        <p class="flex flex-col items-center mt-8"><span class="font-bold text-red text-base mb-1">{{
                            rainChance }} %</span><span class="text-xs">Neerslag</span></p>
                        <p class="flex flex-col items-center mt-8"><span class="font-bold text-red text-base mb-1">{{
                            zichtbaarheid }} km</span><span class="text-xs">Zichtbaarheid</span></p>
                        <!-- <p class="flex flex-col items-center mt-8"><span class="font-bold text-red">{{ lowTide }}</span><span
                class="text-xs">Laagwater</span></p> -->
                    </div>
                </div>

                <div class="flex flex-col md:flex-row md:mt-0 mt-6">
                    <div class="w-20 h-[2px] md:w-[2px] md:h-28 m-auto bg-dark_green rounded-md mb-3 md:mb-0 md:mr-14">
                    </div>

                    <div class="flex flex-col items-center justify-center">
                        <p>{{ dayOfWeek }} {{ dayOfMonth }} {{ monthName }}</p>
                        <p class="font-bold">{{ currentUserSeasideTown }}</p>
                    </div>

                </div>
            </div>
        </div>

        <div
            class="flex flex-col md:flex-row items-center md:items-baseline justify-between mt-10 md:mt-18 max-w-7xl m-auto">
            <div class="bg-white w-full max-w-80 min-h-[20rem] h-auto rounded-cardRadius shadow-cardShadow px-6 py-5">
                <p class="text-center mb-8 font-bold text-base mt-2">Aanwezigen {{ dayOfMonth }} {{ monthName }}</p>
                <div class="overflow-scroll max-h-96">
                    <div class="flex flex-col">
                        <p>Redders</p>
                        <div class="w-full h-[2px] rounded-lg bg-red mb-6 mt-1"></div>
                        <template v-for="(name, index) in namesOfUsersWithoutHolidayToday" :key="index">
                            <UserShown :name="name" />
                        </template>
                    </div>
                    <div class="flex flex-col mt-9">
                        <p>EHBO</p>
                        <div class="w-full h-[2px] rounded-lg bg-greenx mb-6 mt-1"></div>
                        <!-- <UserShown /> -->
                        <template v-for="(name, index) in namesOfUsersWithoutHolidayTodayEHBO" :key="index">
                            <UserShown :name="name" />
                        </template>
                    </div>
                </div>
            </div>

            <div
                class="bg-white w-full max-w-80 min-h-[30rem] h-auto mt-10 md:mt-0 rounded-cardRadius shadow-cardShadow px-6 py-5">
                <p class="text-center mb-2 font-bold text-base mt-2">Verlofdagen</p>
                <div class="overflow-scroll max-h-96">
                    <div v-for="(group, index) in holidaysFormatted" :key="index" class="flex flex-col">
                        <p class="mt-6">{{ new Date(group.date).toISOString().split('T')[0].split('-').reverse().join('/')
                        }}</p>
                        <div class="w-full h-[2px] rounded-lg bg-dark_green mb-4 mt-1"></div>
                        <UserShown v-for="user in group.users" :key="user.uid" :name="`${user.name}`" />
                        <!-- <UserShown v-for="user in group.users" :key="user.uid" :name = "`${user.name} ${user.surname}`"/> -->
                    </div>
                </div>
            </div>

            <div
                class="bg-white w-full max-w-80 min-h-[20rem] mt-10 md:mt-0 h-auto rounded-cardRadius shadow-cardShadow px-6 py-5">
                <p class="text-center mb-8 font-bold text-base mt-2">Verslag {{ dayOfMonth }} {{ monthName }}</p>
                <p class="text-center md:mt-12">{{ reportInfo }}</p>
                <img class="max-w-[5rem] m-auto mt-4" v-if="reportInfo === 'Dagverslag is nog niet ingediend'"
                    src="@/assets/icons/errorReport.svg" alt="Not Submitted Icon" />
                <img class="max-w-[5rem] m-auto mt-4" v-else src="@/assets/icons/checkReport.svg" alt="Submitted Icon" />
                <button @click="goToReport"
                    class="bg-greenx mt-10 px-8 py-2 rounded-lg text-white font-bold block m-auto hover:bg-dark_green"
                    v-if="reportInfo === 'Dagverslag is nog niet ingediend'">Verslag invullen</button>
            </div>
        </div>

    </Container>
</template>


<script lang="ts">
import { defineComponent, ref, watch, onBeforeMount, onMounted } from 'vue';
import Container from '@/components/generic/Container.vue';
import weatherIcon from '@/assets/photos/weather.svg';
import UserShown from '@/components/generic/UserShown.vue';
import { GET_USER_BY_UID } from '@/graphql/user.query';
import useFirebase from '@/composables/useFirebase';
import { useQuery } from '@vue/apollo-composable';
import { useRouter } from 'vue-router';
import { ALL_HOLIDAYS } from '@/graphql/holiday.query';
import { ALL_RECORDS } from '@/graphql/report.query';
import { ALL_POSTEN } from '@/graphql/post.query';
import { GET_USERS } from '@/graphql/user.query';
import { GET_POST_BY_NUMBER } from '@/graphql/post.query';
import type { Ipost } from '@/interfaces/post.interface';
import type { Iholiday } from '@/interfaces/holiday.interface';
import type { Ireport } from '@/interfaces/report.interface';

interface User {
    name: string;
    uid: string;
    surname?: string;
}

export default defineComponent({
    components: {
        Container,
        UserShown,
    },

    setup() {
        const currentDate = new Date();
        const dayOfWeek = currentDate.toLocaleDateString('nl-NL', { weekday: 'long' });
        const dayOfMonth = currentDate.getDate();
        const monthName = currentDate.toLocaleDateString('nl-NL', { month: 'long' });
        const { firebaseUser } = useFirebase();
        const router = useRouter();

        const userData = ref<User | null>();
        const currentUserUid = firebaseUser.value?.uid;
        const currentUserPost = ref<number>(4);
        const holidays = ref<Iholiday[] | null>(null);
        const holidaysFormatted = ref<{ date: string; users: { name: string; uid: string }[] }[] | null>(null);
        const namesOfUsersWithoutHolidayToday = ref<string[] | null>(null);
        const namesOfUsersWithoutHolidayTodayEHBO = ref<string[] | null>(null);

        const reports = ref<Ireport[] | null>(null);
        const todayReports = ref<Ireport[] | null>(null);
        const temperature = ref("--");
        const windSpeed = ref("--");
        const uvIndex = ref("-");
        const rainChance = ref("--");
        const highTide = ref("--:--");
        const lowTide = ref("--:--");
        const windRichting = ref("--");
        const zichtbaarheid = ref("--");
        const weatherIconUrl = ref("");
        const reportInfo = ref("");
        const nameUser = ref("redder");
        const currentUserSeasideTown = ref("Badplaats");

        const { loading: userLoading, result: user, error: userError } = useQuery(GET_USER_BY_UID, { uid: firebaseUser.value?.uid, });
        const { loading: holidaysLoading, result: holidaysResult, error: holidaysError } = useQuery<{ holidays: Iholiday[] }>(ALL_HOLIDAYS);;
        const { loading: reportsLoading, result: reportsResult, error: reportsError } = useQuery<{ reports: Ireport[] }>(ALL_RECORDS);
        // const { loading: postLoading, result: postResult, error: postError } = useQuery(GET_POST_BY_NUMBER, { numberPost: currentUserPost });
        const { loading: postenLoading, result: postenResult, error: postenError } = useQuery<{ posten: Ipost[] }>(ALL_POSTEN);
        const { loading: usersLoading, result: usersResult, error: usersError } = useQuery<{ users: User[] }>(GET_USERS);





        //Postnummer van current user
        watch([() => currentUserUid, postenResult], ([newUid, newValue]) => {
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

        //----- WATCH FUNTIONS -----//
        //Holidays of the post
        const processHolidayData = () => {
            if (usersResult.value && usersResult.value.users && postResult.value && postResult.value.postByNumber && holidaysResult.value && holidaysResult.value.holidays) {
                const users = usersResult.value.users as User[];
                const post = postResult.value.postByNumber as Ipost;
                const holidaysData = holidaysResult.value.holidays;

                const postUIDs = [
                    post.uidRedderA,
                    post.uidRedderB,
                    post.uidRedderC,
                    post.uidRedderD,
                    post.uidRedderE,
                    post.uidRedderF,
                    post.uidRedderG,
                ];

                const holidaysFormattedArray = (holidaysData ?? [])
                    .filter((holiday) => postUIDs.includes(holiday.uid))
                    .flatMap((holiday) =>
                        holiday.dates.map((date) => ({
                            date,
                            user: users.find((user) => user.uid === holiday.uid),
                        }))
                    );


                const groupedHolidays = holidaysFormattedArray.reduce((acc, holiday) => {
                    const { date, user } = holiday;
                    const existingHolidays = acc.get(date) || [];
                    acc.set(date, [...existingHolidays, user].filter(Boolean));
                    return acc;
                }, new Map<string, (User | undefined)[]>());


                holidaysFormatted.value = Array.from(groupedHolidays.entries()).map(([date, users]) => ({
                    date,
                    users: users.filter(Boolean) as User[],
                }));


                holidaysFormatted.value = holidaysFormatted.value
                    .slice()
                    .sort((a, b) => {
                        const dateA = new Date(a.date).getTime();
                        const dateB = new Date(b.date).getTime();
                        return dateA - dateB;
                    });
            }
        };
        watch([usersResult, postResult, holidaysResult], () => { processHolidayData(); });


        //redders tonen die moeten werken
        const processUserData = () => {
            if (
                usersResult.value &&
                usersResult.value.users &&
                postResult.value &&
                postResult.value.postByNumber &&
                holidaysResult.value &&
                holidaysResult.value.holidays
            ) {
                const users = usersResult.value.users as User[];
                const post = postResult.value.postByNumber as Ipost;
                const holidaysData = holidaysResult.value.holidays;

                // Get the current date
                const today = new Date().toISOString().split('T')[0];

                // Get the UIDs of users in the current post
                const postUIDs = [
                    post.uidRedderA,
                    post.uidRedderB,
                    post.uidRedderC,
                    post.uidRedderD,
                    post.uidRedderE,
                    post.uidRedderF,
                    post.uidRedderG,
                ];
                const postUIDsEHBO = [
                    post.uidRedderH,
                ];


                // Get the users who have a holiday today
                const usersWithHolidayToday = users.filter((user) =>
                    holidaysData.some(
                        (holiday) =>
                            postUIDs.includes(holiday.uid) &&
                            holiday.dates.some((date) => date.split('T')[0] === today) &&
                            holiday.uid === user.uid
                    )
                );
                const usersWithHolidayTodayEHBO = users.filter((user) =>
                    holidaysData.some(
                        (holiday) =>
                            postUIDsEHBO.includes(holiday.uid) &&
                            holiday.dates.some((date) => date.split('T')[0] === today) &&
                            holiday.uid === user.uid
                    )
                );

                // Get the names of users who don't have a holiday today
                const usersWithoutHolidayToday = users.filter(
                    (user) =>
                        !usersWithHolidayToday.some((userWithHoliday) => userWithHoliday.uid === user.uid) &&
                        postUIDs.includes(user.uid)
                );
                const usersWithoutHolidayTodayEHBO = users.filter(
                    (user) =>
                        !usersWithHolidayTodayEHBO.some((userWithHoliday) => userWithHoliday.uid === user.uid) &&
                        postUIDsEHBO.includes(user.uid)
                );

                // Get an array of names of users without holiday today
                namesOfUsersWithoutHolidayToday.value = usersWithoutHolidayToday.map(
                    (user) => `${user.name} ${user.surname}`
                );
                namesOfUsersWithoutHolidayTodayEHBO.value = usersWithoutHolidayTodayEHBO.map(
                    (user) => `${user.name} ${user.surname}`
                );
            }
        };
        watch([usersResult, postResult, holidaysResult], processUserData);


        //Reports
        const processReports = () => {
            if (reportsResult.value && reportsResult.value.reports) {
                reports.value = reportsResult.value.reports;

                // Filter reports that have createdAt date equal to today
                const today = new Date().toISOString().split('T')[0];
                todayReports.value = reports.value.filter((report) => report.createdAt.startsWith(today));

                if (todayReports.value?.length === 0) {
                    reportInfo.value = "Dagverslag is nog niet ingediend";
                } else {
                    reportInfo.value = "Dagverslag is ingediend";
                }
            }
        };
        watch(reportsResult, processReports);



        //Current User
        watch(user, (newValue) => {
            if (newValue && newValue.userByUid) {
                userData.value = newValue.userByUid;
                nameUser.value = user.value?.userByUid.name;
            }
        });
        if (user) {
            nameUser.value = user.value?.userByUid.name;
            currentUserSeasideTown.value = user.value?.userByUid.bathingPlace;
        }

        console.log("Current user seaside town: ", currentUserSeasideTown.value);


        onMounted(() => {
            processReports();
            processUserData();
            processHolidayData();
        });




        //----- OTHER FUNTIONS -----//  
        //Get weather from API
        const fetchWeather = async (position: any) => {
            const { latitude, longitude } = position.coords;
            const apiKey = 'cc553388ef0a44f0a9f142826232811';
            const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
            const marineUrl = `https://api.weatherapi.com/v1/marine.json?key=${apiKey}&q=${latitude},${longitude}`;

            try {
                const response = await fetch(apiUrl);
                const marineResponse = await fetch(marineUrl);

                if (response.ok && marineResponse.ok) {
                    const data = await response.json();
                    const marineData = await marineResponse.json();

                    const weatherIconUrlValue = marineData.forecast.forecastday[0].day.condition.icon;
                    weatherIconUrl.value = `https:${weatherIconUrlValue}`;

                    // Filter the tide times after 10:30
                    function formatCurrentTime() {
                        const now = new Date();
                        const year = now.getFullYear();
                        const month = String(now.getMonth() + 1).padStart(2, '0');
                        const day = String(now.getDate()).padStart(2, '0');
                        const formattedTime = new Date(`${year}-${month}-${day} 10:30`);
                        return formattedTime;
                    }
                    const checkTime = formatCurrentTime();

                    // const tides = marineData.forecast.forecastday[0].day.tides[0].tide;
                    // console.log("Tides: ", tides);
                    // const filteredTides = tides.filter((tide: any) => {
                    //   const tideTime = new Date(tide.tide_time);
                    //   return tideTime > checkTime;
                    // });

                    // console.log("Filtered tides: ", filteredTides);
                    //console.log(marineData.forecast.forecastday[0].day)



                    temperature.value = data.current.temp_c;
                    windSpeed.value = data.current.wind_kph;
                    uvIndex.value = data.current.uv;
                    rainChance.value = data.current.precip_mm || 0;
                    windRichting.value = data.current.wind_dir;
                    zichtbaarheid.value = data.current.vis_km;
                } else {
                    console.error('Error fetching weather data');
                }
            } catch (error) {
                console.error('Error fetching weather data', error);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(fetchWeather);
        }

        //Ga naar pagina
        const goToReport = () => {
            router.push('/redder/report');
        };

        return {
            weatherIcon,
            currentDate,
            dayOfMonth,
            monthName,
            dayOfWeek,
            userData,
            temperature,
            windSpeed,
            uvIndex,
            rainChance,
            highTide,
            lowTide,
            weatherIconUrl,
            nameUser,
            holidays,
            reports,
            reportInfo,
            goToReport,
            holidaysFormatted,
            currentUserUid,
            currentUserPost,
            namesOfUsersWithoutHolidayToday,
            namesOfUsersWithoutHolidayTodayEHBO,
            currentUserSeasideTown,
            windRichting,
            zichtbaarheid,
        };
    },
});
</script>
