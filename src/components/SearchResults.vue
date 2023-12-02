<template>
  <div class="q-pa-md">
    <div v-for="item in results" :key="item.id">
      <!-- Display your data here. Replace 'item.property' with your actual data properties -->
      <p>{{ item.property }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const results = ref([]);

const setResults = (newResults) => {
  results.value = newResults;
};
</script>