<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import SideButton from "../SideButton.vue";
import DayListInAWeek from "./DayListInAWeek.vue";
import { getWeekDays } from "../../utils/UtilityFunctions"
import TagFilter from "../../components/TagFilter.vue";
import { Entry, Day } from "../../utils/Interfaces";

// Props
const props = defineProps<{
  entries: Entry[];
}>();

// Refs
const currentWeekNumber = ref(0);
const weekDays = ref<Day[]>([]);
const currentDate = ref(new Date());

// Functions
const getCurrentWeekNumber = (date: Date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - startOfYear.getTime()) / 86400000;

  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};

const updateWeekInfo = () => {
  currentWeekNumber.value = getCurrentWeekNumber(currentDate.value);
  weekDays.value = getWeekDays(currentDate.value, props.entries, true);
};

const goToPreviousWeek = () => {
  currentDate.value.setDate(currentDate.value.getDate() - 7);
  updateWeekInfo();
};

const goToNextWeek = () => {
  currentDate.value.setDate(currentDate.value.getDate() + 7);
  updateWeekInfo();
};

// On mounted
onMounted(() => {
  updateWeekInfo();
});

// Watch
watch(
  () => props.entries,
  () => {
    updateWeekInfo();
  },
  { deep: true }
);
</script>

<script lang="ts">
export default {};
</script>

<template>
  <div class="mb-5">
    <div class="flex justify-center sm:justify-start items-center">
      <SideButton direction="left" @click="goToPreviousWeek" />
      <h4 class="text-xl sm:text-2xl font-bold min-w-36 text-center mx-1 sm:mx-5">
        Week {{ currentWeekNumber }}
      </h4>
      <SideButton direction="right" @click="goToNextWeek" />
    </div>
  </div>
  <TagFilter />
  <DayListInAWeek :weekDays="weekDays" />
</template>
