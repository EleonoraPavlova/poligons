import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { getVillageDetails } from '@/api/nominatimApi'
import type { NominatimPlaceWithGeojson } from '@/api/types/nominatim'
import { useToastStore } from '@/stores/useToastStore.ts'

export const useVillageStore = defineStore('village', () => {
  const isLoaded = ref(false)
  const villageDetails: Ref<NominatimPlaceWithGeojson | null> = ref(null)
  const toast = useToastStore()

  const loadVillage = async (villageId: string) => {
    isLoaded.value = false
    try {
      villageDetails.value = await getVillageDetails(villageId)
      isLoaded.value = true
    } catch (error) {
      console.error('Error loading village:', error)
      toast.showToast('Error loading village')
    }
  }

  return {
    loadVillage,
    isLoaded,
    villageDetails,
  }
})
