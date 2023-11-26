<template>
    <Container>
        <section class="mt-3 lg:max-w-2xl m-auto lg:shadow-cardShadow bg-white lg:rounded-cardRadius lg:px-12 lg:py-8">
            <h1 class="text-center font-lato font-bold text-lg">Dagelijks verslag</h1>
            <p class="text-redx text-center mt-2">{{ currentDateString() }}</p>

            <p>{{ uidUser }}</p>
<!-- Form -->
            <v-form @submit.prevent="submitForm" lazy-validation>
                <div class="mt-8 font-lato">
                    <div class="mb-5 mt-10">
                        <h2 class="font-bold">Aanwezigen:</h2>
                        <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                    </div>
                    <label for="A">
                        <v-checkbox
                            v-model="formData.aanwezigen"
                            label="Laura Middleton"
                            value="A"
                            id="A"
                            class="rounded-full h-13 text-black pl-3 cursor-pointer"
                            :class="{'bg-greenx': isSelected('A'), 'bg-gray': !isSelected('A') }">
                        </v-checkbox>
                    </label>
                    <label for="B">
                        <v-checkbox
                            v-model="formData.aanwezigen"
                            label="Dean Woodward"
                            value="B"
                            id="B"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('B'), 'bg-gray': !isSelected('B') }">
                        </v-checkbox>
                    </label>
                    <label for="C">
                        <v-checkbox
                            v-model="formData.aanwezigen"
                            label="Kasper Decorte"
                            value="C"
                            id="C"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('C'), 'bg-gray': !isSelected('C') }">
                        </v-checkbox>
                    </label>
                    <label for="D">
                        <v-checkbox
                            v-model="formData.aanwezigen"
                            label="John"
                            value="D"
                            id="D"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('D'), 'bg-gray': !isSelected('D') }">
                        </v-checkbox>
                    </label>
                    <label for="E">
                        <v-checkbox
                            v-model="formData.aanwezigen"
                            label="Henri Sheppard"
                            value="E"
                            id="E"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('E'), 'bg-gray': !isSelected('E') }">
                        </v-checkbox>
                    </label>
                    <label for="redderF">
                        <v-checkbox
                            v-model="formData.aanwezigen"
                            label="Logan Norris"
                            value="F"
                            id="redderF"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('F'), 'bg-gray': !isSelected('F') }">
                        </v-checkbox>
                    </label>
                    <label for="G">
                        <v-checkbox
                            v-model="formData.aanwezigen"
                            label="Sonia Nelson"
                            value="G"
                            id="G"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('G'), 'bg-gray': !isSelected('G') }">
                        </v-checkbox>
                    </label>

                    <div class="mt-6">
                        <label for="vervanging">Vervanging?</label>
                            <v-text-field 
                                label="Naam vervanger"
                                id="vervanging"
                                class="mt-2"
                                v-model="formData.valueVervanging"
                                >
                            </v-text-field>
                    </div>
                </div>


<!-- Verloren gelopen kinderen -->
                <div class="mt-16">
                        <div class="mb-5 mt-10">
                            <h2 class="font-bold">Verloren gelopen kinderen?</h2>
                            <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                        </div>
                        <V-radio-group v-model="formData.valueRadioKind" :rules="formData.radioRules" required>
                            <label for="kind_1">
                                <v-radio 
                                    label="Ja" 
                                    value="kind_1" 
                                    id="kind_1"
                                    :class="{ 'bg-greenx': formData.valueRadioKind === 'kind_1' }"
                                    class="rounded-full h-13 text-black pl-3 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs">
                                </v-radio>
                            </label>
                            <label for="kind_0">
                                <v-radio 
                                    label="neen" 
                                    value="kind_0" 
                                    id="kind_0"
                                    :class="{ 'bg-greenx': formData.valueRadioKind === 'kind_0' }"
                                    class="rounded-full h-13 text-black pl-3 mt-4 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs">
                                </v-radio>
                            </label>
                        </V-radio-group>
                </div>

<!-- Interventies -->
                <div class="mt-16">
                    <div class="mb-5 mt-10">
                        <h2 class="font-bold">Interventies?</h2>
                        <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                    </div>
                         <v-radio-group v-model="formData.valueRadioInterventie" :rules="formData.radioRules" required>
                            <label for="interventie_1">
                                <v-radio
                                label="Ja"
                                value="interventie_1"
                                id="interventie_1"
                                @click="showAreaInterventie"
                                :class="{ 'bg-greenx': formData.valueRadioInterventie === 'interventie_1' }"
                                class="rounded-full h-13 text-black pl-3 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs"
                                >
                                </v-radio>
                            </label>
                            <label for="interventie_0">
                                <v-radio
                                label="neen"
                                value="interventie_0"
                                id="interventie_0"
                                @click="hideAreaInterventie"
                                :class="{ 'bg-greenx': formData.valueRadioInterventie === 'interventie_0' }"
                                class="rounded-full h-13 text-black pl-3 mt-4 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs"
                                >
                                </v-radio>
                            </label>
                        </v-radio-group>

                         <v-textarea
                            v-if="showTextAreaFieldInterventie"
                            label="Beschrijf de interventie(s)"
                            v-model="formData.valueTextInterventie"
                        ></v-textarea>
                </div>

<!-- Oefeningen uitgevoerd of gesport? -->
                <div class="mt-16">
                    <div class="mb-5 mt-10">
                        <h2 class="font-bold">Oefeningen uitgevoerd of gesport?</h2>
                        <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                    </div>
                         <v-radio-group v-model="formData.valueRadioOefenen" :rules="formData.radioRules" required>
                            <label for="oefeningOfSport_1">
                                <v-radio
                                label="Ja"
                                value="oefeningOfSport_1"
                                id="oefeningOfSport_1"
                                @click="showAreaOefenenOfSport"
                                :class="{ 'bg-greenx': formData.valueRadioOefenen === 'oefeningOfSport_1' }"
                                class="rounded-full h-13 text-black pl-3 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs"
                                >
                                </v-radio>
                            </label>
                            <label for="oefeningOfSport_0">
                                <v-radio
                                label="neen"
                                value="oefeningOfSport_0"
                                id="oefeningOfSport_0"
                                @click="hideAreaOefenenOfSport"
                                :class="{ 'bg-greenx': formData.valueRadioOefenen === 'oefeningOfSport_0' }"
                                class="rounded-full h-13 text-black pl-3 mt-4 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs"
                                >
                                </v-radio>
                            </label>
                        </v-radio-group>

                         <v-textarea
                            v-if="showTextAreaFieldOefenenOfSport"
                            label="Beschrijf de oefening(en) of uitgevoerde sport(en)"
                            v-model="formData.valueTextOefenen"
                        ></v-textarea>
                </div>

                <div class="mt-16">
                    <div class="mb-5 mt-10">
                        <h2 class="font-bold">Materiaal kapot of te kort?</h2>
                        <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                    </div>
                         <v-radio-group v-model="formData.valueRadioMateriaal" :rules="formData.radioRules" required>
                            <label for="materiaal_1">
                                <v-radio
                                label="Ja"
                                value="materiaal_1"
                                id="materiaal_1"
                                @click="showAreaMateriaal"
                                :class="{ 'bg-greenx': formData.valueRadioMateriaal === 'materiaal_1' }"
                                class="rounded-full h-13 text-black pl-3 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs"
                                >
                                </v-radio>
                            </label>
                            <label for="materiaal_0">
                                <v-radio
                                label="neen"
                                value="materiaal_0"
                                id="materiaal_0"
                                @click="hideAreaMateriaal"
                                :class="{ 'bg-greenx': formData.valueRadioMateriaal === 'materiaal_0' }"
                                class="rounded-full h-13 text-black pl-3 mt-4 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs"
                                >
                                </v-radio>
                            </label>
                        </v-radio-group>

                         <v-textarea
                            v-if="showTextAreaMateriaal"
                            label="Wat is er te kort of kapot?"
                            v-model="formData.valueTextMateriaal"
                        ></v-textarea>
                </div>

                <div class="mt-16">
                    <div class="mb-5 mt-10">
                        <h2 class="font-bold">Andere info:</h2>
                        <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                    </div>
                    <v-textarea v-model="formData.valueExtraInfo" label="Andere info"></v-textarea>
                </div>

                <v-btn class="bg-black text-white font-lato mt-2 mb-6 lg:mt-5 rounded-md" type="submit">Verzend verslag</v-btn>
            </v-form>

        </section>
    </Container>
</template>


<script lang="ts">
import { ref } from 'vue';
import Container from '@/components/generic/Container.vue';
import '@mdi/font/css/materialdesignicons.css';
import type { Ireport } from '@/interfaces/report.interface';
import { ADD_REPORT } from '@/graphql/report.mutation';
import { useMutation } from '@vue/apollo-composable';
import useFirebase from '@/composables/useFirebase';

export default {
    components: {
        Container,
    },

    setup() {
        // Reactive state
        const currentDate = ref(new Date());
        const {mutate: addReport, loading: addReportLoading, error: addReportError} = useMutation<Ireport>(ADD_REPORT);
        const { firebaseUser } = useFirebase()
        const uidUser = firebaseUser.value?.uid

        
        const formData = ref({
            timestamp: new Date(),
            aanwezigen: ['A', 'C', 'D', 'F'],
            valueVervanging: '',
            valueRadioKind: '',
            valueRadioInterventie: '',
            valueTextInterventie: '',
            valueRadioOefenen: '',
            valueTextOefenen: '',
            valueRadioMateriaal: '',
            valueTextMateriaal: '',
            valueExtraInfo: '',
            radioRules: [(v:any) => !!v || 'Selecteer een optie'],
        });

        // Reactive boolean values
        const showTextAreaFieldInterventie = ref(false);
        const showTextAreaFieldOefenenOfSport = ref(false);
        const showTextAreaMateriaal = ref(false);

        // Methods
        const isSelected = (item:any) => formData.value.aanwezigen.includes(item as never);

        const submitForm = () => {
            if (formData.value.valueRadioKind === '' || formData.value.valueRadioInterventie === '' || formData.value.valueRadioOefenen === '' || formData.value.valueRadioMateriaal === '')
            {
                console.log('Required values are empty');
            } else {
                addReport({
                    createReportInput: {
                        uid: uidUser,
                        aanwezigen: formData.value.aanwezigen,
                        vervanging: formData.value.valueVervanging,
                        radioKindVerloren: formData.value.valueRadioKind,
                        radioInterventie: formData.value.valueRadioInterventie,
                        textInterventie: formData.value.valueTextInterventie,
                        radioOefening: formData.value.valueRadioOefenen,
                        textOefening: formData.value.valueTextOefenen,
                        radioMateriaal: formData.value.valueRadioMateriaal,
                        textMateriaal: formData.value.valueTextMateriaal,
                        extraInfo: formData.value.valueExtraInfo,
                        reddersPost: 3
                    }
                }),
                console.log('Form data:', formData.value);
                alert('Formulier verzonden');
            }
        };

        // Show or hide text area fields
        const showAreaInterventie = () => (showTextAreaFieldInterventie.value = true);
        const hideAreaInterventie = () => {
            showTextAreaFieldInterventie.value = false;
            formData.value.valueTextInterventie = '';
        };
        const showAreaOefenenOfSport = () => (showTextAreaFieldOefenenOfSport.value = true);
        const hideAreaOefenenOfSport = () => {
            showTextAreaFieldOefenenOfSport.value = false;
            formData.value.valueTextOefenen = '';
        };
        const showAreaMateriaal = () => (showTextAreaMateriaal.value = true);
        const hideAreaMateriaal = () => {
            showTextAreaMateriaal.value = false;
            formData.value.valueTextMateriaal = '';
        };

        // Computed
        const currentDateString = () => {
            const months = [
                'januari',
                'februari',
                'maart',
                'april',
                'mei',
                'juni',
                'juli',
                'augustus',
                'september',
                'oktober',
                'november',
                'december',
            ];

            const day = currentDate.value.getDate();
            const month = months[currentDate.value.getMonth()];

            return `${day} ${month}`;
        };

        // Return the values/methods you want to expose to the template
        return {
            currentDate,
            formData,
            showTextAreaFieldInterventie,
            showTextAreaFieldOefenenOfSport,
            showTextAreaMateriaal,
            isSelected,
            submitForm,
            showAreaInterventie,
            hideAreaInterventie,
            showAreaOefenenOfSport,
            hideAreaOefenenOfSport,
            showAreaMateriaal,
            hideAreaMateriaal,
            currentDateString,
            uidUser,
        };
    },
};
</script>
