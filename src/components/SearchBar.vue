<template>
  <div class="q-pa-md">
    <!-- Select dropdown and button -->
    <div class="row flex-container">
      <div class="flex-item">
        <q-select
          class="dropdown"
          outlined
          v-model="selectedCity"
          :options="['Athens', 'Corfu', 'Polykastro', 'Thessaloniki']"
          label="Select City"
          color="green"
          bg-color="white"
          :rules="[(val) => !!val || 'Field is required']"
        />

        <q-date
          class="date-picker"
          v-model="date"
          mask="YYYY-MM-DD"
          today-btn
          @input="searchData"
          color="green"
          range
          :rules="[(val) => !!val || 'Field is required']"
        />
      </div>

      <q-btn
        class="flex-item search"
        color="green"
        label="Find a car"
        @click="searchData"
      />

      <!-- Error message -->
      <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { supabase } from "src/lib/supabaseClient.js";
import { QDate } from "quasar";

const selectedCity = ref("");
const date = ref("");
const errorMessage = ref("");

const searchParams = computed(() => ({
  location: `%${selectedCity.value}%`,
  start_date: date.value,
}));

const searchData = async () => {
  try {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .ilike("location", searchParams.value.location)
      .eq("start_date", searchParams.value.start_date);

    if (error) throw error;
    console.log(data);
  } catch (error) {
    errorMessage.value = "An error occurred while searching.";
  }
};
</script>

<style scoped>
/* Container for the flex layout */
.flex-container {
  display: flex;
  align-items: flex-start;
}

/* Each item in the flex container */
.flex-item {
  display: flex;
  flex-direction: column;
}

/* Search button */
.search {
  margin-top: 10px;
  margin-left: 20px;
}

/* Media queries for responsive design */
@media (orientation: portrait) and (max-width: 500px) {
  .flex-container {
    flex-direction: column;
    align-items: center; /* Align items vertically in the middle */
  }

  .search {
    margin-left: 0px;
  }
}
</style>
