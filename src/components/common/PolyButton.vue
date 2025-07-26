<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  tag: {
    type: String,
    default: 'button',
    validator: (v: string) => ['button', 'a', 'RouterLink', 'div'].includes(v),
  },
  href: String,
  to: [String, Object],
  disabled: Boolean,
  icon: String,
  iconPosition: {
    type: String,
    default: 'left',
    validator: (v: string) => ['left', 'right'].includes(v),
  },
})

const componentTag = computed(() => {
  if (props.tag === 'RouterLink') return RouterLink
  return props.tag
})
</script>

<template>
  <component
    :is="componentTag"
    :href="tag === 'a' ? href : undefined"
    :to="tag === 'RouterLink' ? to : undefined"
    :disabled="tag === 'button' ? disabled : undefined"
    :aria-disabled="disabled ? 'true' : undefined"
    class="poly-button"
  >
    <template v-if="icon && iconPosition === 'left'">
      <span class="icon">{{ icon }}</span>
    </template>
    <slot />
    <template v-if="icon && iconPosition === 'right'">
      <span class="icon">{{ icon }}</span>
    </template>
  </component>
</template>

<style scoped>
.poly-button {
  display: inline-flex;
  align-items: center;
  padding: 0.5em;
  border: 1px solid #e5e7eb;
  background-color: transparent;
  color: inherit;
  cursor: pointer;
  user-select: none;
  border-radius: 6px;
  text-decoration: none;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s ease;
}

.poly-button:hover {
  background-color: #e5e7eb;
}

.poly-button[disabled],
.poly-button[aria-disabled='true'] {
  opacity: 0.8;
  pointer-events: none;
}

.icon {
  display: inline-flex;
  margin: 0 0.3em;
  font-size: 1.2em;
  user-select: none;
}
</style>
