<template>
  <div class="car-thumbnail">
    <q-card class="bg-green-1" style="width: 180px; height: 260px">
      <q-img :ratio="16 / 9" :src="car.image_url[0]" />
      <q-card-section>
        <router-link
          :to="`/car?id=${encodeURIComponent(car.car_id)}`"
          class="tittle"
        >
          <div class="text-h6">{{ car.manufacturer }} {{ car.model }}</div>
        </router-link>
        <div><span class="label">Year:</span> {{ car.year }}</div>
        <div><span class="label">Mileage:</span> {{ car.mileage }} km</div>
        <div>
          <span class="label">Gear Box:</span> {{ car.transmission_type }}
        </div>
        <div><span class="label">Fuel Type:</span> {{ car.fuel_type }}</div>
        <div class="text-center price">{{ car.price }}€ / day</div>
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
.q-card {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Adds subtle shadow for depth */
  transition: transform 0.2s ease-in-out;
}

.q-card:hover {
  transform: scale(1.02); /* Enlarges the item on hover */
}

.car-thumbnail {
  margin: 10px;
}

.car-thumbnail .text-h6 {
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: -12px;
  margin-bottom: 3px;
}

p {
  margin: 0;
}

.price {
  margin-top: 5px;
  font-weight: bold;
}

.label {
  font-weight: 500;
}

.tittle {
  text-decoration: none;
  color: black;
}
</style>
