<script setup lang="ts">
import BaseHeader from './BaseHeader.vue'
import BaseFooter from './BaseFooter.vue'
import BaseLoader from '@/components/layouts/BaseLoader.vue'
import { computed } from 'vue'
import { usePoligonsStore } from '@/stores/usePoligonsStore.ts'
import { useVillagesStore } from '@/stores/useVillagesStore.ts'
import ToastError from '@/components/common/ToastError.vue'

const poligonsStore = usePoligonsStore()
poligonsStore.loadPoligons()

const villagesStore = useVillagesStore()
villagesStore.loadVillages()

const isLoading = computed(() => [poligonsStore, villagesStore].some((store) => !store.isLoaded))
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <BaseHeader />
    <BaseLoader v-if="isLoading" />
    <main class="p-6 mx-2 h-[calc(100vh-160px)] overflow-y-auto">
      <slot />
    </main>
    <BaseFooter />
    <ToastError />
  </div>
</template>
