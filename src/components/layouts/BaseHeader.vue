<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ROUTES } from '@/router/routers.js'

const router = useRouter()

const goToHome = () => {
  router.push({ name: ROUTES.HOME.name })
}
</script>

<template>
  <header class="w-full flex items-center justify-between p-4 bg-white shadow-md sticky top-0">
    <div class="flex items-center space-x-3 cursor-pointer" @click="goToHome">
      <img src="@/assets/logo.png" alt="Logo" class="h-10 w-10 object-contain" />
      <div>
        <h1 class="text-xl font-bold text-gray-800">My map</h1>
        <p class="text-sm text-gray-500">Making maps better, polygon by polygon</p>
      </div>
    </div>
  </header>
</template>
