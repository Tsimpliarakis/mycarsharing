<template>
  <div class="column suggestions">
    <div v-for="location in locations" :key="location">
      <div class="text-center text-h6">Latest in {{ location }}</div>
      <q-scroll-area style="height: 286px">
        <div class="row no-wrap">
          <CarThumbnail
            v-for="car in carsByLocation[location]"
            :key="car.id"
            :car="car"
          />
        </div>
      </q-scroll-area>
    </div>
  </div>
</template>

<script setup>
import CarThumbnail from "./car/CarThumbnail.vue";
import { ref, onMounted, computed } from "vue";
import { supabase } from "src/lib/supabaseClient";

const locations = ref(["Athens", "Thessaloniki"]);

const cars = ref({});

const fetchCarsByLocation = async (location) => {
  const { data, error } = await supabase
    .from("cars")
    .select(
      "car_id, year, manufacturer, model, mileage, price, image_url, fuel_type, transmission_type"
    )
    .ilike("location", location)
    .order("added_date", { ascending: false })
    .limit(10);
  if (error) console.error(`Error fetching ${location}: `, error);
  return data || [];
};

const fetchAllCars = async () => {
  const fetchPromises = locations.value.map(fetchCarsByLocation);
  const results = await Promise.all(fetchPromises);
  locations.value.forEach((location, index) => {
    cars.value[location] = results[index];
  });
};

const carsByLocation = computed(() => {
  return locations.value.reduce((acc, location) => {
    acc[location] = cars.value[location] || [];
    return acc;
  }, {});
});

onMounted(fetchAllCars);
</script>

<style scoped>
@media (min-width: 500px) {
  .suggestions {
    margin-top: 50px;
    margin-left: 10%;
    width: 80%;
    max-width: 800px;
  }
}

@media (min-width: 1000px) {
  .suggestions {
    margin-left: calc((100% - 800px) / 2);
  }
}

@media (max-width: 500px) {
  .suggestions {
    margin-bottom: 30px;
    margin-left: 5%;
    width: 90%;
  }
}

.q-scrollarea:deep(.q-scrollarea__thumb) {
  display: none;
}
</style>
