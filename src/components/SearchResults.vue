<template>
  <q-page class="flex flex-center column">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="results && results.length > 0" class="text-h6">
      Found {{ results.length }} result(s)
    </div>
    <div v-else class="text-h6">No results found :(</div>
    <!-- Display the results here -->
    <car-thumbnail-horizontal
      v-for="result in results"
      :key="result.id"
      :car="result"
    />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import CarThumbnailHorizontal from "./car/CarThumbnailHorizontal.vue";

const route = useRoute();
const results = ref([]);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  const { city, date } = route.query;
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("location", city)
    .eq("start_date", date);
  isLoading.value = false;
  if (error) console.log("Error: ", error);
  else {
    results.value = data || [];
  }
});
</script>
