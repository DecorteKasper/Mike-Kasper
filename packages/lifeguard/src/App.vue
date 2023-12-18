<script lang="ts">
import { provide, ref, watch } from 'vue';
import AppFooter from './components/generic/FooterApp.vue'
import AppHeader from './components/generic/HeaderApp.vue'
import useGraphql from './composables/useGraphql';
import { DefaultApolloClient } from '@vue/apollo-composable'
import { onAuthStateChanged, getAuth, applyActionCode } from 'firebase/auth';



export default {
  components: {
    AppFooter,
    AppHeader,
  },

  setup() {
    const { apolloClient } = useGraphql()
    const isLoggedIn = ref(false);
    const userId = ref<string>()


    // Luister naar de wijzigingen in de authenticatiestatus
    const auth = getAuth();
    onAuthStateChanged(auth, (currentUser) => {
      isLoggedIn.value = !!currentUser; // Als er een gebruiker is, is de gebruiker ingelogd
      // console.log('User is logged in: ', user?.uid);
      userId.value = currentUser?.uid
    });

    // Maak alles beschikbaar in de scope*
    provide(DefaultApolloClient, apolloClient)
    // * behalve in composables...

    return {
      isLoggedIn,
    }
  },
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Open+Sans:wght@400;500;600;700&display=swap');
</style>

<template>
  <div v-if="isLoggedIn" class="flex flex-col min-h-screen">
    <AppHeader />

    <RouterView class="flex-1" />

    <!-- <AppFooter /> -->
  </div>
  <div v-else class="flex flex-col min-h-screen">
    <RouterView class="flex-1" />
  </div>
</template>