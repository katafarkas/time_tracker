<script lang="ts" setup>
import TimeEntryForm from "./TimeEntryForm.vue";

// Props
const props = defineProps<{ isModalVisible: boolean, entryToModifyId?: string }>();  // Optional entryId prop to pass to form
defineEmits(["closeModal"]);
</script>

<script lang="ts">
export default {};
</script>

<template>
  <div v-if="props.isModalVisible" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="absolute inset-0 bg-black bg-opacity-50" @click="$emit('closeModal')"></div>

    <div class="relative w-full h-full overflow-y-auto flex justify-center items-start md:items-center">
      <TimeEntryForm :id="props.entryToModifyId" @closeModal="$emit('closeModal', $event)" />
    </div>
  </div>
</template>
