<template>
  <div class="car-thumbnail">
    <q-card class="bg-green-2" style="width: 180px; height: 260px">
      <q-img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR19bw6H_G2nE5bknciM6xgMHeql35XWnR5K1ZTEMKTXw&s"
      />
      <q-card-section>
        <div class="text-h6">{{ car.manufacturer }} {{ car.model }}</div>
        <p>Year: {{ car.year }}</p>
        <p>Color: {{ car.color }}</p>
        <p>Fuel Type: {{ car.fuel_type }}</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
const props = defineProps({
  car: Object,
});
</script>

<style scoped>
.car-thumbnail {
  margin: 10px;
}

.car-thumbnail .text-h6 {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
