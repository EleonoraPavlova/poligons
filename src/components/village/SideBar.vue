<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
import { useVillageStore } from '@/stores/useVillageStore'
import { computed } from 'vue'
const villageStore = useVillageStore()

const loading = computed(() => !villageStore.isLoaded)
const details = computed(() => villageStore.villageDetails)
</script>

<template>
  <div v-if="!loading" class="flex flex-col justify-between">
    <div>
      <div>{{ route.params.villageId }}</div>

      <div>{{ details?.name || 'Unknown' }}</div>
      <div>{{ details?.address.country || 'Unknown' }}</div>
      <div>{{ details?.address.state || 'Unknown' }}</div>
      <div>{{ details?.address.municipality || 'Unknown' }}</div>
      <div>{{ details?.address.district || 'Unknown' }}</div>
    </div>
    <RouterLink :to="{ name: 'home' }">Back to Home</RouterLink>
  </div>
  <div v-else>Loading...</div>
</template>
