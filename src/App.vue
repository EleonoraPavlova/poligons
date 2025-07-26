<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseLayout from './components/layouts/BaseLayout.vue'
import 'leaflet/dist/leaflet.css'
</script>

<template>
  <BaseLayout>
    <div class="grid grid-cols-[1fr_4fr] h-full w-full gap-8">
      <RouterView name="sidebar" />
      <RouterView />
    </div>
  </BaseLayout>
</template>
