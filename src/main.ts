import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { DatePicker } from "v-calendar";
import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import "v-calendar/style.css";
import { definePreset } from "@primevue/themes";
import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const app = createApp(App);

const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{indigo.50}",
      100: "{indigo.100}",
      200: "{indigo.200}",
      300: "{indigo.300}",
      400: "{indigo.400}",
      500: "{indigo.500}",
      600: "{indigo.600}",
      700: "{indigo.700}",
      800: "{indigo.800}",
      900: "{indigo.900}",
      950: "{indigo.950}",
    },
  },
});

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      darkModeSelector: "none",
    },
  },
});

app.use(Vue3Toastify, {
  autoClose: 3000,
} as ToastContainerOptions);
app.component("VDatePicker", DatePicker);
app.mount("#app");
