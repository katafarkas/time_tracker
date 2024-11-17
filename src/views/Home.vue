<script setup lang="ts">
import { computed, provide, ref, watch } from "vue";
import AddTimeReportButton from "../components/AddTimeReportButton.vue";
import DayInAWeek from "../components/weekly/DayInAWeek.vue";
import { filteredEntries } from "../store/LocalStorageStore";
import { weekdays, Entry } from "../utils/Interfaces";
import Modal from "../components/Modal.vue";
import TagFilter from "../components/TagFilter.vue";

// Refs
const isModalVisible = ref(false);
const entryToModifyId = ref("");
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

const entriesOnTheSelectedDay = computed(() => {
  const entryArray = filteredEntries.value;
  return entryArray?.filter(
    (entry: Entry) => entry.date === formattedDate.value
  );
});

const selectedDayName = computed(() => {
  let dayIndex = selectedDate.value.getDay() - 1;

  // Monday - Sunday fix
  if (dayIndex < 0) {
    dayIndex = 6;
  }

  return weekdays[dayIndex];
});

// Functions
const showModal = (id?: string) => {
  if (id) {
    entryToModifyId.value = id;
  } else {
    entryToModifyId.value = "";
  }
  isModalVisible.value = true;
};

provide("showModal", showModal);

const closeModal = () => {
  entryToModifyId.value = "";
  isModalVisible.value = false;
};

// Watch
watch(isModalVisible, (newValue) => {
  if (newValue) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
});
</script>

<template>
  <div
    class="mx-auto max-w-7xl px-2 pt-10 sm:px-6 lg:px-8 mb-10 text-gray-700 transition-all duration-300"
  >
    <div class="flex flex-col sm:flex-row justify-between items-center mb-8">
      <div
        class="flex flex-col sm:flex-row justify-start items-center gap-5 mb-5 sm:mb-0"
      >
        <h2 class="text-2xl font-bold">Welcome!</h2>
        <p class="text-xl font-semibold">How are you today?</p>
      </div>
      <AddTimeReportButton @click="showModal()" />
    </div>
    <div
      class="flex flex-col md:flex-row items-center justify-between md:items-start gap-5"
    >
      <VDatePicker v-model="selectedDate" mode="date" hide-time-header />
      <div class="w-full">
        <TagFilter />
        <DayInAWeek
          :day="{
            name: selectedDayName,
            date: formattedDate,
            entries: entriesOnTheSelectedDay,
          }"
          :is-monthly-view="false"
          :is-daily-view="true"
        />
      </div>
    </div>

    <Modal
      :is-modal-visible="isModalVisible"
      @close-modal="closeModal"
      :entry-to-modify-id="entryToModifyId"
    />
  </div>
</template>
