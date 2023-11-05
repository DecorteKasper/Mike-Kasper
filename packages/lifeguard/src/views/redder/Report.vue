<template>
    <Container>
        <section class="mt-3 lg:max-w-2xl m-auto lg:shadow-cardShadow bg-white lg:rounded-cardRadius lg:px-12 lg:py-8">
            <h1 class="text-center font-lato font-bold text-lg">Dagelijks verslag</h1>
            <p class="text-redx text-center mt-2">{{ currentDateString }}</p>

                <div class="mt-8">
                    <div class="mb-5 mt-10">
                        <h2 class="font-bold">Aanwezigen:</h2>
                        <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                    </div>
                    <label for="A">
                        <v-checkbox
                            v-model="selected"
                            label="Laura Middleton"
                            value="A"
                            id="A"
                            class="rounded-full h-13 text-black pl-3 cursor-pointer"
                            :class="{'bg-greenx': isSelected('A'), 'bg-gray': !isSelected('A') }">
                        </v-checkbox>
                    </label>
                    <label for="B">
                        <v-checkbox
                            v-model="selected"
                            label="Dean Woodward"
                            value="B"
                            id="B"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('B'), 'bg-gray': !isSelected('B') }">
                        </v-checkbox>
                    </label>
                    <label for="C">
                        <v-checkbox
                            v-model="selected"
                            label="Kasper Decorte"
                            value="C"
                            id="C"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('C'), 'bg-gray': !isSelected('C') }">
                        </v-checkbox>
                    </label>
                    <label for="D">
                        <v-checkbox
                            v-model="selected"
                            label="John"
                            value="D"
                            id="D"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('D'), 'bg-gray': !isSelected('D') }">
                        </v-checkbox>
                    </label>
                    <label for="E">
                        <v-checkbox
                            v-model="selected"
                            label="Henri Sheppard"
                            value="E"
                            id="E"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('E'), 'bg-gray': !isSelected('E') }">
                        </v-checkbox>
                    </label>
                    <label for="redderF">
                        <v-checkbox
                            v-model="selected"
                            label="Logan Norris"
                            value="F"
                            id="redderF"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('F'), 'bg-gray': !isSelected('F') }">
                        </v-checkbox>
                    </label>
                    <label for="G">
                        <v-checkbox
                            v-model="selected"
                            label="Sonia Nelson"
                            value="G"
                            id="G"
                            class="rounded-full h-13 text-black pl-3 mt-4 cursor-pointer"
                            :class="{'bg-greenx': isSelected('G'), 'bg-gray': !isSelected('G') }">
                        </v-checkbox>
                    </label>
                </div>


                <div class="mt-16">
                        <div class="mb-5 mt-10">
                            <h2 class="font-bold">Verloren gelopen kinderen?</h2>
                            <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                        </div>
                        <V-radio-group v-model="selectedValueKind">
                            <label for="kind_1">
                                <v-radio 
                                    label="Ja" 
                                    value="kind_1" 
                                    id="kind_1"
                                    :class="{ 'bg-greenx': selectedValueKind === 'kind_1' }"
                                    class="rounded-full h-13 text-black pl-3 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs">
                                </v-radio>
                            </label>
                            <label for="kind_0">
                                <v-radio 
                                    label="neen" 
                                    value="kind_0" 
                                    id="kind_0"
                                    :class="{ 'bg-greenx': selectedValueKind === 'kind_0' }"
                                    class="rounded-full h-13 text-black pl-3 mt-4 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs">
                                </v-radio>
                            </label>
                        </V-radio-group>
                </div>

                <div class="mt-16">
                    <div class="mb-5 mt-10">
                        <h2 class="font-bold">Interventies?</h2>
                        <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                    </div>
                        <V-radio-group v-model="selectedValueInterventie">
                            <label for="interventie_1">
                                <v-radio 
                                    label="Ja" 
                                    value="interventie_1" 
                                    id="interventie_1"
                                    :class="{ 'bg-greenx': selectedValueInterventie === 'interventie_1' }"
                                    class="rounded-full h-13 text-black pl-3 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs">
                                </v-radio>
                            </label>
                            <label for="interventie_0">
                                <v-radio 
                                    label="neen" 
                                    value="interventie_0" 
                                    id="interventie_0"
                                    :class="{ 'bg-greenx': selectedValueInterventie === 'interventie_0' }"
                                    class="rounded-full h-13 text-black pl-3 mt-4 bg-gray cursor-pointer max-w-[12rem] lg:max-w-xs">
                                </v-radio>
                            </label>
                        </V-radio-group>
                </div>

                <div class="mt-16">
                    <div class="mb-5 mt-10">
                        <h2 class="font-bold">Andere info:</h2>
                        <div class="w-16 h-[2px] bg-redx rounded-full"></div>
                    </div>
                    <v-textarea v-model="andereInfo" label="Andere info"></v-textarea>
                </div>

                <v-btn @click="logFormData">Dagverslag verzenden</v-btn>



        </section>
    </Container>
</template>

<script lang="ts">
import Container from '@/components/generic/Container.vue'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'


export default {
    components: {
        Container,
    },

    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },

    data() {
        return {
            selected: ['A', 'C', 'D', 'F'],
            currentDate: new Date(),
            selectedValueKind: '',
            selectedValueInterventie: '',
            andereInfo: '',
        }

    },

    watch: {
        selected(newVal) {
            // This watcher will trigger when the 'selected' array changes
            console.log("Selected items:", newVal);
        }
    },

    methods: {
        isSelected(item:any) {
            return this.selected.includes(item as never);
        },

        logFormData() {
            const formData = {
                selected: this.selected,
                selectedValueKind: this.selectedValueKind,
                selectedValueInterventie: this.selectedValueInterventie,
                andereInfo: this.andereInfo,
            };

            console.log(JSON.stringify(formData, null, 2));
        },
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

    setup() {
        return {
        }
    },



}
</script>