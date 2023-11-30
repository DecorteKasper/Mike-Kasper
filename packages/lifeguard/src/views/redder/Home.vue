<template>
  <Container>
    <h1 class="text-2xl text-center font-lato font-bold">Dag {{ nameUser }}, jij moet vandaag <span class="text-red">werken</span>!</h1>
    <div class="flex flex-col items-center justify-center bg-white font-lato rounded-cardRadius shadow-cardShadow mt-10 h-full md:h-72 max-w-7xl m-auto">
      <div class="flex flex-col md:flex-row items-center justify-between h-full w-full px-8 py-8">
        <div class="flex flex-col items-center">
          <p class="font-bold">Weersverwachting <span class="text-red">{{ dayOfMonth }} {{ monthName }}</span></p>
          <img class="w-26 mt-2 md:mt-8" :src="weatherIconUrl" alt="Icon van het weer" />
        </div>

        <div class="flex flex-row justify-between w-full max-w-[15rem] items-center">
          <div class="flex flex-col">
            <p class="flex flex-col items-center"><span class="font-bold text-red">{{ temperature }} °C</span><span
                class="text-xs">Temperatuur</span></p>
            <p class="flex flex-col items-center mt-8"><span class="font-bold text-red">{{ windSpeed }} km/h</span><span
                class="text-xs">Windsnelheid</span></p>
            <p class="flex flex-col items-center mt-8"><span class="font-bold text-red">{{ highTide }}</span><span
                class="text-xs">Hoogwater</span></p>
          </div>
          <div class="flex flex-col">
            <p class="flex flex-col items-center"><span class="font-bold text-red">{{ uvIndex }}</span><span
                class="text-xs">UV-index</span></p>
            <p class="flex flex-col items-center mt-8"><span class="font-bold text-red">{{ rainChance }} %</span><span
                class="text-xs">Neerslag</span></p>
            <p class="flex flex-col items-center mt-8"><span class="font-bold text-red">{{ lowTide }}</span><span
                class="text-xs">Laagwater</span></p>
          </div>
        </div>

        <div class="flex flex-col md:flex-row md:mt-0">
          <div class="w-20 h-[2px] md:w-[2px] md:h-28 m-auto bg-dark_green rounded-md mb-3 md:mb-0 md:mr-14"></div>

          <div class="flex flex-col items-center justify-center">
            <p>{{ dayOfWeek }} {{ dayOfMonth }} {{ monthName }}</p>
            <p class="font-bold">Knokke-Heist</p>
          </div>

        </div>
      </div>
    </div>

    <div class="flex flex-col md:flex-row items-center md:items-baseline justify-between mt-10 md:mt-18 max-w-7xl m-auto">
      <div class="bg-white w-full max-w-80 min-h-[20rem] h-auto rounded-cardRadius shadow-cardShadow px-6 py-5">
        <p class="text-center mb-8 font-bold text-base mt-2">Aanwezigen {{ dayOfMonth }} {{ monthName }}</p>
        <div class="flex flex-col">
          <p>Redders</p>
          <div class="w-full h-[2px] rounded-lg bg-red mb-6 mt-1"></div>
          <UserShown />
          <UserShown />
          <UserShown />
          <UserShown />
        </div>
        <div class="flex flex-col mt-9">
          <p>EHBO</p>
          <div class="w-full h-[2px] rounded-lg bg-green mb-6 mt-1"></div>
          <UserShown />
        </div>
      </div>

      <div class="bg-white w-full max-w-80 min-h-[20rem] h-auto mt-10 md:mt-0 rounded-cardRadius shadow-cardShadow px-6 py-5">
        <p class="text-center mb-8 font-bold text-base mt-2">Verlofdagen</p>
        <div class="overflow-scroll max-h-96">
          <div class="flex flex-col">
            <p>01/07/2024</p>
            <div class="w-full h-[2px] rounded-lg bg-dark_green mb-6 mt-1"></div>
            <UserShown />
            <UserShown />
            <UserShown />
          </div>
          <div class="flex flex-col mt-9">
            <p>02/07/2024</p>
            <div class="w-full h-[2px] rounded-lg bg-dark_green mb-6 mt-1"></div>
            <UserShown />
            <UserShown />
            <UserShown />
          </div>
        </div>
      </div>

      <div class="bg-white w-full max-w-80 min-h-[20rem] mt-10 md:mt-0 h-auto rounded-cardRadius shadow-cardShadow px-6 py-5">
        <p class="text-center mb-8 font-bold text-base mt-2">Verslag {{ dayOfMonth }} {{ monthName }}</p>
        <p class="text-center md:mt-12">{{ reportInfo }}</p>
        <img class="max-w-[5rem] m-auto mt-4" v-if="reportInfo === 'Verslag is nog niet ingediend'" src="@/assets/icons/errorReport.svg" alt="Not Submitted Icon" />
        <img class="max-w-[5rem] m-auto mt-4" v-else src="@/assets/icons/checkReport.svg" alt="Submitted Icon" />
        <button @click="goToReport" class="bg-greenx mt-10 px-8 py-2 rounded-lg text-white font-bold block m-auto hover:bg-dark_green" v-if="reportInfo === 'Verslag is nog niet ingediend'">Verslag invullen</button>
      </div>
    </div>

  </Container>
</template>


<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import Container from '@/components/generic/Container.vue';
import weatherIcon from '@/assets/photos/weather.svg';
import UserShown from '@/components/generic/UserShown.vue';
import { GET_USER_BY_UID } from '@/graphql/user.query';
import useFirebase from '@/composables/useFirebase';
import { useQuery } from '@vue/apollo-composable';
import { ALL_HOLIDAYS } from '@/graphql/holiday.query';
import type { Iholiday } from '@/interfaces/holiday.interface';
import { ALL_RECORDS } from '@/graphql/report.query';
import type { Ireport } from '@/interfaces/report.interface';
import { useRouter } from 'vue-router';

interface User {
  name: string;
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
    const holidays = ref<Iholiday[] | null>(null);
    const reports = ref<Ireport[] | null>(null);
    const todayReports = ref<Ireport[] | null>(null);
    const temperature = ref("--");
    const windSpeed = ref("--");
    const uvIndex = ref("-");
    const rainChance = ref("--");
    const highTide = ref("--:--");
    const lowTide = ref("--:--");
    const weatherIconUrl = ref("");
    const reportInfo = ref("");
    const nameUser = ref("redder");
    //const weatherIcon:any = weatherIcon;
    
    const { loading: userLoading, result: user, error: userError } = useQuery(GET_USER_BY_UID, {uid: firebaseUser.value?.uid,});
    const { loading: holidaysLoading, result: holidaysResult, error: holidaysError } = useQuery<{ holidays: Iholiday[] }>(ALL_HOLIDAYS);;
    const { loading: reportsLoading, result: reportsResult, error: reportsError } = useQuery<{ reports: Ireport[] }>(ALL_RECORDS);
    
//----- WATCH FUNTIONS -----//
    //Holiday
    watch(() => holidaysResult.value, (newValue) => {
      if (newValue && newValue.holidays) {
        holidays.value = newValue.holidays;
      }
    });

    //Reports
    watch(() => reportsResult.value, (newValue) => {
      if (newValue && newValue.reports) {
        reports.value = newValue.reports;
        // Filter reports that have createdAt date equal to today
        const today = new Date().toISOString().split('T')[0];
        todayReports.value = reports.value.filter((report) => report.createdAt.startsWith(today));

        if (todayReports.value?.length === 0) {
          reportInfo.value = "Verslag is nog niet ingediend";
        } else {
          reportInfo.value = "Verslag is ingediend";
        }
      }
    });

    //User
    watch(user, (newValue) => {
      if (newValue && newValue.userByUid) {
        userData.value = newValue.userByUid;
        nameUser.value = user.value?.userByUid.name;
      }
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
      // Navigate to the specific page
      router.push('/redder/report'); // Update this with your actual page path
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
    };
  },
});
</script>
