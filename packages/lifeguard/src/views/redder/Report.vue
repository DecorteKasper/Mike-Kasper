<template>
    <p>Verslagen redder</p>
    <v-icon icon="mdi-home" />
    <v-icon icon="mdi-account" />
</template>

<script lang="ts">
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import { createVuetify } from 'vuetify'


export default {
     icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },

    setup() {
        return {

        }
    },


}
</script>