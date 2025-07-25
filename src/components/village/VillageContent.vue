<script setup lang="ts">
import LeafletMap from '../common/LeafletMap.vue'
</script>

<template>
  <div class="p-4">
    <leaflet-map :show-polygons="false" :highlight-village="true" />
  </div>
</template>
