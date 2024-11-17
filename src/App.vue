<script setup lang="ts">
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="h-screen relative">
    <Navbar />
    <div class="min-h-screen pt-[80px]" :style="{ minHeight: 'calc(100vh - 80px)' }">
      <RouterView />
    </div>
    <Footer />
  </div>
</template>
