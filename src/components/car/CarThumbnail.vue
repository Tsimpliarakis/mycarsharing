<template>
  <div class="car-thumbnail">
    <div class="text-h6">{{ car.manufacturer }} {{ car.model }}</div>
    <p>Year: {{ car.year }}</p>
    <p>Color: {{ car.color }}</p>
    <p>Fuel Type: {{ car.fuel_type }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});
</script>

<style scoped>
.car-thumbnail {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
}
</style>
