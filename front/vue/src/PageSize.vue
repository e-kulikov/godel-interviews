<script setup lang="ts">
import { PAGE_SIZE } from "./settings.json";

interface PageSizeProps {
  currentSize: number
}

type PageSizeEmits = {
  changePageSize: [size: number]
}

defineProps<PageSizeProps>();
defineEmits<PageSizeEmits>();
</script>

<template>
  <div class="page-size">
    <span>Size:</span>
    <button
      v-for="size in PAGE_SIZE.available"
      :key="size"
      :disabled="size === currentSize"
      @click="$emit('changePageSize', size)"
    >
      {{ size }}
    </button>
  </div>
</template>
