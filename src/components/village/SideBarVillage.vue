<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
import { useVillageStore } from '@/stores/useVillageStore'
import { computed } from 'vue'
import { ROUTES } from '@/router/routers.ts'
import PolyButton from '@/components/common/PolyButton.vue'
const villageStore = useVillageStore()

const details = computed(() => villageStore.villageDetails)
</script>

<template>
  <ul class="flex flex-col gap-3">
    <li><PolyButton tag="RouterLink" :to="ROUTES.HOME.path" icon="⬅️">to home</PolyButton></li>
    <li>
      {{ route.params.villageId }}
      <span class="font-bold pl-3"> {{ details?.address.country || 'Unknown' }}</span>
    </li>
    <li>{{ details?.name || 'Unknown' }}</li>
    <li>{{ details?.address.district || 'Unknown' }}</li>
    <li>
      {{ details?.address.state || 'Unknown' }}
      <span class="font-bold"> ({{ details?.address.country_code || 'Unknown' }}) </span>
    </li>
  </ul>
</template>
