import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

import { getList, type Polygon } from '@/api/poligons'
import { useToastStore } from '@/stores/useToastStore'

export const usePoligonsStore = defineStore('poligons', () => {
  const isLoaded = ref(false)
  const poligons: Ref<Polygon[]> = ref([])
  const toast = useToastStore()

  const loadPoligons = async () => {
    if (isLoaded.value) return
    try {
      poligons.value = await getList()
      isLoaded.value = true
    } catch (e) {
      console.error('Error loading polygons:', e)
      toast.showToast('Error loading polygons')
    }
  }

  return {
    poligons,
    isLoaded,
    loadPoligons,
  }
})
