<script setup lang="ts">
import LeafletMap from '../common/LeafletMap.vue'
</script>

<template>
  <div class="min-h-[450px]">
    <LeafletMap :show-polygons="false" :highlight-village="true" />
  </div>
</template>
