<script lang="ts" setup>
import { Entry, monthNames, Week } from "../../utils/Interfaces";
import SideButton from "../SideButton.vue";
import WeekInAMonth from "./WeekInAMonth.vue";
import { ref, computed } from "vue";
import TagFilter from "../../components/TagFilter.vue";

// Props
const props = defineProps<{
  entries: Entry[];
}>();

// Refs
const currentDate = ref(new Date());

// Functions
const getMonthDetails = (date: Date) => {
  const month = date.getMonth();

  return {
    monthName: monthNames[month],
  };
};

const getWeeksOfMonth = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  let currentWeekStart = new Date(firstDayOfMonth);
  currentWeekStart.setDate(
    currentWeekStart.getDate() -
    (currentWeekStart.getDay() === 0 ? 6 : currentWeekStart.getDay() - 1)
  );

  const weeks: Week[] = [];
  let weekNumber = 1;

  while (currentWeekStart <= lastDayOfMonth) {
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

    const startDate = new Date(currentWeekStart).toLocaleDateString();
    const endDate = currentWeekEnd.toLocaleDateString();

    // Filter entries for the current week
    const entriesInWeek = props.entries.filter((entry) => {
      const entryDate = new Date(entry.date)
      entryDate.setHours(0, 0, 0, 0);
      return entryDate >= currentWeekStart && entryDate <= currentWeekEnd;
    });

    // Calculate total duration of the week (in minutes)
    const totalMinutes = entriesInWeek.reduce((sum, entry) => {
      const [hours, minutes] = entry.duration.split(":").map(Number);
      return sum + hours * 60 + minutes;
    }, 0);

    // Convert total minutes back to "HH:MM" format
    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    const totalDuration = `${String(totalHours).padStart(2, "0")}:${String(
      remainingMinutes
    ).padStart(2, "0")}`;

    weeks.push({
      weekNumber,
      startDate: startDate,
      endDate: endDate,
      entries: entriesInWeek,
      totalDuration: totalDuration,
    });

    // Move to the next week
    currentWeekStart.setDate(currentWeekStart.getDate() + 7);
    weekNumber++;
  }

  return weeks;
};

const goToPreviousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1 // Reset to the first day of the previous month
  );
};


const goToNextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1 // Reset to the first day of the next month
  );
};

// Reactive month details
const monthDetails = computed(() => getMonthDetails(currentDate.value));
const weeksOfMonth = computed(() => getWeeksOfMonth(currentDate.value));
</script>

<script lang="ts">
export default {};
</script>

<template>
  <div>
    <div class="mb-5">
      <div class="flex justify-center sm:justify-start items-center mb-5">
        <SideButton direction="left" @click="goToPreviousMonth" />
        <h4 class="text-xl sm:text-2xl font-bold mx-5 min-w-[7rem] sm:min-w-[9rem] text-center">
          {{ monthDetails.monthName }}
        </h4>
        <SideButton direction="right" @click="goToNextMonth" />
      </div>
    </div>
    <TagFilter />

    <div class="flex flex-col gap-4 sm:gap-8">
      <WeekInAMonth v-for="week in weeksOfMonth" :key="week.weekNumber" :week="week" />
    </div>
  </div>
</template>
