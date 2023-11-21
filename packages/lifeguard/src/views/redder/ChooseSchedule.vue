<template>
    <Container>
        <div class="flex flex-col">
            <h1 class="text-center font-lato font-bold text-lg">Keuze verlofdagen</h1>
            <div class="bg-greenx mt-1 w-[70px] h-[2px] rounded-full m-auto"></div>
        </div>
        <p class="mt-10">U heeft nog <span class="text-redx font-semibold">{{ overigeVerlofDagen }}</span> te verdelen</p>
        <div class="bg-white w-full h-auto rounded-cardRadius shadow-cardShadow px-6 py-7 mt-3 lg:max-w-5xl m-auto">
            <Calendar 
                borderless
                expanded
                :attributes="attributes" 
                @dayclick="onDayClick" />
        </div>

         <ul>
              <li v-for="selectedDate in days" :key="selectedDate.id">{{ formatDate(selectedDate.date) }}</li>
          </ul>
    </Container>
</template>


<script lang="ts">
import Container from '@/components/generic/Container.vue';
import { ref, computed } from 'vue';
import { Calendar, DatePicker } from 'v-calendar';
import 'v-calendar/style.css';


export default {
    components: {
        Container,
        Calendar
    },

    

    setup() {
        // Define a type for the 'days' array
        const days = ref<Array<{ id: number; date: string }>>([]);
        const overigeVerlofDagen = ref<number>(0);

        // Define computed properties using computed()
        const dates = computed(() => days.value.map(day => day.date));
        const attributes = computed(() => dates.value.map(date => ({
            highlight: true,
            dates: date,
        })));

        // Define methods
        const onDayClick = (day: { id: number; date: string }) => {
            const maxSelectedDates = 5;
            const selectedDatesCount = days.value.length;
            // const overigeVerlofDagen = (maxSelectedDates-1) - selectedDatesCount;
            // console.log("Overige dates:", overigeVerlofDagen);

            if (selectedDatesCount < maxSelectedDates || isSelected(day)) {
                const dayDate = new Date(day.date);
                const dayDateString = dayDate.toLocaleDateString();

                overigeVerlofDagen.value = (maxSelectedDates - 1) - selectedDatesCount;
                console.log("Overige dates:", overigeVerlofDagen.value);

                const idx = days.value.findIndex(d => {
                    const currentDate = new Date(d.date);
                    const currentDateString = currentDate.toLocaleDateString();

                    return d.id === day.id && currentDateString === dayDateString;
                });

                if (idx >= 0) {
                    // If the date is already selected, remove it
                    days.value.splice(idx, 1);
                } else {
                    // If the limit is not reached, add the selected date
                    days.value.push({
                        id: day.id,
                        date: day.date,
                    });
                }
            } else {
                // Remove the last selected date to allow unselecting
                days.value.pop();
                console.log('Maximum number of dates reached. Unselecting the latest date.');
            }
       };
        const isSelected = (day: { id: number; date: string }) => {
            return days.value.some(d => d.id === day.id && d.date === day.date);
        };

        const formatDate = (dateString:any) => {
            const date = new Date(dateString);
            const options = { weekday: 'short', day: 'numeric', month: 'numeric', year: 'numeric' };
            return date.toLocaleDateString('nl-NL', options);
        };

        // Return the properties and methods
        return {
            days,
            dates,
            attributes,
            formatDate,
            onDayClick,
            overigeVerlofDagen,
        };
    },
}
</script>