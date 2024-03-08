<template>
  <q-page class="flex flex-center column">
    <div class="text-center">
      <div v-if="isLoading">Loading...</div>
      <div v-else-if="cars && cars.length > 0" class="text-h5 havecars">
        You have {{ cars.length }} car(s)
      </div>
      <div v-else class="text-h6">You don't have any cars yet :(</div>
    </div>
    <div class="flex flex-center row mycars">
      <car-thumbnail-horizontal v-for="car in cars" :key="car.id" :car="car" />
    </div>
    <q-btn
      class="addcarbtn"
      color="green"
      label="Add car"
      @click="$router.push('/mycars/new')"
    />
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
  const { data, error } = await supabase
    .from("cars")
    .select(
      "car_id, image_url, manufacturer, model, year, mileage, price, transmission_type, fuel_type"
    )
    .eq("user_id", authStore.state.session.user.id);
  isLoading.value = false;
  if (error) console.log("Error: ", error);
  else {
    cars.value = data || [];
  }
});
</script>

<style scoped>
.addcarbtn {
  margin: 20px;
}

.havecars {
  margin-bottom: 20px;
  margin-top: 20px;
}

.mycars {
  max-width: 800px;
}
</style>
