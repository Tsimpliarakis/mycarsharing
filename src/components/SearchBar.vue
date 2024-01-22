<template>
  <div class="q-pa-md row flex-container">
    <!-- Select dropdown and button -->
    <div class="flex-item">
      <q-select
        class="dropdown"
        outlined
        v-model="formData.selectedCity"
        :options="['Athens', 'Corfu', 'Polykastro', 'Thessaloniki']"
        label="Select City"
        color="green"
        bg-color="white"
        :rules="[(val) => !!val || 'Field is required']"
      />

      <q-date
        class="date-picker"
        v-model="formData.date"
        mask="YYYY-MM-DD"
        today-btn
        @input="searchData"
        color="green-5"
        range
        :rules="[(val) => !!val || 'Field is required']"
      />
    </div>

    <q-btn
      class="flex-item search-btn"
      color="green-5"
      label="Find a car"
      @click="searchData"
    />
  </div>
</template>

<script setup>
import { reactive, computed } from "vue";
import { supabase } from "src/lib/supabaseClient.js";

const formData = reactive({
  selectedCity: "",
  date: "",
});

const searchParams = computed(() => ({
  location: `%${formData.selectedCity}%`,
  start_date: formData.date,
}));

const searchData = async () => {
  if (!formData.selectedCity || !formData.date) {
    notifyUser("Both fields are required.");
    return;
  }

  try {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .ilike("location", searchParams.value.location)
      .eq("start_date", searchParams.value.start_date);

    if (error) throw error;
    console.log(data);
  } catch (error) {
    console.error(error);
    notifyUser("An error occurred while searching.");
  }
};

function notifyUser(message) {
  // Code to show notification goes here...
}
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
.search-btn {
  margin-top: 10px;
  margin-left: 20px;
}

/* Media queries for responsive design */
@media (orientation: portrait) and (max-width: 500px) {
  .flex-container {
    flex-direction: column;
    align-items: center; /* Align items vertically in the middle */
  }

  .search-btn {
    margin-top: 20px;
    margin-left: 0px;
  }
}
</style>
