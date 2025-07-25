import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { getVillageDetails } from '@/api/nominatimApi'
import type { NominatimPlaceWithGeojson } from '@/api/types/nominatim'

export const useVillageStore = defineStore('village', () => {
  const isLoaded = ref(false)
  const villageDetails: Ref<NominatimPlaceWithGeojson | null> = ref(null)

  const loadVillage = async (villageId: string) => {
    isLoaded.value = false
    villageDetails.value = await getVillageDetails(villageId)
    isLoaded.value = true
  }

  return {
    loadVillage,
    isLoaded,
    villageDetails
  }
})
