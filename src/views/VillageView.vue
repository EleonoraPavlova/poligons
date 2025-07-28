<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useVillageStore } from '@/stores/useVillageStore'
import VillageContent from '@/components/village/VillageContent.vue'
import BaseLoader from '@/components/layouts/BaseLoader.vue'

const route = useRoute()
const villageStore = useVillageStore()
villageStore.loadVillage(route.params.villageId as string)

const isLoading = !villageStore.isLoaded
</script>

<template>
  <BaseLoader v-if="isLoading"/>
  <VillageContent />
</template>
