<script lang="ts" setup>
import { computed } from "vue";
import DayInAWeek from "../weekly/DayInAWeek.vue";
import { getWeekDays } from "../../utils/UtilityFunctions";
import { Week } from "../../utils/Interfaces";

// Props
const props = defineProps<{
  week: Week;
}>();

// Computed
const weekNumber = computed(() => {
  return getCurrentWeekNumber(new Date(props.week.startDate));
});

// Functions
const getCurrentWeekNumber = (date: Date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;
  let weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);

  /* Overflow */
  if (weekNumber > 52) {
    weekNumber = 1;
  }

  return weekNumber;
};
</script>

<script lang="ts">
export default {};
</script>

<template>
  <div class="bg-lightest rounded-md p-5">
    <div class="flex justify-between mb-3" :class="{ 'mb-5': week.entries.length > 0 }">
      <div class="flex flex-col sm:flex-row gap-2">
        <h4 class="text-xl font-bold">Week {{ weekNumber }}</h4>
        <span class="text-xl font-bold hidden sm:block">-</span>
        <h4 class="text-sm sm:text-lg font-bold">
          ({{ props.week.startDate }} - {{ props.week.endDate }})
        </h4>
      </div>
      <div>
        <h4 class="text-lg font-bold">{{ props.week.totalDuration }}</h4>
      </div>
    </div>
    <div class="flex flex-col gap-3">
      <DayInAWeek v-for="day in getWeekDays(new Date(props.week.startDate), $props.week.entries, false)" :key="day.name"
        :day="day" :is-monthly-view="true" :is-daily-view="false" />
    </div>
  </div>
</template>
