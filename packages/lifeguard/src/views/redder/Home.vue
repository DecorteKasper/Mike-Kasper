<template>
  <Container>
    <h1 class="text-2xl text-center font-lato font-bold">Dag Kasper, jij moet vandaag <span
        class="text-red">werken</span>!</h1>

    <div
      class="flex flex-col items-center justify-center bg-white font-lato rounded-lg drop-shadow-xl mt-10 h-72 max-w-7xl m-auto">
      <div class="flex flex-row justify-between h-full w-full px-8 py-8">
        <div class="flex flex-col items-center">
          <p class="font-bold">Weersverwachting <span class="text-red">15 juli</span></p>
          <img class="w-26 mt-8" :src="weatherIcon" alt="My Image" />
        </div>

        <div class="flex flex-row justify-between w-full max-w-[15rem]">
          <div class="flex flex-col">
            <p class="flex flex-col items-center"><span class="font-bold text-red">23°C</span><span
                class="text-xs">Temperatuur</span></p>
            <p class="flex flex-col items-center mt-8"><span class="font-bold text-red">23 km/h</span><span
                class="text-xs">Windsnelheid</span></p>
            <p class="flex flex-col items-center mt-8"><span class="font-bold text-red">12:38</span><span
                class="text-xs">Hoogwater</span></p>
          </div>
          <div class="flex flex-col">
            <p class="flex flex-col items-center"><span class="font-bold text-red">6</span><span
                class="text-xs">UV-index</span></p>
            <p class="flex flex-col items-center mt-8"><span class="font-bold text-red">12%</span><span
                class="text-xs">Neerslag</span></p>
            <p class="flex flex-col items-center mt-8"><span class="font-bold text-red">18:52</span><span
                class="text-xs">Laagwater</span></p>
          </div>
        </div>

        <div class="flex flex-row">
          <div class="w-[2px] bg-dark_green rounded-md mr-14"></div>

          <div class="flex flex-col items-center justify-center">
            <p>Vrijdag 14 juli</p>
            <p class="font-bold">Knokke-Heist</p>
          </div>

        </div>
      </div>
    </div>

    <div class="flex flex-row justify-between mt-18 max-w-7xl m-auto">
      <div class="bg-white w-full max-w-80 min-h-[20rem] h-auto rounded-lg drop-shadow-xl px-6 py-5">
        <p class="text-center mb-8 font-bold text-base mt-2">Aanwezigen 15 juli</p>
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

      <div class="bg-white w-full max-w-80 min-h-[20rem] h-auto rounded-lg drop-shadow-xl px-6 py-5">
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

      <div class="bg-white w-full max-w-80 min-h-[20rem] h-auto rounded-lg drop-shadow-xl px-6 py-5">
        <p class="text-center mb-8 font-bold text-base mt-2">Verslag 14 juli</p>
        <p class="text-center">Verslag nog niet ingediend</p>
      </div>
    </div>

  </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue'
import weatherIcon from '@/assets/photos/weather.svg'
import UserShown from '@/components/generic/UserShown.vue'

export default {
  components: {
    Container,
    UserShown,
  },

  setup() {
    return {
      weatherIcon: weatherIcon,
    }
  },


}
</script>