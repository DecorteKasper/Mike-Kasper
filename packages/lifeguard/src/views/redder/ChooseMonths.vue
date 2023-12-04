<template>
    <Container>
        <div class="flex flex-col md:mb-12">
            <h1 class="text-center font-lato font-bold text-lg md:text-xl">
                Beschikbare maanden
            </h1>
            <div class="bg-greenx mt-1 w-[70px] h-[2px] rounded-full m-auto"></div>
        </div>

        <p class="mt-12 mb-2">Maak een keuze van je beschibare maanden:</p>

        <form class="flex flex-column " @submit.prevent="handleSubmit">
            <label class="mt-2">
                <input type="checkbox" value="juni" v-model="checkedCheckboxes" class="mr-1" />
                Juni (15-30 juni)
            </label>

            <label class="mt-2">
                <input type="checkbox" value="juli" v-model="checkedCheckboxes" class="mr-1"/>
                Juli
            </label>

            <label class="mt-2">
                <input type="checkbox" value="augustus" v-model="checkedCheckboxes" class="mr-1"/>
                Augustus
            </label>

            <label class="mt-2">
                <input type="checkbox" value="september" v-model="checkedCheckboxes" class="mr-1"/>
                September (1-15 september)
            </label>

            <button class="mt-10" type="submit">Submit</button>
            <p>{{ errorText }}</p>
        </form>
    </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue';
import { ref } from 'vue';
import PrimaryButton from '@/components/generic/PrimaryButton.vue';
import { useVuelidate } from '@vuelidate/core';
import useFirebase from '@/composables/useFirebase';
import { ADD_MONTH } from '@/graphql/month.mutation';
import type { Imonth } from '@/interfaces/month.interface';
import { addMonths } from 'v-calendar/dist/types/src/utils/date/helpers.js';
import { useMutation } from '@vue/apollo-composable';

export default {
    components: {
        Container,
        PrimaryButton,
    },

    setup() {
        const checkedCheckboxes = ref([]);
        const errorText = ref('');

        const { firebaseUser } = useFirebase()
        const uidUser = firebaseUser.value?.uid
        const { mutate: addMonth } = useMutation<Imonth>(ADD_MONTH);

        const validations = {
            checkedCheckboxes: {
                required: (value: any) => value.length > 0,
            },
        };

        const v$ = useVuelidate(validations, { checkedCheckboxes });

        const handleSubmit = () => {
            if (v$.value.$pending) {
                v$.value.$touch();
                errorText.value = '';
                return;
            }

            // Handle form submission logic here
            if (
                v$.value.checkedCheckboxes.$pending ||
                v$.value.checkedCheckboxes.$invalid
            ) {
                console.log('Form submission failed. Please select at least one checkbox.');
                errorText.value = 'Please select at least one checkbox.';
            } else {
                console.log('Form submitted with checkboxes:', checkedCheckboxes.value);
                errorText.value = '';
                addMonth({
                    createMonthInput: {
                        uid: uidUser,
                        months: checkedCheckboxes.value,
                    }
                })

            }
        };

        return {
            checkedCheckboxes,
            v$,
            handleSubmit,
            errorText,
        };
    },
};
</script>
