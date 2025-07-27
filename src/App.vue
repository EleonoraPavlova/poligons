<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseLayout from './components/layouts/BaseLayout.vue'
import 'leaflet/dist/leaflet.css'
</script>

<template>
  <BaseLayout>
    <div class="grid w-full h-full gap-8 min-h-0 grid-cols-1 sm:grid-cols-[1fr_4fr]">
      <RouterView name="sidebar" />
      <RouterView />
    </div>
  </BaseLayout>
</template>
