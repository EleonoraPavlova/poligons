<script setup lang="ts">
import BaseHeader from './BaseHeader.vue'
import BaseFooter from './BaseFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <BaseHeader />
    <main>
      <slot />
    </main>
    <BaseFooter />
  </div>
</template>

<style scoped></style>
