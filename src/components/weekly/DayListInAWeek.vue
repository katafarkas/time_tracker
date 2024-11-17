<script lang="ts" setup>
import DayInAWeek from "./DayInAWeek.vue";
import { Day } from "../../utils/Interfaces";

// Props
const props = defineProps<{
  weekDays: Day[];
}>();
</script>

<script lang="ts">
export default {};
</script>

<template>
  <div class="flex flex-col gap-4 sm:gap-8">
    <DayInAWeek v-for="day in props.weekDays" :key="day.date" :day="day" :is-monthly-view="false"
      :is-daily-view="false" />
  </div>
</template>
