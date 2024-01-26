<template>
  <div class="car-detail">
    <q-card class="bg-green-2" style="width: 180px; height: 260px">
      <q-img :ratio="16 / 9" :src="car.image_url[0]" />
      <q-card-section>
        <div class="text-h6">{{ car.manufacturer }} {{ car.model }}</div>
        <div><span class="label">Year:</span> {{ car.year }}</div>
        <div><span class="label">Mileage:</span> {{ car.mileage }} km</div>
        <div>
          <span class="label">Gear Box:</span> {{ car.transmission_type }}
        </div>
        <div><span class="label">Fuel Type:</span> {{ car.fuel_type }}</div>
        <div class="text-center price">{{ car.price }}€ / day</div>
        <q-btn color="primary" label="Reserve Now" @click="reserveCar" />
      </q-card-section>
    </q-card>

    <div class="recommended-cars">
      <div v-for="(car, index) in recommendedCars" :key="index">
        <!-- Thumbnail for each recommended car -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({
  car: Object,
});

const route = useRoute();
const recommendedCars = ref([]);

fetch(`/api/cars?location=${route.params.location}`)
  .then((response) => response.json())
  .then((data) => {
    recommendedCars.value = data;
  });

const reserveCar = () => {
  // Logic for reserving the car goes here
};
</script>

<style scoped>
/* Your styles go here */
</style>
