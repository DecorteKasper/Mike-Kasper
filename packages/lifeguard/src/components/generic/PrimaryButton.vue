<template>
    <button
      class="mt-14 px-8 py-2 rounded-buttonRadius bg-green font-bold text-white hover:bg-dark_green focus:outline-none focus-visible:bg-dark_green"
      @click="handleClick"
    >
      {{ label }}
    </button>
  </template>
  
  <script lang="ts">
  import Vue from 'vue';

  export default {

    props: {
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit('click'); // Emit een 'click'-gebeurtenis naar de oudercomponent
    }
  }

  }
  
  </script>
  

