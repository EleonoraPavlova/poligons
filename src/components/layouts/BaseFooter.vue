<template>
  <footer
    class="w-full bg-white/30 backdrop-blur-md text-gray-600 py-4 px-3 mt-1 sm:mt-auto shadow-md border-t border-white/10 rounded-t-xl"
  >
    <div class="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <div class="flex items-center gap-2">
        <img src="@/assets/logo.png" alt="Logo" class="h-6 w-6 object-contain" />
        <span class="text-sm"
          >&copy; 2025 MyPoligons by Eleonora Pavlova. All rights reserved.</span
        >
      </div>

      <nav class="hidden sm:flex flex-wrap gap-4 text-sm">
        <a href="#" class="hover:text-gray-800 transition">About</a>
        <a href="#" class="hover:text-gray-800 transition">Contacts</a>
        <a href="#" class="hover:text-gray-800 transition">Terms & Conditions</a>
      </nav>
    </div>
  </footer>
</template>
