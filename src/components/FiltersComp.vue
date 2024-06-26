<template>
  <q-btn
    @click="toggleFilters"
    label="Filters"
    color="green"
    icon="filter_list"
    style="margin-top: 10px; margin-bottom: 10px"
  />
  <q-card v-if="showFilters" class="q-pa-md" style="margin-top: 10px">
    <div class="flex flex-center">
      <q-btn
        @click="sortByPrice"
        label="Ascending Price"
        color="orange"
        icon="arrow_upward"
        class="q-mb-md"
      />
    </div>
    <q-select
      v-model="selectedColor"
      label="Color"
      :options="colorOptions"
      class="q-mb-md"
      color="green"
    />
    <q-select
      v-model="selectedGearbox"
      label="Gearbox"
      :options="gearboxOptions"
      class="q-mb-md"
      color="green"
    />
    <q-select
      v-model="selectedManufacturer"
      label="Manufacturer"
      :options="manufacturerOptions"
      class="q-mb-md"
      color="green"
    />
    <q-select
      v-model="selectedYear"
      label="Year"
      :options="yearOptions"
      class="q-mb-md"
      color="green"
    />
    <q-input
      v-model="selectedMileage"
      label="Mileage"
      class="q-mb-md"
      color="green"
    />
    <q-input
      v-model="selectedViews"
      label="Views"
      class="q-mb-md"
      color="green"
    />
    <q-input
      v-model="selectedEngine"
      label="Engine"
      class="q-mb-md"
      color="green"
    />
    <q-input
      v-model="selectedPower"
      label="Power"
      class="q-mb-md"
      color="green"
    />
    <q-input
      v-model="selectedPrice"
      label="Price"
      class="q-mb-md"
      color="green"
    />
    <q-btn
      @click="applyFilters"
      label="Apply Filters"
      color="green"
      class="q-mb-md"
      style="margin: 5px"
    />
    <q-btn
      @click="clearFilters"
      label="Clear Filters"
      color="red"
      class="q-mb-md"
      style="margin: 5px"
    />
  </q-card>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["sort-by-price", "apply-filters", "clear-filters"]);

const showFilters = ref(false);
const selectedColor = ref("");
const selectedGearbox = ref("");
const selectedManufacturer = ref("");
const selectedYear = ref("");
const selectedMileage = ref("");
const selectedViews = ref("");
const selectedEngine = ref("");
const selectedPower = ref("");
const selectedPrice = ref("");
const yearOptions = ref([]);

const currentYear = new Date().getFullYear();
for (let year = currentYear; year >= 1990; year--) {
  yearOptions.value.push(year);
}

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
};

const sortByPrice = () => {
  emit("sort-by-price");
};

const applyFilters = () => {
  emit("apply-filters", {
    color: selectedColor.value,
    gearbox: selectedGearbox.value,
    manufacturer: selectedManufacturer.value,
    year: selectedYear.value,
    mileage: selectedMileage.value,
    views: selectedViews.value,
    engine: selectedEngine.value,
    power: selectedPower.value,
    price: selectedPrice.value,
  });
};

const clearFilters = () => {
  selectedColor.value = "";
  selectedGearbox.value = "";
  selectedManufacturer.value = "";
  selectedYear.value = "";
  selectedMileage.value = "";
  selectedViews.value = "";
  selectedEngine.value = "";
  selectedPower.value = "";
  selectedPrice.value = "";
  emit("clear-filters");
};

const colorOptions = ["All", "Red", "Blue", "Silver"];
const gearboxOptions = ["All", "Automatic", "Manual"];
const manufacturerOptions = ["All", "Toyota", "Honda", "Ford"];
</script>
