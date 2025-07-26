<template>
  <div class="w-full h-1 bg-gray-200 overflow-hidden relative">
    <div
      class="absolute top-0 h-full w-1/3 -left-1/3 animate-loader-bar bg-gradient-to-r from-gray-100 via-gray-300 to-gray-300 bg-[length:200%_100%]"
    ></div>
  </div>
</template>

<style scoped>
@keyframes loader-bar {
  0% {
    left: -33.3333%;
    background-position: -100% 0;
  }
  100% {
    left: 100%;
    background-position: 100% 0;
  }
}

.animate-loader-bar {
  animation: loader-bar 1.5s infinite linear;
}
</style>
