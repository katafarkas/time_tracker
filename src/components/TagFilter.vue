<script lang="ts" setup>
import { ref, watch, computed, onMounted } from 'vue';
import { projects, customers, updateCustomerFilter, updateProjectFilter } from '../store/LocalStorageStore';
import Select from 'primevue/select';
import type { Project, Customer } from '../utils/Interfaces';

// Refs
const selectedProject = ref<Project | null>(null);
const selectedCustomer = ref<Customer | null>(null);

// Computed
const projectsWithNoFilter = computed(() => [
    { id: '', name: 'No Filter' } as Project,
    ...projects.value
]);

const customersWithNoFilter = computed(() => [
    { id: '', name: 'No Filter' } as Customer,
    ...customers.value
]);

// Functions
const normalizeQuotes = (str: string) => {
    return str.replace(/['"]+/g, '').replace(/\s/g, '');
};

// On mounted
onMounted(() => {
    const storedProjectFilter = localStorage.getItem('projectFilter');
    const storedCustomerFilter = localStorage.getItem('customerFilter');

    if (storedProjectFilter) {
        const normalizedStoredProjectFilter = normalizeQuotes(storedProjectFilter);
        selectedProject.value = projects.value.find(
            (project) => normalizeQuotes(project.name) === normalizedStoredProjectFilter
        ) || null;
    }

    if (storedCustomerFilter) {
        const normalizedStoredCustomerFilter = normalizeQuotes(storedCustomerFilter);
        selectedCustomer.value = customers.value.find(
            (customer) => normalizeQuotes(customer.name) === normalizedStoredCustomerFilter
        ) || null;
    }
});

// Watch
watch(selectedProject, (newValue) => {
    if (newValue && newValue.name === 'No Filter') {
        selectedProject.value = null;
    }
    updateProjectFilter(selectedProject.value);
});

watch(selectedCustomer, (newValue) => {
    if (newValue && newValue.name === 'No Filter') {
        selectedCustomer.value = null;
    }
    updateCustomerFilter(selectedCustomer.value);
});
</script>

<script lang="ts">
export default {};
</script>

<template>
    <div class="w-full flex mb-5 gap-5">
        <div class="flex-1">
            <Select v-model="selectedProject" :options="projectsWithNoFilter" optionLabel="name"
                placeholder="Filter by Project" class="w-full h-14 flex items-center" />
        </div>
        <div class="flex-1">
            <Select v-model="selectedCustomer" :options="customersWithNoFilter" optionLabel="name"
                placeholder="Filter by Customer" class="w-full h-14 flex items-center" />
        </div>
    </div>
</template>
