<script lang="ts">
import { provide } from 'vue';
import AppFooter from './components/generic/FooterApp.vue'
import AppHeader from './components/generic/HeaderApp.vue'
import useGraphql from './composables/useGraphql';
import { DefaultApolloClient } from '@vue/apollo-composable'


export default {
  components: {
    AppFooter,
    AppHeader,
  },

  setup() {
    const { apolloClient } = useGraphql()

    // Maak alles beschikbaar in de scope*
    provide(DefaultApolloClient, apolloClient)
    // * behalve in composables...

    return {}
  },
}
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />

    <RouterView class="flex-1" />

    <AppFooter />
  </div>
</template>