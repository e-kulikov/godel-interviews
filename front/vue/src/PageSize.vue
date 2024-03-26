<script setup lang="ts">
import { PAGE_SIZE } from "./settings.json";
import { defineEmits, defineProps } from "vue";

defineProps(["currentSize"]);
defineEmits(["changePageSize"]);
</script>

<template>
  <div class="page-size">
    <span>Size:</span>
    <button
      v-for="size in PAGE_SIZE.available"
      :disabled="size === currentSize"
      @click="$emit('changePageSize', size)"
    >
      {{ size }}
    </button>
  </div>
</template>
