<script setup lang="ts">
import LeafletMap from '../common/LeafletMap.vue'
</script>

<template>
  <div class="h-[600px]">
    <LeafletMap :show-polygons="true" :highlight-village="false" />
  </div>
</template>
