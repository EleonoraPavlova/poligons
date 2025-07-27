<script setup lang="ts">
import { computed, ref } from 'vue'

import TextField from '../common/TextField.vue'
import { useVillagesStore } from '@/stores/useVillagesStore.ts'
import { ROUTES } from '@/router/routers.ts'

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
  <div class="grid gap-4 h-full grid-rows-[max-content_1fr] sm:min-h-0 min-h-[250px]">
    <TextField
      v-model:model-value="searchquery"
      placeholder="Search villages..."
      :disabled="isLoadingVillages"
      name="search"
    />
    <ul class="overflow-y-auto h-full min-h-0 flex flex-col gap-3">
      <li
        v-for="village in filteredVillages"
        :key="village.osm_id"
        class="border-gray-300 border rounded p-2"
      >
        <router-link :to="{ name: ROUTES.VILLAGE.name, params: { villageId: village.osm_id } }">
          <span class="font-bold">
            {{ village.name }}
          </span>
          <p>{{ village.address.country }}, {{ village.address.state }}</p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
