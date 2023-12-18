<template>
    <Container class="py-12 font-lato">
      <div class="flex flex-row justify-between pt-6 items-center">
        <img class="w-30" :src="logo" alt="Logo lifeguard">
        <p class="text-neutral-400 text-xs">2023 © Mike & Kasper</p>
      </div>
    </Container>
  </template>
  
  <script lang="ts">
  import Container from './Container.vue'
  import logo from '@/assets/icons/logo.svg'

  export default {
    components: {
      Container,
    },
    setup() {
      return {
        logo,
      }
    }
  }
 
  </script>