import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { getList } from '@/api/poligons'
import { getVillagesByCoords } from '@/api/nominatimApi'
import type { NominatimPlace } from '@/api/types/nominatim'

export const useVillagesStore = defineStore('villages', () => {
  const villages: Ref<NominatimPlace[]> = ref([])
  const isLoaded = ref(false)

  const loadVillages = async () => {
    if (isLoaded.value) return
    const poligons = await getList()

    const village = await getVillagesByCoords(poligons)
    villages.value = village
    isLoaded.value = true
  }

  return {
    villages,
    isLoaded,
    loadVillages,
  }
})
