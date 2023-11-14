<template>
  <button
    class="px-4 py-3 rounded-buttonRadius bg-greenx text-sm font-lato text-white hover:bg-dark_green focus:outline-none focus-visible:bg-dark_green"
    @click="handleClick">
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
  

