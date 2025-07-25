<script setup lang="ts">
import { RouterView } from 'vue-router'
import 'leaflet/dist/leaflet.css'
</script>

<template>
  <div class="grid grid-cols-[1fr_4fr] h-full w-full">
    <RouterView name="sidebar" />
    <RouterView />
  </div>
</template>

<style>
@import 'tailwindcss';

body {
  width: 100%;
  height: 100%;
}

#app {
  width: 100%;
  height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}
</style>
