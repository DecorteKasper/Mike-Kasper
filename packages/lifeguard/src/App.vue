<script setup lang="ts">
import AppFooter from './components/generic/FooterApp.vue'
import AppHeader from './components/generic/HeaderApp.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <AppHeader />

    <RouterView class="flex-1" />

    <AppFooter />
  </div>
</template>