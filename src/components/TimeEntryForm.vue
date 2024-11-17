<script setup lang="ts">
import { ref, watch } from "vue";
import {
  addTimeEntry,
  updateTimeEntry,
  projects,
  customers,
  entries,
  addProject,
  addCustomer,
} from "../store/LocalStorageStore";
import { Entry, Project, Customer } from "../utils/Interfaces";
import Select from "primevue/select";

// Props
const props = defineProps<{
  id?: string;
}>();

// Refs
const name = ref("");
const selectedProject = ref();
const selectedCustomer = ref();
const startTime = ref(new Date());
const endTime = ref(new Date());
const date = ref(new Date());
const newProject = ref("");
const newCustomer = ref("");
const projectsList = ref<Project[]>(projects.value);
const customerList = ref<Customer[]>(customers.value);
const emit = defineEmits(["closeModal"]);

// Functions
const findEntryById = (id: string): Entry | undefined => {
  return entries.value.find((entry) => entry.id === id);
};

const populateFormWithEntry = (entry: Entry) => {
  name.value = entry.name;
  startTime.value = new Date(`${entry.date}T${entry.startTime}`);
  endTime.value = new Date(`${entry.date}T${entry.endTime}`);
  date.value = new Date(entry.date);
};

const addOrUpdateTimeEntry = () => {
  if (!startTime.value || !endTime.value) {
    alert("Start Time and End Time are required!");
    return;
  }

  if (startTime.value > endTime.value) {
    alert("Start Time should not be greater than End Time!");
    return;
  }

  const formattedDate = `${date.value.getFullYear()}-${(
    date.value.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${date.value.getDate().toString().padStart(2, "0")}`;

  const newEntry: Entry = {
    id: props.id || crypto.randomUUID(), // If there's an ID passed, update; otherwise, create new entry
    name: name.value,
    project: selectedProject.value ? selectedProject.value.name : "",
    customer: selectedCustomer.value ? selectedCustomer.value.name : "",
    startTime: startTime.value.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    endTime: endTime.value.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    date: formattedDate,
    createdAt: new Date().toISOString(),
    duration: calculateDuration(startTime.value, endTime.value),
  };

  if (props.id) {
    updateTimeEntry(newEntry);
  } else {
    addTimeEntry(newEntry);
  }

  resetForm();
  emit("closeModal");
};

const calculateDuration = (start: Date, end: Date): string => {
  const diffMs = end.getTime() - start.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMinutes / 60);
  const minutes = diffMinutes % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

const addNewProject = async () => {
  if (newProject.value !== "") {
    const projectToAdd: Project = {
      id: crypto.randomUUID(),
      name: newProject.value.trim(),
    };
    await addProject(projectToAdd);
    newProject.value = "";
  }
};

const addNewCustomer = async () => {
  if (newCustomer.value !== "") {
    const customerToAdd: Customer = {
      id: crypto.randomUUID(),
      name: newCustomer.value.trim(),
    };
    await addCustomer(customerToAdd);
    newCustomer.value = "";
  }
};

const resetForm = () => {
  name.value = "";
  selectedProject.value = "";
  selectedCustomer.value = "";
  startTime.value = new Date();
  endTime.value = new Date();
};

// Watch
watch(
  () => props.id,
  (newId) => {
    if (newId) {
      const entryToEdit = findEntryById(newId);
      if (entryToEdit) {
        populateFormWithEntry(entryToEdit);
      }
    }
  },
  { immediate: true }
);
</script>

<script lang="ts">
export default {};
</script>

<template>
  <div
    class="relative bg-white w-[90%] lg:w-[80%] xl:w-[70%] 2xl:w-[60%] max-w-7xl flex flex-col md:flex-row justify-between items-center gap-10 rounded-2xl p-10 my-10"
  >
    <button
      type="button"
      @click="$emit('closeModal')"
      class="absolute top-1 right-1"
    >
      <img
        class="h-10 w-auto"
        src="../assets/img/cross.svg"
        alt="Close Modal"
      />
    </button>
    <VDatePicker
      v-model="date"
      mode="date"
      hide-time-header
      class="mt-5 md:mt-0"
    />

    <form
      @submit.prevent="addOrUpdateTimeEntry"
      class="space-y-4 w-full flex flex-col"
    >
      <div
        class="w-full flex flex-col items-center lg:flex-row lg:items-start gap-5"
      >
        <input
          v-model="name"
          placeholder="Task Name"
          data-testid="task-name-input"
          class="input w-full"
          required
        />
        <div class="w-max flex items-center gap-2">
          <VDatePicker
            v-model="startTime"
            mode="time"
            hide-time-header
            is24hr
          />
          <span class="text-3xl font-bold">-</span>
          <VDatePicker v-model="endTime" mode="time" hide-time-header is24hr />
        </div>
      </div>

      <div class="w-full flex flex-col gap-4 md:grid md:grid-cols-10">
        <div class="col-span-10 md:col-span-5">
          <Select
            v-model="selectedProject"
            :options="projectsList"
            optionLabel="name"
            placeholder="Select a Project"
            class="w-full h-14 flex items-center"
          />
        </div>

        <div class="flex gap-2 flex-row md:col-span-5">
          <input
            v-model="newProject"
            placeholder="New Project"
            class="input w-full"
          />
          <button
            type="button"
            @click="addNewProject"
            class="btn flex justify-center"
          >
            <img
              class="h-5 w-auto"
              src="../assets/img/plus-icon.svg"
              alt="Plus Button"
            />
          </button>
        </div>
      </div>

      <div class="w-full flex flex-col gap-4 md:grid md:grid-cols-10">
        <div class="col-span-10 md:col-span-5">
          <Select
            v-model="selectedCustomer"
            :options="customerList"
            optionLabel="name"
            placeholder="Select a Customer"
            class="w-full h-14 flex items-center"
          />
        </div>

        <div class="flex gap-2 flex-row md:col-span-5">
          <input
            v-model="newCustomer"
            placeholder="New Customer"
            class="input w-full"
          />
          <button
            type="button"
            @click="addNewCustomer"
            class="btn flex justify-center"
          >
            <img
              class="h-5 w-auto"
              src="../assets/img/plus-icon.svg"
              alt="Plus Button"
            />
          </button>
        </div>
      </div>

      <button
        type="submit"
        class="btn font-bold"
        data-testid="submit-time-entry-button"
      >
        Add/Update Time Report
      </button>
    </form>
  </div>
</template>

<style scoped>
.input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  height: 3.5rem;
}

.btn {
  background-color: #1d4ed8;
  color: white;
  padding: 1rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
