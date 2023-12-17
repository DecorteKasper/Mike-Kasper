<template>
    <div class="flex flex-row items-center px-4 py-1 min-w-[15rem] max-w-[15rem] h-auto bg-dark_grey rounded-lg mb-3">
        <img class="w-7 h-7 text-white" :src="userSvg" alt="User Photo" />
        <p class="text-sm ml-4">{{ name }}</p>
    </div>
</template>

<script lang="ts">
import userSvg from '@/assets/icons/user_round.svg'

export default {
    props: {
        name: {
            type: String,
            required: true
        }
    },

    data() {
        return {
            userSvg
        }
    } 
}
</script>