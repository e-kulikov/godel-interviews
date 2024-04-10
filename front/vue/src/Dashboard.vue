<script setup lang="ts">
import { ref } from "vue"
import PageSize from "./PageSize.vue"
import Pagination from "./Pagination.vue"
import CustomerCard from "./CustomerCard.vue"
import useAPICall from "./use-api-call.ts"

import { PAGE_SIZE } from "./settings.json"
import { parseCustomersList } from "./customer-utils.ts"

const pageSize = ref<number>(PAGE_SIZE.default)
const setPageSize = (size: number) => (pageSize.value = size)

const pageNumber = ref<number>(0);
const setPageNumber = (pageNum: number) => {
  pageNumber.value = pageNum
}

const { loading, error, data } = useAPICall({
  path: `pokemon?limit=${pageSize.value}&offset=${pageNumber.value * pageSize.value}`,
  parseResponse: parseCustomersList,
})
</script>

<template>
  <div v-if="loading">
    Loading...
  </div>
  <div v-else-if="data">
    <PageSize
      :current-size="pageSize"
      @change-page-size="setPageSize"
    />
    <div class="customer-list">
      <CustomerCard
        v-for="{ name } in data"
        :key="name"
        :name="name"
      />
    </div>
    <Pagination
      :current-page-number="pageNumber"
      @change-page-number="setPageNumber"
    />
  </div>
  <div v-else>
    {{ error?.message || 'Oops, an error happened.' }}
  </div>
</template>
