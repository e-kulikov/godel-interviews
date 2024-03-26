<script setup lang="ts">
import { onMounted, ref } from "vue";
import PageSize from "./PageSize.vue";
import Pagination from "./Pagination.vue";
import CustomerCard from "./CustomerCard.vue";
// import useAPICall from "./use-api-call.ts";

import { PAGE_SIZE } from "./settings.json";
import { parseCustomersList } from "./customer-utils.ts";
import { getPokemons } from "./pokemons.api";

const pageSize = ref<number>(PAGE_SIZE.default);
const setPageSize = (size: number) => (pageSize.value = size);

const pageNumber = ref<number>(0);
const setPageNumber = (pageNum: number) => (pageNumber.value = pageNum);

const data = ref();
onMounted(async () => {
  data.value = await getPokemons(
    pageSize.value,
    pageNumber.value * pageSize.value,
  );
});
</script>

<template>
  <div>
    <PageSize :current-size="pageSize" @change-page-size="setPageSize" />
    <div class="customer-list">
      <CustomerCard v-for="{ name } in data" :name="name" />
    </div>
    <Pagination
      :current-page-number="pageNumber"
      @change-page-number="setPageNumber"
    />
  </div>
</template>
