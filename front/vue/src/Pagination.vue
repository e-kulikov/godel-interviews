<script setup lang="ts">
interface PaginationProps {
  currentPageNumber: number
}

type PaginationEmits = {
  changePageNumber: [page: number]
}

defineProps<PaginationProps>();
defineEmits<PaginationEmits>();
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
