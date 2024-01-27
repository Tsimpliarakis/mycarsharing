<template>
  <q-page class="flex flex-center column">
    <div v-if="isLoading" class="text-h6">Vroom vroom...</div>
    <div v-else class="card">
      <q-card flat bordered>
        <q-carousel
          animated
          v-model="slide"
          infinite
          autoplay
          arrows
          navigation
          control-color="primary"
          transition-prev="jump-right"
          transition-next="jump-left"
          height="200px"
          color="green"
        >
          <q-carousel-slide
            v-for="(url, index) in car.image_url"
            :name="index"
            :key="index"
            class="column no-wrap flex-center"
          >
            <q-img :src="url" spinner-color="white" />
          </q-carousel-slide>
        </q-carousel>
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-subtitle2 text-center">
                {{ car.manufacturer }} {{ car.model }}
              </div>
              <div class="text-caption text-center">
                {{ car.year }} | {{ car.mileage }} miles
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="around">
          <q-btn flat round color="primary" icon="favorite_border" />
          <q-btn flat round color="accent" icon="share" />
        </q-card-actions>
      </q-card>
      <q-list flat bordered class="bg-white">
        <q-item>
          <q-item-section>Location</q-item-section>
          <q-item-section side>{{ car.location }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Price</q-item-section>
          <q-item-section side>${{ car.price }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Color</q-item-section>
          <q-item-section side>{{ car.color }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Fuel Type</q-item-section>
          <q-item-section side>{{ car.fuel_type }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Transmission Type</q-item-section>
          <q-item-section side>{{ car.transmission_type }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Mileage</q-item-section>
          <q-item-section side>{{ car.mileage }} miles</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Additional Features</q-item-section>
          <q-item-section side>{{ car.additional_features }}</q-item-section>
        </q-item>
        <!-- Add more items as needed -->
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "src/lib/supabaseClient.js";
import { useQuasar } from "quasar";

const route = useRoute();
const car = ref(null);
const isLoading = ref(true);
const q = useQuasar();
let slide = ref(0); // Add this line to keep track of the current slide

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("car_id", route.query.id)
      .single();

    if (error) throw error;
    car.value = data;
    isLoading.value = false;
  } catch (error) {
    q.notify({
      color: "negative",
      message: "We couldn't find the car you were looking for.",
      position: "top",
      icon: "report_problem",
    });
  }
});
</script>

<style scoped>
.card {
  width: 80%;
  max-width: 450px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
