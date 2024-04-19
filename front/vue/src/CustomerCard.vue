<script setup lang="ts">
import { parseCustomerData as parseResponse } from "./customer-utils.ts"
import useAPICall from "./use-api-call.ts"

interface CustomerCardProps {
  id: number
}

const props = defineProps<CustomerCardProps>()

const { loading, error, data } = useAPICall({
  path: `clients/${props.id}`,
  parseResponse,
})
</script>

<template>
  <div v-if="loading">
    Loading...
  </div>
  <div
    v-else-if="data"
    class="customer"
  >
    <p class="name">
      {{ data.name }}
    </p>
    <img
      :src="data.picture"
      :alt="data.name"
      class="picture"
    >
    <p>Weight: {{ data.weight }}</p>
    <p>Height: {{ data.height }}</p>
    <p>Abilities: {{ data.abilities.join(", ") }}</p>
  </div>
  <div v-else>
    {{ error?.message || 'Oops, an error happened.' }}
  </div>
</template>
