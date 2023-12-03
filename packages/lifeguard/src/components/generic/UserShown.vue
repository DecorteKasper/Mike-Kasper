<template>
    <div class="flex flex-row items-center px-4 py-1 min-w-[15rem] max-w-[15rem] h-auto bg-dark_grey rounded-lg mb-3">
        <!-- <img src="" alt="Photo user"> -->
        <div class="w-7 h-7 bg-greenx rounded-full"></div>
        <p class="text-sm ml-4">{{ name }}</p>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        name: {
            type: String,
            required: true
        }
    },
}
</script>