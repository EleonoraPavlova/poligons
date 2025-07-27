import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { getList } from '@/api/poligons'
import { getVillagesByCoords } from '@/api/nominatimApi'
import type { NominatimPlace } from '@/api/types/nominatim'
import { useToastStore } from '@/stores/useToastStore.ts'

export const useVillagesStore = defineStore('villages', () => {
  const villages: Ref<NominatimPlace[]> = ref([])
  const isLoaded = ref(false)
  const toast = useToastStore()

  const loadVillages = async () => {
    if (isLoaded.value) return
    try {
      const poligons = await getList()
      await getVillagesByCoords(poligons, (village) => {
        villages.value.push(village)
      })
      isLoaded.value = true
    } catch (error) {
      console.error('Error loading villages:', error)
      toast.showToast('Error loading villages')
    }
  }

  return {
    villages,
    isLoaded,
    loadVillages,
  }
})
