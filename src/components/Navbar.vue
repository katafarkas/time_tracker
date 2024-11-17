<script setup lang="ts">
import { RouterLink, useRoute } from "vue-router";

// Functions
const isActiveLink = (routePath: string) => {
  const route = useRoute();
  return route.path === routePath;
};
</script>

<script lang="ts">
export default {};
</script>

<template>
  <nav class="fixed top-0 w-full bg-main border-b border-darker z-50">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="flex h-20 items-center justify-between">
        <div
          class="flex flex-1 items-center justify-center md:items-stretch md:justify-start"
        >
          <RouterLink class="flex flex-shrink-0 items-center mr-4" to="/">
            <img
              class="h-10 w-auto"
              src="../assets/img/logo.svg"
              alt="Time Tracker"
            />

            <span class="hidden md:block text-white text-3xl font-bold ml-2"
              >Time Tracker</span
            >
          </RouterLink>

          <div class="md:ml-auto">
            <div class="flex space-x-2">
              <RouterLink
                to="/"
                :class="[
                  isActiveLink('/')
                    ? 'bg-lighter'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                  'text-lg',
                  'font-semibold',
                ]"
                >Home</RouterLink
              >

              <RouterLink
                to="/time-reports"
                :class="[
                  isActiveLink('/time-reports')
                    ? 'bg-lighter'
                    : 'hover:bg-gray-900 hover:text-white',
                  'text-white',
                  'rounded-md',
                  'px-3',
                  'py-2',
                  'text-lg',
                  'font-semibold',
                ]"
                >Time reports</RouterLink
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
