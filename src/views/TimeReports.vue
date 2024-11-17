<script lang="ts" setup>
import { provide, ref, watch } from "vue";

import TimeReportMonthlyView from "../components/monthly/TimeReportMonthlyView.vue";
import TimeReportWeeklyView from "../components/weekly/TimeReportWeeklyView.vue";
import { filteredEntries } from "../store/LocalStorageStore";
import AddTimeReportButton from "../components/AddTimeReportButton.vue";
import Modal from "../components/Modal.vue";

// Refs
const isModalVisible = ref(false);
const entryToModifyId = ref("");
const activeTab = ref("weekly");

// Functions
const showModal = (id?: string) => {
  if (id) {
    entryToModifyId.value = id
  } else {
    entryToModifyId.value = ''
  }
  isModalVisible.value = true;
};

provide("showModal", showModal);

const closeModal = () => {
  isModalVisible.value = false;
};

const setActiveTab = (tab: string) => {
  activeTab.value = tab;
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
  <div class="mx-auto max-w-7xl px-2 pt-10 sm:px-6 lg:px-8 text-gray-700">
    <div class="flex justify-between">
      <div>
        <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 ml-2">
          <li class="me-2">
            <a href="#" aria-current="page" :class="[
              activeTab === 'weekly'
                ? 'bg-darker text-white rounded-t-lg active '
                : 'hover:text-white hover:bg-gray-900',
              'inline-block p-4 rounded-t-lg',
            ]" @click.prevent="setActiveTab('weekly')">
              Weekly
            </a>
          </li>
          <li class="me-2">
            <a href="#" :class="[
              activeTab === 'monthly'
                ? 'bg-darker text-white rounded-t-lg active '
                : 'hover:text-white hover:bg-gray-900',
              'inline-block p-4 rounded-t-lg',
            ]" @click.prevent="setActiveTab('monthly')">
              Monthly
            </a>
          </li>
        </ul>
      </div>
      <AddTimeReportButton @click="showModal" />
    </div>

    <div class="relative p-[20px] border border-blue-900 rounded-lg mb-20">
      <TimeReportWeeklyView v-if="activeTab === 'weekly'" :entries="filteredEntries" />
      <TimeReportMonthlyView v-if="activeTab === 'monthly'" :entries="filteredEntries" />
    </div>

    <Modal :is-modal-visible="isModalVisible" @close-modal="closeModal" :entry-to-modify-id="entryToModifyId" />
  </div>
</template>
