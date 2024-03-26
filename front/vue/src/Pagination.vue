<script setup lang="ts">
import { defineEmits, defineProps } from "vue";

defineProps(["currentPageNumber"]);
defineEmits(["changePageNumber"]);
</script>

<template>
  <div class="pagination">
    <button @click="$emit('changePageNumber', currentPageNumber - 1)">
      &lt; Previous
    </button>
    <button @click="$emit('changePageNumber', currentPageNumber + 1)">
      Next &gt;
    </button>
  </div>
</template>
