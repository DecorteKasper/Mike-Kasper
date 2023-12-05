<template>
    <Container>
        <div class="flex flex-col md:mb-12 font-lato">
            <h1 class="text-center font-lato font-bold text-lg md:text-xl">
                Beschikbare maanden
            </h1>
            <div class="bg-greenx mt-1 w-[70px] h-[2px] rounded-full m-auto"></div>
        </div>

        <p class="mt-12 mb-2 font-lato md:text-center">Maak keuze van je beschikbare maanden:</p>

        <form class="flex flex-column font-lato" @submit.prevent="handleSubmit">
            <div class="md:m-auto">
            <div v-for="item in checkboxes" :key="item.value">
                    <label class="mt-2 inline-flex items-center cursor-pointer">
                        <span class="relative inline-block w-5 h-5 border-2 border-gray-400 bg-white rounded transition-colors duration-300 ease-in-out mr-4">
                            <input type="checkbox" :value="item.value" v-model="checkedCheckboxes" class="absolute opacity-0 w-0 h-0"/>
                            <span v-if="checkedCheckboxes.includes(item.value)" class="absolute inset-0 bg-greenx rounded transition-opacity duration-300 ease-in-out">
                                <span class="block -mt-1 ml-[1px] text-white">&#x2714;</span>
                            </span>
                        </span>
                        {{ item.label  }}
                    </label>
                </div>
            </div>

            <div class="mt-12">
                <p class="text-redx text-sm md:text-center">{{ errorText }}</p>
               <button class="mt-2 bg-greenx text-white font-bold font-lato rounded-lg py-2 w-[17rem] m-auto hover:bg-dark_green md:block md:m-auto" type="submit">Bevestig beschikbaarheden</button>
            </div>
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
import { useMutation } from '@vue/apollo-composable';

export default {
    components: {
        Container,
        PrimaryButton,
    },

    setup() {
        const checkedCheckboxes = ref<string[]>([]);
        const errorText = ref('');

        const { firebaseUser } = useFirebase()
        const uidUser = firebaseUser.value?.uid
        const { mutate: addMonth } = useMutation<Imonth>(ADD_MONTH);

        const checkboxes = [
            { value: "juni", label: 'Juni (15-30 juni)' },
            { value: "juli", label: 'Juli' },
            { value: "augustus", label: 'Augustus' },
            { value: "september", label: 'September (1-15 september)' },
        ];

        const validations = {
            checkedCheckboxes: {
                required: (value: any) => value.length > 0,
            },
        };

        const v$ = useVuelidate(validations, { checkedCheckboxes });

        const handleSubmit = () => {
            errorText.value = '';
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
                errorText.value = 'Selecteer minstens één maand';
            } else {
                console.log('Checked months:', checkedCheckboxes.value);
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
            checkboxes,
            checkedCheckboxes,
            v$,
            handleSubmit,
            errorText,
        };
    },
};
</script>
