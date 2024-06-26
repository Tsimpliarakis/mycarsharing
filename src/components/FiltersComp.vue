<template>
  <div class="q-pa-md">
    <q-btn
      @click="toggleFilters"
      label="Toggle Filters"
      color="primary"
      class="q-mb-md"
    ></q-btn>
    <q-card v-if="showFilters" class="q-pa-md">
      <q-btn
        @click="sortByPrice"
        label="Sort by Price"
        color="secondary"
        class="q-mb-md"
      ></q-btn>
      <q-select
        v-model="selectedColor"
        label="Color"
        :options="colorOptions"
        class="q-mb-md"
      />
      <q-select
        v-model="selectedGearbox"
        label="Gearbox"
        :options="gearboxOptions"
        class="q-mb-md"
      />
      <q-select
        v-model="selectedManufacturer"
        label="Manufacturer"
        :options="manufacturerOptions"
        class="q-mb-md"
      />
      <q-select
        v-model="selectedYear"
        label="Year"
        :options="yearOptions"
        class="q-mb-md"
      />
      <q-input
        v-model="selectedMileage"
        label="Mileage"
        type="number"
        class="q-mb-md"
      />
      <q-input
        v-model="selectedViews"
        label="Views"
        type="number"
        class="q-mb-md"
      />
      <q-input v-model="selectedEngine" label="Engine" class="q-mb-md" />
      <q-input
        v-model="selectedPower"
        label="Power"
        type="number"
        class="q-mb-md"
      />
      <q-input
        v-model="selectedPrice"
        label="Price"
        type="number"
        class="q-mb-md"
      />
      <q-btn
        @click="applyFilters"
        label="Apply Filters"
        color="green"
        class="q-mb-md"
      ></q-btn>
      <q-btn
        @click="clearFilters"
        label="Clear Filters"
        color="red"
        class="q-mb-md"
      ></q-btn>
    </q-card>
  </div>
</template>

<script setup>
import { ref, defineEmits } from "vue";
import { useQuasar } from "quasar";

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
