import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { getList, type Polygon } from '@/api/poligons'

export const usePoligonsStore = defineStore('poligons', () => {
  const isLoaded = ref(false)
  const poligons: Ref<Polygon[]> = ref([])
  const loadPoligons = async () => {
    if (isLoaded.value) return
    poligons.value = await getList()
    isLoaded.value = true
  }

  return {
    poligons,
    isLoaded,
    loadPoligons,
  }
})
