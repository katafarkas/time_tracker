<script lang="ts" setup>
import { inject } from "vue";
import { deleteTimeEntry } from "../../store/LocalStorageStore";
import { Entry } from "../../utils/Interfaces";

// Props
const props = defineProps<{
  entry: Entry;
  isMonthlyView: boolean;
  isDailyView: boolean;
}>();

// Functions
const showModal = inject<(id?: string) => void>("showModal");

const openModalWithId = () => {
  if (showModal) {
    showModal(props.entry.id);
  }
};
</script>

<script lang="ts">
export default {};
</script>

<template>
  <div @click="openModalWithId()"
    class="task-in-a-day bg-white rounded-md flex justify-between cursor-pointer hover:bg-lighter transition-all"
    :class="isMonthlyView ? '' : 'p-2'">
    <div class="flex flex-col sm:flex-row justify-start items-center gap-1 sm:gap-5">
      <h3 class="text-base sm:text-lg">{{ props.entry.name }}</h3>
      <div class="flex gap-3">
        <div v-if="props.entry.project" class="h-max w-max p-2 rounded-md bg-blue-100">
          <p class="text-xs sm:text-sm font-semibold">
            {{ props.entry.project }}
          </p>
        </div>
        <div v-if="props.entry.customer" class="h-max w-max p-2 rounded-md bg-violet-100">
          <p class="text-xs sm:text-sm font-semibold">
            {{ props.entry.customer }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex items-center gap-2">
      <h3 class="text-base sm:text-lg">
        {{ props.entry.startTime }} - {{ props.entry.endTime }}
      </h3>
      <button data-testid="delete-time-entry-button" type="button" @click.stop="deleteTimeEntry(props.entry.id)">
        <img class="h-5 sm:h-8 w-auto" src="../../assets/img/cross.svg" alt="Delete" />
      </button>
    </div>
  </div>
</template>
