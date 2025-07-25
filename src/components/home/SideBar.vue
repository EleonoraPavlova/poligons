<script setup lang="ts">
import { useVillagesStore } from '@/stores/useVillagesStore'
import { computed, ref } from 'vue'

import TextField from '../common/TextField.vue'

const villagesStore = useVillagesStore()
const isLoadingVillages = computed(() => !villagesStore.isLoaded)

const searchquery = ref('')

const filteredVillages = computed(() => {
  return villagesStore.villages.filter((village) =>
    village.name.toLowerCase().includes(searchquery.value.toLowerCase()),
  )
})
</script>
<template>
  <div v-if="isLoadingVillages">Loading...</div>
  <div v-else class="grid gap-4 h-full grid-rows-[max-content_1fr] overflow-hidden">
    <TextField
      v-model:model-value="searchquery"
      placeholder="Search villages..."
      :disabled="isLoadingVillages"
    />
    <ul class="p-2 overflow-y-auto">
      <li v-for="village in filteredVillages" :key="village.osm_id" class="mb-2 border p-2">
        <router-link :to="{ name: 'village', params: { villageId: village.osm_id } }">
          <div class="font-bold">
            {{ village.name }}
          </div>
          <div>{{ village.address.country }}, {{ village.address.state }}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>
