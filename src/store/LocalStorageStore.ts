import { ref, computed } from "vue";
import type { Entry, Project, Customer } from "../utils/Interfaces";
import { toast } from 'vue3-toastify';

export const entries = ref<Entry[]>(
  JSON.parse(localStorage.getItem("entries") || "[]")
);

export const projects = ref<Project[]>(
  JSON.parse(localStorage.getItem("projects") || "[]")
);

export const customers = ref<Customer[]>(
  JSON.parse(localStorage.getItem("customers") || "[]")
);

export const customerFilter = ref<string | null>(
  JSON.parse(localStorage.getItem("customerFilter") || "null")
);

export const projectFilter = ref<string | null>(
  JSON.parse(localStorage.getItem("projectFilter") || "null")
);

export const addTimeEntry = (newEntry: Entry) => {
  entries.value.push(newEntry);

  toast.success("New time entry added successfully!", {
    position: toast.POSITION.BOTTOM_RIGHT,
  });

  saveDataToLocalStorage();
};

export const updateTimeEntry = (updatedEntry: Entry) => {
  const entryIndex = entries.value.findIndex((entry: Entry) => entry.id === updatedEntry.id);

  if (entryIndex !== -1) {
    entries.value[entryIndex] = updatedEntry;

    toast.info("Time entry updated successfully!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

    saveDataToLocalStorage();
  } else {
    console.error('Entry with the given ID not found.');
  }
};

export const addProject = (newProject: Project) => {
  projects.value.push(newProject);
  toast.success("New project added successfully!", {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  saveDataToLocalStorage();
};

export const addCustomer = (newCustomer: Customer) => {
  customers.value.push(newCustomer);
  toast.success("New customer added successfully!", {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  saveDataToLocalStorage();
};

export const deleteTimeEntry = (id: string) => {
  const index = entries.value.findIndex((entry) => entry.id === id);
  if (index !== -1) {
    entries.value.splice(index, 1);
  }

  toast.success("Time entry deleted successfully!", {
    position: toast.POSITION.BOTTOM_RIGHT,
  });
  saveDataToLocalStorage();
};

export const updateCustomerFilter = (customer: Customer | null) => {
  customerFilter.value = customer ? customer.name : null;
  saveDataToLocalStorage();
};

export const updateProjectFilter = (project: Project | null) => {
  projectFilter.value = project ? project.name : null;
  saveDataToLocalStorage();
};

export const saveDataToLocalStorage = () => {
  localStorage.setItem("entries", JSON.stringify(entries.value));
  localStorage.setItem("projects", JSON.stringify(projects.value));
  localStorage.setItem("customers", JSON.stringify(customers.value));
  localStorage.setItem("customerFilter", JSON.stringify(customerFilter.value));
  localStorage.setItem("projectFilter", JSON.stringify(projectFilter.value));
};

export const filteredEntries = computed(() => {
  return entries.value.filter((entry) => {

    const matchesCustomer = customerFilter.value
      ? entry.customer === customerFilter.value
      : true;

    const matchesProject = projectFilter.value
      ? entry.project === projectFilter.value
      : true;

    return matchesCustomer && matchesProject;
  });
});
