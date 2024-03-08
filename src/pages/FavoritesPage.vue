<template>
  <q-page class="flex flex-center column">
    <div class="text-center">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="cars && cars.length > 0" class="text-h5 havecars">
        You have favorited {{ cars.length }} car(s)
      </div>
      <div v-else class="text-h6">You haven't favorited any cars yet :(</div>
    </div>
    <div class="flex flex-center row mycars">
      <car-thumbnail-horizontal v-for="car in cars" :key="car.id" :car="car" />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authStore } from "../stores/auth-store";
import { supabase } from "../lib/supabaseClient";
import CarThumbnailHorizontal from "src/components/car/CarThumbnailHorizontal.vue";

const cars = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;

  // Fetch favorite cars
  const { data: favoritesData, error: favoritesError } = await supabase
    .from("favorites")
    .select("car_id")
    .eq("user_id", authStore.state.session.user.id);

  if (favoritesError) {
    console.log("Error fetching favorites: ", favoritesError);
  } else {
    // Get car details for each favorite
    const carPromises = favoritesData.map((favorite) =>
      supabase
        .from("cars")
        .select(
          "car_id, image_url, manufacturer, model, year, mileage, price, transmission_type, fuel_type"
        )
        .eq("car_id", favorite.car_id)
    );

    const carDetails = await Promise.all(carPromises);
    cars.value = carDetails.map((detail) => detail.data[0]);
  }

  isLoading.value = false;
});
</script>

<style scoped>
.havecars {
  margin-bottom: 20px;
  margin-top: 20px;
}

.mycars {
  max-width: 800px;
}
</style>
