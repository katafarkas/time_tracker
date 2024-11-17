<script lang="ts" setup>
defineEmits(["click"]);
</script>

<script lang="ts">
export default {};
</script>

<template>
  <button data-testid="add-time-entry-button" type="button" @click="$emit('click')"
    class="w-36 sm:w-40 h-10 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg font-medium rounded-lg text-sm text-center">
    Add Time Entry
  </button>
</template>
