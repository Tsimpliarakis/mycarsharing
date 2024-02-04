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

const fetchData = async () => {
  isLoading.value = true;

  try {
    const { city, dateFrom, dateTo } = route.query;
    const availableCars = await getAvailableCars({ city, dateFrom, dateTo });
    const bookedCarIds = await getBookedCarIds(availableCars, {
      dateFrom,
      dateTo,
    });

    const filteredResults = availableCars.filter(
      (car) => !bookedCarIds.includes(car.car_id)
    );

    results.value = filteredResults;
  } catch (error) {
    console.error("Error fetching data: ", error);
  } finally {
    isLoading.value = false;
  }
};

const getAvailableCars = async ({ city, dateFrom, dateTo }) => {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("location", city)
    .lte("start_date", dateFrom)
    .gte("end_date", dateTo);

  if (error) {
    console.error("Available Cars Error: ", error);
    throw error;
  }
  return data || [];
};

const getBookedCarIds = async (availableCars, { dateFrom, dateTo }) => {
  const availableCarIds = availableCars.map((car) => car.car_id);
  const { data, error } = await supabase
    .from("bookings")
    .select("car_id")
    .in("car_id", availableCarIds)
    .gte("end_date", dateFrom)
    .lte("start_date", dateTo);

  if (error) {
    console.error("Booked Cars Error: ", error);
    throw error;
  }
  return data.map((booking) => booking.car_id);
};

onMounted(fetchData);
</script>
