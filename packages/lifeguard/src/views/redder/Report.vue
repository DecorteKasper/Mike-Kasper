<template>
    <Container>
        <section class="mt-3 lg:max-w-2xl m-auto lg:shadow-cardShadow bg-white lg:rounded-cardRadius lg:px-12 lg:py-8">
            <h1 class="text-center font-lato font-bold text-lg">Dagelijks verslag</h1>
            <p class="text-redx text-center mt-2">{{ currentDateString() }}</p>

<!-- Form -->
            <v-form @submit.prevent="submitForm" lazy-validation>
                <div class="mt-8 font-lato">
                    <div class="mb-5 mt-10">
                        <h2 class="font-bold">Aanwezigen:</h2>
                        <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                    </div>
                    
                    <label v-for="(user, index) in workersInPost" :for="`${index}`" :key="index">
                        <v-checkbox
                            v-model="formData.aanwezigen"
                            :label="user"
                            :value="user"
                            :id="`${index}`"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{ 'bg-greenx': isSelected(user), 'bg-gray': !isSelected(user) }">
                        </v-checkbox>
                    </label>

                    <div class="mt-6">
                        <label for="vervanging">Vervanging?</label>
                            <v-text-field 
                                label="Naam vervanger"
                                id="vervanging"
                                class="mt-2 rounded-lg"
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

                <button class="bg-greenx text-white font-lato font-bold px-9 py-2 mt-2 mb-6 lg:mt-5 rounded-md hover:bg-dark_green transition-all" type="submit">Verzend verslag</button>
                <!-- <v-btn class="bg-teal text-white font-lato mt-2 mb-6 lg:mt-5 rounded-md" type="submit">Verzend verslag</v-btn> -->
            </v-form>

        </section>
    </Container>
</template>


<script lang="ts">
import { ref, watch, onMounted } from 'vue';
import Container from '@/components/generic/Container.vue';
import '@mdi/font/css/materialdesignicons.css';
import type { Ireport } from '@/interfaces/report.interface';
import { ADD_REPORT } from '@/graphql/report.mutation';
import { useMutation, useQuery } from '@vue/apollo-composable';
import useFirebase from '@/composables/useFirebase';
import { ALL_HOLIDAYS } from '@/graphql/holiday.query';
import { GET_POST_BY_NUMBER } from '@/graphql/post.query';
import { GET_USERS } from '@/graphql/user.query';
import type { Iholiday } from '@/interfaces/holiday.interface';
import type { Ipost } from '@/interfaces/post.interface';


interface User {
    name: string;
    uid: string;
    surname?: string;
}

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
        const namesOfUsersWithoutHolidayToday = ref<string[] | null>(null);
        const workersInPost = ref<string[] | null>();

        const { loading: usersLoading, result: usersResult, error: usersError } = useQuery<{ users: User[] }>(GET_USERS);
        const { loading: postLoading, result: postResult, error: postError } = useQuery(GET_POST_BY_NUMBER, { numberPost: 4 });
        const { loading: holidaysLoading, result: holidaysResult, error: holidaysError } = useQuery<{ holidays: Iholiday[] }>(ALL_HOLIDAYS);;
        
        const formData = ref({
            timestamp: new Date(),
            aanwezigen: [] as string[],
            valueVervanging: '',
            valueRadioKind: '',
            valueRadioInterventie: '',
            valueTextInterventie: '',
            valueRadioOefenen: '',
            valueTextOefenen: '',
            valueRadioMateriaal: '',
            valueTextMateriaal: '',
            valueExtraInfo: '',
            status: false,
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
                        status: false,
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

                // Get the users who have a holiday today
                const usersWithHolidayToday = users.filter((user) =>
                    holidaysData.some(
                        (holiday) =>
                            postUIDs.includes(holiday.uid) &&
                            holiday.dates.some((date) => date.split('T')[0] === today) &&
                            holiday.uid === user.uid
                    )
                );

                // Get the names of users who work in the specific post
                const namesOfUsersInSpecificPost = users
                    .filter((user) => postUIDs.includes(user.uid))
                    .map((user) => `${user.name} ${user.surname}`);

                workersInPost.value = namesOfUsersInSpecificPost;

                // Get the names of users who don't have a holiday today
                const usersWithoutHolidayToday = users.filter(
                    (user) =>
                        !usersWithHolidayToday.some((userWithHoliday) => userWithHoliday.uid === user.uid) &&
                        postUIDs.includes(user.uid)
                );

                // Get an array of names of users without holiday today
                namesOfUsersWithoutHolidayToday.value = usersWithoutHolidayToday.map(
                    (user) => `${user.name} ${user.surname}`
                );

                // Automatically select checkboxes for users in namesOfUsersWithoutHolidayToday
                if (workersInPost.value !== null) {
                    const indicesToSelect = namesOfUsersWithoutHolidayToday.value
                        .map((name) => workersInPost.value?.indexOf(name))
                        .filter((index) => index !== -1 && index !== null)
                        .map((index) => index!)
                        .map((index) => workersInPost.value![index]);

                    // Update aanwezigen array in formData
                    formData.value.aanwezigen = indicesToSelect;
                }
            }
        };
        watch([usersResult, postResult, holidaysResult], () => {processUserData();});


        // Execute the processUserData method when the component is mounted
        onMounted(() => {
            processUserData();
        });




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
            workersInPost,
        };
    },
};
</script>
