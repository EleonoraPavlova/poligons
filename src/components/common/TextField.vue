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
  <div>
    <input
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @change="valueChanged"
      @input="valueChanged"
    />
  </div>
</template>
