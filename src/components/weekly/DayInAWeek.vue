<script lang="ts" setup>
import { computed, ref } from "vue";
import TaskInADay from "./TaskInADay.vue";
import { Entry, Day } from "../../utils/Interfaces";

// Props
const props = defineProps<{
  day: Day;
  isMonthlyView: boolean;
  isDailyView: boolean;
}>();

// Refs
const selectedDate = ref(new Date());

// Computed
const formattedDate = computed(() => {
  return `${selectedDate.value.getFullYear()}-${(
    selectedDate.value.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${selectedDate.value
      .getDate()
      .toString()
      .padStart(2, "0")}`;
});

const classForADay = computed(() => {
  let classToAdd = ""

  // is Monthly view
  classToAdd += props.isMonthlyView ? '' : ' p-5 '

  // is today
  classToAdd += props.day.date == formattedDate.value && !props.isDailyView ? 'border-2 border-main' : ''
  return classToAdd
})

const entriesToday = computed(() => {
  const entryArray = props.day.entries;
  const filteredEntries = entryArray?.filter(
    (entry: Entry) => entry.date === props.day.date
  );

  // Sort the entries by their startTime (which is a string in "hh:mm" format)
  const sortedEntries = filteredEntries?.sort((a, b) => {
    const timeA = a.startTime; // Assuming startTime is in "hh:mm" format
    const timeB = b.startTime;

    // Convert to minutes for easier comparison
    const [hourA, minuteA] = timeA.split(":").map(Number);
    const [hourB, minuteB] = timeB.split(":").map(Number);

    // Compare the times in terms of minutes
    return hourA * 60 + minuteA - (hourB * 60 + minuteB);
  });

  return sortedEntries;
});

const duration = computed(() => {
  const totalMinutes = entriesToday.value.reduce((sum, entry) => {
    const [hours, minutes] = entry.duration.split(":").map(Number);
    return sum + hours * 60 + minutes;
  }, 0);

  // Convert total minutes back to "HH:MM" format
  const totalHours = Math.floor(totalMinutes / 60);
  const remainingMinutes = totalMinutes % 60;

  // Format as "HH:MM"
  return `${String(totalHours).padStart(2, "0")}:${String(
    remainingMinutes
  ).padStart(2, "0")}`;
});
</script>

<script lang="ts">
export default {};
</script>

<template>
  <div class="bg-lightest rounded-md" :class="classForADay">
    <div v-if="props.isMonthlyView" class="bg-white rounded-md p-2 flex justify-between">
      <h3 class="text-base sm:text-lg">{{ props.day.name }} {{ props.day.date }}</h3>
      <h3 class="text-base sm:text-lg">{{ duration }}</h3>
    </div>
    <div v-else class="flex justify-between" :class="{ 'mb-5': entriesToday.length > 0 }">
      <div class="flex flex-col sm:flex-row gap-2">
        <h5 v-if="props.isDailyView" class="text-lg font-semibold">
          Time Reports for
        </h5>
        <div class="flex flex-col sm:flex-row gap-2">
          <h4 class="text-lg sm:text-xl font-bold">{{ props.day.name }}</h4>
          <span class="text-xl font-bold hidden sm:block">-</span>
          <h4 class="text-base sm:text-lg font-bold">{{ props.day.date }}</h4>
        </div>
      </div>
      <div>
        <h4 class="text-lg font-bold">{{ duration }}</h4>
      </div>
    </div>
    <div v-if="!props.isMonthlyView" class="flex flex-col gap-3">
      <TaskInADay v-for="entry in entriesToday" :key="entry.id" :entry="entry" :is-monthly-view="props.isMonthlyView"
        :is-daily-view="props.isDailyView" />
    </div>
  </div>
</template>
