<template>
  <Container>
    <h1 class="text-2xl text-center font-lato font-bold">Dag Kasper, jij moet vandaag <span
        class="text-red">werken</span>!</h1>

    <div
      class="flex flex-col items-center justify-center bg-white font-lato rounded-cardRadius shadow-cardShadow mt-10 h-72 max-w-7xl m-auto">
      <div class="flex flex-row justify-between h-full w-full px-8 py-8">
        <div class="flex flex-col items-center">
          <p class="font-bold">Weersverwachting <span class="text-red">{{ dayOfMonth }} {{ monthName }}</span></p>
          <img class="w-26 mt-8" :src="weatherIcon" alt="My Image" />
        </div>

        <div class="flex flex-row justify-between w-full max-w-[15rem]">
          <div class="flex flex-col">
            <p class="flex flex-col items-center"><span class="font-bold text-red">{{ temperature }}°C</span><span
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

        <div class="flex flex-row">
          <div class="w-[2px] bg-dark_green rounded-md mr-14"></div>

          <div class="flex flex-col items-center justify-center">
            <p>{{ dayOfWeek }} {{ dayOfMonth }} {{ monthName }}</p>
            <p class="font-bold">Knokke-Heist</p>
          </div>

        </div>
      </div>
    </div>

    <div class="flex flex-row justify-between mt-18 max-w-7xl m-auto">
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

      <div class="bg-white w-full max-w-80 min-h-[20rem] h-auto rounded-cardRadius shadow-cardShadow px-6 py-5">
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

      <div class="bg-white w-full max-w-80 min-h-[20rem] h-auto rounded-cardRadius shadow-cardShadow px-6 py-5">
        <p class="text-center mb-8 font-bold text-base mt-2">Verslag {{ dayOfMonth }} {{ monthName }}</p>
        <p class="text-center">Verslag nog niet ingediend</p>
      </div>
    </div>

  </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue'
import weatherIcon from '@/assets/photos/weather.svg'
import UserShown from '@/components/generic/UserShown.vue'
import { ref } from 'vue';

export default {
  components: {
    Container,
    UserShown,
  },

  mounted() {
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.fetchWeather);
    }
  },

  data() {
    return {
      temperature: null,
      windSpeed: null,
      uvIndex: null,
      rainChance: null,
      highTide: "",
      lowTide: "",
    };
  },

  methods: {
    async fetchWeather(position:any) { 
      const { latitude, longitude } = position.coords;
      const apiKey = '56d7b59786ab4edbb85123118232510';
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;
      const marineUrl = `https://api.weatherapi.com/v1/marine.json?key=${apiKey}&q=${latitude},${longitude}`;

      try {
        const response = await fetch(apiUrl);
        const marineRespoinse = await fetch(marineUrl);
        if (response.ok) {
          const data = await response.json();
          const marineData = await marineRespoinse.json();


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

          const tides = marineData.forecast.forecastday[0].day.tides[0].tide;
          console.log("Tides: ", tides);
          const filteredTides = tides.filter((tide:any) => {
            const tideTime = new Date(tide.tide_time);
            return tideTime > checkTime;
           });

          const filteredTideInfo = filteredTides.map((tide: any) => {
            return {
              tide_time: tide.tide_time,
              tide_type: tide.tide_type,
            }
          });

          //Sla value op in hoog of laagwater en pak alleen de tijd
          filteredTideInfo.forEach((tide: any) => {
            const tideTime = new Date(tide.tide_time);
            const formattedTime = `${tideTime.getHours()}:${tideTime.getMinutes()}`
            if (tide.tide_type === "HIGH") {
              this.highTide = formattedTime;
            } else if (tide.tide_type === "LOW") {
              this.lowTide = formattedTime;
            }
          });


          //Set the data
          this.temperature = data.current.temp_c;
          this.windSpeed = data.current.wind_kph;
          this.uvIndex = data.current.uv;
          this.rainChance = data.current.precip_mm || 0;

        } else {
          console.error('Error fetching weather data');
        }
      } catch (error) {
        console.error('Error fetching weather data', error);
      }
    }
  },

  setup() {
    const currentDate = new Date();
    const dayOfWeek = currentDate.toLocaleDateString('nl-NL', { weekday: 'long' }); // Get the day of the week
    const dayOfMonth = currentDate.getDate(); // Get day of the month
    const monthName = currentDate.toLocaleDateString('nl-NL', { month: 'long' }); // Get month name



    return {
      weatherIcon: weatherIcon,
      currentDate,
      dayOfMonth,
      monthName,
      dayOfWeek,
    }
  },


}
</script>