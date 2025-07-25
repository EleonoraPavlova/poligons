<script setup lang="ts">
import { computed } from 'vue'
import LeafletMap from '../common/LeafletMap.vue'
import { usePoligonsStore } from '@/stores/usePoligonsStore'

const poligonsStore = usePoligonsStore()
poligonsStore.loadPoligons()

const isLoading = computed(() => !poligonsStore.isLoaded)
// const details = computed(() => villageStore.villageDetails)
</script>

<template>
  <div class="w-xl h-xl">
    <div v-if="isLoading">Loading...</div>
    <LeafletMap v-else :show-polygons="true" :highlight-village="false" />
  </div>
</template>
