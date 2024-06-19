<template>
  <q-page class="flex flex-center column">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="filteredResults.length > 0" class="text-h6">
      Found {{ filteredResults.length }} result(s)
    </div>
    <div v-else class="text-h6">No results found</div>

    <div>
      <button @click="sortByPrice">Sort by Price</button>
      <label for="color">Color:</label>
      <select v-model="selectedColor" @change="handleColorChange">
        <option value="">All</option>
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Silver">Silver</option>
        <!-- Add more color options if needed -->
      </select>
      <label for="gearbox">Gearbox:</label>
      <select v-model="selectedGearbox" @change="handleGearboxChange">
        <option value="">All</option>
        <option value="Automatic">Automatic</option>
        <option value="Manual">Manual</option>
      </select>
    </div>

    <!-- Display the filtered results here -->
    <car-thumbnail-horizontal
      v-for="result in paginatedResults"
      :key="result.id"
      :car="result"
      :dateFrom="route.query.dateFrom"
      :dateTo="route.query.dateTo"
    />

    <div class="pagination" v-if="totalPages > 1">
      <q-btn
        @click="previousPage"
        :disabled="currentPage === 1"
        icon="arrow_back"
        color="green"
        flat
        round
      />
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <q-btn
        @click="nextPage"
        :disabled="currentPage >= totalPages"
        icon="arrow_forward"
        color="green"
        flat
        round
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "../lib/supabaseClient";
import CarThumbnailHorizontal from "./car/CarThumbnailHorizontal.vue";
import { useQuasar } from "quasar";

const $q = useQuasar();
const route = useRoute();
const results = ref([]);
const isLoading = ref(false);
const selectedColor = ref("");
const selectedGearbox = ref("");
const itemsPerPage = ref(10);
const currentPage = ref(1);

const fetchData = async () => {
  isLoading.value = true;

  try {
    const { city, dateFrom, dateTo } = route.query;

    // Validate dates
    if (!validateDates(dateFrom, dateTo)) {
      $q.notify({
        color: "negative",
        message: "Invalid dates provided in the URL.",
        position: "top",
        icon: "report_problem",
      });
      return;
    }

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

const validateDates = (dateFrom, dateTo) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset hours, minutes, seconds, and milliseconds

  const fromDate = new Date(dateFrom);
  const toDate = new Date(dateTo);

  if (fromDate < today || toDate < today) {
    return false;
  }
  if (fromDate > toDate) {
    return false;
  }

  return true;
};

onMounted(fetchData);

// Function to sort cars by price
const sortByPrice = () => {
  results.value.sort((a, b) => a.price - b.price);
};

// Computed property to filter cars based on selected filters
const filteredResults = computed(() => {
  let filtered = results.value;

  // Apply color filter
  if (selectedColor.value) {
    filtered = filtered.filter((car) => car.color === selectedColor.value);
  }

  // Apply gearbox filter
  if (selectedGearbox.value) {
    filtered = filtered.filter(
      (car) => car.transmission_type === selectedGearbox.value
    );
  }

  return filtered;
});

// Computed property to paginate filtered results
const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return filteredResults.value.slice(start, start + itemsPerPage.value);
});

// Computed property to calculate total pages
const totalPages = computed(() => {
  return Math.ceil(filteredResults.value.length / itemsPerPage.value);
});

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Watch for changes in selectedColor or selectedGearbox and reset currentPage to 1
watchEffect(() => {
  currentPage.value = 1;
});

const handleColorChange = () => {
  currentPage.value = 1; // Reset currentPage when filters change
};

const handleGearboxChange = () => {
  currentPage.value = 1; // Reset currentPage when filters change
};
</script>

<style scoped>
.pagination {
  margin-top: 10px;
}

.pagination button {
  margin: 0 5px;
}
</style>
