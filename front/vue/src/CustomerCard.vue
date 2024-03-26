<script setup lang="ts">
import { defineProps } from 'vue';
import { parseCustomerData as parseResponse } from "./customer-utils.ts";
import useAPICall from "./use-api-call.ts";

const props = defineProps(['name'])

const { loading, error, data } = useAPICall({ path: `pokemon/${props.name}`, parseResponse })
</script>

<template>
  <div
    v-if="data"
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
    <p>Abilities: {{ data.abilities.join(', ') }}</p>
  </div>
</template>