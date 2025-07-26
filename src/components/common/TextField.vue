<script setup lang="ts">
defineProps({
  modelValue: String,
  placeholder: String,
  disabled: Boolean,
})

const emit = defineEmits(['change', 'input', 'update:modelValue'])

const valueChanged = (e: Event) => {
  const target = e.target as HTMLInputElement
  emit('change', target.value)
  emit('input', target.value)
  emit('update:modelValue', target.value)
}
</script>

<template>
  <input
    class="border border-gray-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-300 w-full"
    :value="modelValue"
    :placeholder="placeholder"
    :disabled="disabled"
    @change="valueChanged"
    @input="valueChanged"
  />
</template>
