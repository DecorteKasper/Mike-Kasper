<template>
    <div class="w-full h-130 shadow-cardShadow rounded-cardRadius my-custom-scrollbar overflow-auto">
        <div class="sm:flex justify-between px-14 pt-8 mb-8">
            <h2 class="font-lato font-semibold text-lg flex items-center">
                {{ getTitle }}
            </h2>
            <div class="w-fit">
                <div class="flex gap-4 relative mt-8 sm:mt-0">
                    <input class="max-w-lg p-2 bg-gray rounded-inputFieldRadius outline-none " type="search"
                        placeholder="Zoeken..." v-model="searchTerm" @input="filterItems">
                    <span class="absolute right-3 top-2">
                        <!-- Hier komt een icon -->
                        <Search class="w-6 h-6 text-dark_green" />
                    </span>
                </div>
            </div>
        </div>

        <table class=" w-full">
            <!-- Titles -->
            <tr class=" border-b-2 border-dark_green">
                <td class="pl-14 hidden sm:table-cell">
                    <!-- Bovenste checkbox -->
                    <label class="-status">
                        <input type="checkbox" name="selectAll" class="hidden" v-model="selectAll"
                            @change="toggleSelectAll" />
                        <div :class="{
                            'group p-1 w-fit bg-light_green rounded-full focus:outline-none cursor-pointer': selectAll,
                            'group p-1  w-fit bg-light_green rounded-full focus:outline-none cursor-pointer': !selectAll
                        }">
                            <Check
                                :class="{ 'text-dark_green': selectAll, 'opacity-0 group-hover:opacity-100': !selectAll }"
                                :stroke-width="4" :size="14" />
                        </div>
                    </label>
                </td>
                <td v-if="ReportsData.length > 0" class="font-lato font-semibold text-sm py-4 pl-8 sm:pl-0">Post</td>
                <td v-if="ReportsData.length > 0" class="font-lato font-semibold text-sm py-4 hidden sm:table-cell">Datum
                </td>
                <td v-if="ReportsData.length > 0" class="font-lato font-semibold text-sm py-4 hidden sm:table-cell"></td>
                <td v-if="jobsData.length > 0 || sollisData.length > 0"
                    class="pl-4 sm:pl-0 font-lato font-semibold text-sm py-4">
                    Voornaam</td>
                <td v-if="jobsData.length > 0 || sollisData.length > 0"
                    class="font-lato font-semibold text-sm py-4 hidden sm:table-cell">Naam
                </td>
                <td v-if="jobsData.length > 0 || sollisData.length > 0" class="font-lato font-semibold text-sm py-4">Functie
                </td>

                <td class="flex justify-end gap-4 pr-14">
                    <!-- Reports -->
                    <SecondaryButton class="hidden sm:table-cell" v-if="ReportsData.length > 0" label="Verwijderen"
                        @click="openModalDeleteAll(itemIds)" />
                    <!-- Sollicitaties -->
                    <SecondaryButton class="hidden md:table-cell" v-if="sollisData.length > 0" label="Afwijzen"
                        @click="openModalDeleteAll(itemIds)" />
                    <!-- Jobs -->
                    <SecondaryButton class="hidden sm:table-cell" v-if="jobsData.length > 0" label="Verwijderen"
                        @click="openModalDeleteAll(itemIds)" />
                </td>
            </tr>
            <!-- Data -->
            <tr v-for="(item, index) in filteredItems" :class="index % 2 === 0 ? ' h-12' : ' h-12 bg-gray'">
                <td class="pl-14 hidden sm:table-cell">
                    <label class="checkbox-status">
                        <input v-if="ReportsData.length > 0" type="checkbox" name="status" class="hidden"
                            v-model="item.status" @click="getItemIds(item.id)">
                        <input v-if="sollisData.length > 0 || jobsData.length > 0" type="checkbox" name="status"
                            class="hidden" v-model="item.status" @click="getItemIds(item.uid)">


                        <div :class="{
                            'group p-1 w-fit bg-light_green rounded-full focus:outline-none cursor-pointer ': item.status === true,
                            'group  p-1 w-fit bg-light_green rounded-full focus:outline-none cursor-pointer': item.status !== true
                        }">
                            <Check
                                :class="{ 'text-dark_green': item.status === true, 'opacity-0 group-hover:opacity-100': item.status !== true }"
                                :stroke-width="4" :size="14" />
                        </div>
                    </label>
                </td>
                <!-- Reports -->
                <td v-if="ReportsData.length > 0 && 'reddersPost' in item" class="font-lato text-sm pl-8 sm:pl-0">Post {{
                    item.reddersPost
                }}
                </td>
                <td v-if="ReportsData.length > 0 && 'reddersPost' in item" class="font-lato text-sm hidden sm:table-cell">{{
                    formatDate(item.createdAt) }}
                </td>
                <td v-if="ReportsData.length > 0" class="font-lato text-sm hidden sm:table-cell"></td>

                <!-- Jobs -->
                <td v-if="jobsData.length > 0 && 'name' in item || sollisData.length > 0 && 'name' in item"
                    class="font-lato text-sm pl-4 sm:pl-0">{{ item.name }}</td>
                <td v-if="jobsData.length > 0 && 'surname' in item || sollisData.length > 0 && 'surname' in item"
                    class="font-lato text-sm hidden sm:table-cell ">{{ item.surname }}</td>



                <td v-if="jobsData.length > 0 && 'role' in item || sollisData.length > 0 && 'role' in item"
                    class="font-lato text-sm">
                    {{ item.role === 200 ? 'redder' : 'EHBO' }}
                </td>

                <td class="font-lato text-sm pr-14">
                    <div class="flex align-middle justify-end">
                        <!-- Jobs  -->
                        <button v-if="jobsData.length > 0" class="mr-6" @click="openModalDelete(item.uid)">
                            <Trash2 class="w-7 h-7 text-red" />
                        </button>


                        <!-- sollicitaties -->
                        <button v-if="sollisData.length > 0" class="mr-6" @click="openModalDelete(item.uid)">
                            <X class="w-7 h-7 text-red" />
                        </button>
                        <button v-if="sollisData.length > 0" @click="openModalAcceptUser(item.uid)">
                            <CheckCircle class="w-7 h-7 text-dark_green" />
                        </button>


                        <!-- Reports -->
                        <!-- Button om te downloaden als pdf -->
                        <button v-if="ReportsData.length > 0" class="mr-6" @click="downloadPdf(item)">
                            <ArrowDownToLine class="hidden sm:table-cell w-7 h-7 text-greenx" />
                        </button>
                        <button v-if="ReportsData.length > 0" class="mr-6" @click="openModalDelete(item.id)">
                            <Trash2 class="w-7 h-7 text-red" />
                        </button>
                        <button v-if="ReportsData.length > 0" @click="openModalReport(item)">
                            <Eye class="w-7 h-7 text-dark_green" />
                        </button>
                    </div>
                </td>
            </tr>

        </table>
    </div>
</template>

<script lang="ts">
import { ref, watch, computed } from 'vue'
import { Eye, Trash2, Check, CheckCircle, X, ArrowDownToLine, Search } from 'lucide-vue-next';
import PrimaryButton from './PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';
import type { Ireport } from '@/interfaces/report.interface';
import jsPDF from 'jspdf';
import type { Iuser } from '@/interfaces/user.interface';


export default {

    props: {

        ReportsData: {
            type: Array as () => Ireport[],
            default: () => []
        },
        jobsData: {
            type: Array as () => Iuser[],
            default: () => []
        },
        sollisData: {
            type: Array as () => Iuser[],
            default: () => []
        },
        deleteEvent: {
            type: String,
            default: null
        },
        deleteEvents: {
            type: Array as () => string[],
            default: () => []
        }
    },
    components: {
        Eye,
        Trash2,
        Check,
        PrimaryButton,
        SecondaryButton,
        CheckCircle,
        X,
        ArrowDownToLine,
        Search
    },
    computed: {
        getTitle() {
            if (this.ReportsData.length > 0) {
                return 'verslagen';
            } else if (this.jobsData.length > 0) {
                return 'Werknemers';
            } else if (this.sollisData.length > 0) {
                return 'Sollicitaties';
            }
            else {
                return 'Geen gegevens beschikbaar';
            }
        }
    },

    methods: {
        openModalReport(item: any) {
            this.$emit('show-modal', { report: item });
        },

        openModalDelete(id: string) {
            this.$emit('show-modal', { id: id });
        },

        openModalDeleteAll(ids: string[]) {
            this.$emit('show-modal', { ids: ids });
        },

        openModalAcceptUser(id: string) {
            this.$emit('show-modal', { uidToUpdate: id });
        },


        downloadPdf(item: any) {
            console.log('download pdf', item);

            // PDf Maken
            const doc = new jsPDF();

            // Bepaal de breedte en hoogte van het paginaformaat (standaard A4-formaat)
            const pageWidth = doc.internal.pageSize.width;
            const pageHeight = doc.internal.pageSize.height;

            // Voeg padding toe aan alle zijden
            const padding = 20;

            // Titel
            doc.setFontSize(30);
            doc.setTextColor(92, 164, 169);
            doc.text(`Verslag post ${item.reddersPost}`, padding, padding);
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);

            // Aanwezigheden
            if (Array.isArray(item.aanwezigen) && item.aanwezigen.length > 0) {
                const aanwezighedenText = `Aanwezigheden: ${item.aanwezigen.join(', ')}`;
                doc.text(aanwezighedenText, padding, padding + 10);
            } else {
                doc.text('Geen aanwezigheden beschikbaar', padding, padding + 10);
            }
            // Vervangingen 
            doc.text(`Vervanging: ${item.vervanging}`, padding, padding + 20);
            doc.text(`${this.formatDate(item.createdAt)}`, padding, padding + 60);
            // Sla het PDF-bestand op
            doc.save(`verslagPost${item.reddersPost}.pdf`);
        },
    },

    setup(props) {

        const sollis = ref<Iuser[]>(props.sollisData);
        const jobs = ref<Iuser[]>(props.jobsData);
        const reports = ref<Ireport[]>(props.ReportsData);
        // Select values
        const selectAll = ref(false)
        const searchTerm = ref('')


        // Select items en push them to itemIds array
        const itemIds = ref<string[]>([]);

        const getItemIds = (id: string) => {

            console.log('id', id)

            const index = itemIds.value.indexOf(id);

            if (index === -1) {
                itemIds.value.push(id);
            } else {
                itemIds.value.splice(index, 1);
            }
            console.log('itemIds', itemIds.value)
        };

        // Select All
        const toggleSelectAll = () => {
            const selectAllStatus = selectAll.value;
            // console.log(selectAllStatus)

            reports.value.forEach((report) => {
                report.status = selectAllStatus;
                itemIds.value.push(report.id);
            });
            // voor de jobs 
            jobs.value.forEach((job) => {
                job.status = selectAllStatus;
                itemIds.value.push(job.uid);
            });
            // voor de sollis
            sollis.value.forEach((solli) => {
                solli.status = selectAllStatus;
                itemIds.value.push(solli.uid);
            });
        };

        // Om de lijst onmiddelijk te updaten als er een delete is gebeurt
        watch(() => props.deleteEvent, (newValue) => {
            reports.value = reports.value.filter(report => report.id !== newValue);
        });
        watch(() => props.deleteEvents, (newValue) => {
            reports.value = reports.value.filter(report => !newValue.includes(report.id));
        });
        watch(() => props.sollisData, (newValue) => {
            sollis.value = newValue;
        });
        watch(() => props.jobsData, (newValue) => {
            jobs.value = newValue;
        });

        // Format date
        const formatDate = (isoDateString: string) => {
            const date = new Date(isoDateString);
            const formattedDate = date.toISOString().split('T')[0];
            return formattedDate;
        };

        // Search
        const filteredItems = computed(() => {
            const searchTermValue = searchTerm.value.toLowerCase().trim();

            // Filter zowel tasks als jobs op basis van zoekterm
            const filteredReports = reports.value.filter((report) => {
                return (
                    // Deze werkt nog niet helemaal
                    report.reddersPost.toString().includes(searchTermValue) ||
                    report.createdAt.toLowerCase().includes(searchTermValue)
                );
            });

            const filteredJobs = jobs.value.filter((job) => {
                // Voer hier zoeklogica uit voor job-gerelateerde eigenschappen
                return (
                    job.name.toLowerCase().includes(searchTermValue) ||
                    job.surname.toLowerCase().includes(searchTermValue)
                );
            });

            const filteredSollis = sollis.value.filter((solli) => {
                // Voer hier zoeklogica uit voor job-gerelateerde eigenschappen
                return (
                    solli.name.toLowerCase().includes(searchTermValue) ||
                    solli.surname.toLowerCase().includes(searchTermValue)
                );
            });


            // Combineer de resultaten van de zoekopdrachten voor taken en banen
            return [...filteredReports, ...filteredJobs, ...filteredSollis];
        });

        const filterItems = () => {
            searchTerm.value = searchTerm.value.toLowerCase();
        };

        return {
            reports,
            jobs,
            sollis,
            filteredItems,
            filterItems,
            searchTerm,
            selectAll,
            toggleSelectAll,
            formatDate,
            getItemIds,
            itemIds
        }
    }
}

</script>