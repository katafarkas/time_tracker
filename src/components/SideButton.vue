<script setup lang="ts">
import { computed } from "vue";
import arrowLeftIcon from "../assets/img/arrow-left.svg";
import arrowRightIcon from "../assets/img/arrow-right.svg";

// Props
const props = defineProps<{ direction: "left" | "right" }>();

// Computed
const arrowSrc = computed(() => {
  return props.direction === "right" ? arrowRightIcon : arrowLeftIcon;
});
</script>

<script lang="ts">
export default {};
</script>

<template>
  <button
    type="button"
    class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg font-medium rounded-lg text-sm px-2 sm:px-5 py-1 sm:py-2.5 text-center"
  >
    <img
      :src="arrowSrc"
      class="h-4 w-auto"
      :alt="props.direction === 'right' ? 'Right' : 'Left'"
    />
  </button>
</template>
