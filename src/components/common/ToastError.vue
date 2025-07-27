<script setup lang="ts">
import { useToastStore } from '@/stores/useToastStore'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()
const { message, visible } = storeToRefs(toastStore)
</script>

<template>
  <div
    v-if="visible"
    class="fixed bottom-7 left-6 bg-red-400/90 text-white px-4 py-3 rounded shadow transition-opacity duration-500 z-50"
  >
    {{ message }}
  </div>
</template>
