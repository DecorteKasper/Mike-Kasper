<template>
    <Container>
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
                    <div class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-2">
                        <img class="w-4 mr-7" :src="uncheck_icon" alt="check">
                        <div class="font-normal"><p><span class="font-bold mr-3">A</span><span>Laura Middelton</span></p></div>
                    </div>
                    <div class="bg-greenx rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <img class="w-4 mr-7" :src="check_icon" alt="check">
                        <div class="font-normal"><p><span class="font-bold mr-3">B</span><span>Amelie Walton</span></p></div>
                    </div>
                    <div class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <img class="w-4 mr-7" :src="uncheck_icon" alt="check">
                        <div class="font-normal"><p><span class="font-bold mr-3">C</span><span>Dean Woodward</span></p></div>
                    </div> 
                    <div class="bg-greenx rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <img class="w-4 mr-7" :src="check_icon" alt="check">
                        <div class="font-normal"><p><span class="font-bold mr-3">D</span><span>Kasper Decorte</span></p></div>
                    </div>
                    <div class="bg-greenx rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <img class="w-4 mr-7" :src="check_icon" alt="check">
                        <div class="font-normal"><p><span class="font-bold mr-3">E</span><span>Sonia Nelson</span></p></div>
                    </div>
                    <div class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <img class="w-4 mr-7" :src="uncheck_icon" alt="check">
                        <div class="font-normal"><p><span class="font-bold mr-3">F</span><span>Logan Norris</span></p></div>
                    </div> 
                    <div class="bg-greenx rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <img class="w-4 mr-7" :src="check_icon" alt="check">
                        <div class="font-normal"><p><span class="font-bold mr-3">G</span><span>Henri Sheppard</span></p></div>
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
                    <div class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-2">
                        <div class="font-normal w-44"><p><span class="font-bold mr-6">A</span><span>Laura Middelton</span></p></div>
                        <div class="w-6 m-auto"><p class="text-greenx">11</p></div>
                        <div class="w-6 pl-3 m-auto"><p class="text-red">19</p></div>
                    </div>
                    <div class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <div class="font-normal w-44"><p><span class="font-bold mr-6">B</span><span>Amelie Walton</span></p></div>
                        <div class="w-6 m-auto"><p class="text-greenx">11</p></div>
                        <div class="w-6 pl-3 m-auto"><p class="text-red">19</p></div>
                    </div>
                    <div class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <div class="font-normal w-44"><p><span class="font-bold mr-6">C</span><span>Dean Woodward</span></p></div>
                        <div class="w-6 m-auto"><p class="text-greenx">11</p></div>
                        <div class="w-6 pl-3 m-auto"><p class="text-red">19</p></div>
                    </div>
                    <div class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <div class="font-normal w-44"><p><span class="font-bold mr-6">D</span><span>Kasper Decorte</span></p></div>
                        <div class="w-6 m-auto"><p class="text-greenx">10</p></div>
                        <div class="w-6 pl-3 m-auto"><p class="text-red">20</p></div>
                    </div>
                    <div class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <div class="font-normal w-44"><p><span class="font-bold mr-6">E</span><span>Sonia Nelson</span></p></div>
                        <div class="w-6 m-auto"><p class="text-greenx">10</p></div>
                        <div class="w-6 pl-3 m-auto"><p class="text-red">20</p></div>
                    </div>
                    <div class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <div class="font-normal w-44"><p><span class="font-bold mr-6">F</span><span>Logan Norris</span></p></div>
                        <div class="w-6 m-auto"><p class="text-greenx">9</p></div>
                        <div class="w-6 pl-3 m-auto"><p class="text-red">21</p></div>
                    </div>
                    <div class="bg-gray rounded-full px-4 py-2 text-sm flex flex-row mt-4">
                        <div class="font-normal w-44"><p><span class="font-bold mr-6">G</span><span>Henri Sheppard</span></p></div>
                        <div class="w-6 m-auto"><p class="text-greenx">9</p></div>
                        <div class="w-6 pl-3 m-auto"><p class="text-red">21</p></div>
                    </div>
                </div>
            </div>  
        </div>

        <section class="font-lato mt-16 lg:mt-36">
            <div>
                <h1 class="text-center text-lg font-bold">Persoonlijke verlofdagen</h1>
                <div class="h-[2px] w-20 bg-green m-auto mt-1 rounded-full"></div>
            </div>

            <div class="bg-white w-full h-auto rounded-cardRadius shadow-cardShadow px-6 py-7 mt-6 mb-6 lg:max-w-5xl m-auto">
                <Calendar borderless expanded :attributes='attrs' :min-date="new Date()"/>
            </div>
        </section>
    </Container>
</template>



<script lang="ts">
import Container from '@/components/generic/Container.vue'
import check_icon from '@/assets/icons/checked.svg'
import uncheck_icon from '@/assets/icons/unchecked.svg'
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import { Attribute } from 'v-calendar/dist/types/src/utils/attribute.js';
import { ref } from 'vue';


export default {
    components: {
        Container,
        Calendar,
        DatePicker,
    },

    data() {
        return {
            check_icon,
            uncheck_icon,
            currentDate: new Date(),
            date: new Date(),
        }
    },

    computed: {
        currentDateString() {
            const months = [
                'januari', 'februari', 'maart', 'april', 'mei', 'juni',
                'juli', 'augustus', 'september', 'oktober', 'november', 'december'
            ];

            const day = this.currentDate.getDate();
            const month = months[this.currentDate.getMonth()];

            return `${day} ${month}`;
        },
    },

    methods: {
        showPreviousDay() {
            console.log('previous day')
            const newDate = new Date(this.currentDate);
            newDate.setDate(this.currentDate.getDate() - 1);
            this.currentDate = newDate;
        },

        showNextDay() {
            const newDate = new Date(this.currentDate);
            newDate.setDate(this.currentDate.getDate() + 1);
            this.currentDate = newDate;
        }
    },

    setup() {
        const attrs = ref([
          {
            key: 'today',
            highlight: {
                    color: 'blue',
                    fillMode: 'outline',
                },
            dates: new Date(),
            },
            {
                key: 'Not working',
                highlight: {
                    color: 'red',
                    fillMode: 'light',
                },
                dates: [
                    new Date(2023, 10, 2),
                    new Date(2023, 10, 8),
                    new Date(2023, 10, 17),
                    new Date(2023, 10, 23),
                    new Date(2023, 10, 24),
                    new Date(2023, 10, 25),
                    new Date(2023, 10, 12),
                    new Date(2023, 10, 13),
                    new Date(2023, 10, 28),
                ],
            },
        ]);

        return {
          attrs,
        };
    },


}
</script>