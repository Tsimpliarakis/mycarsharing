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
        color="green-5"
        range
        :rules="[(val) => (val && val.from && val.to) || 'Field is required']"
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
import { reactive } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const $q = useQuasar();
const router = useRouter();

const formData = reactive({
  selectedCity: "",
  date: {},
});

const searchData = () => {
  if (!formData.selectedCity || !formData.date.from || !formData.date.to) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Both fields are required!",
      position: "top",
    });
    return;
  }

  const searchUrl = `/search?city=${encodeURIComponent(
    formData.selectedCity
  )}&dateFrom=${encodeURIComponent(
    formData.date.from
  )}&dateTo=${encodeURIComponent(formData.date.to)}`;
  router.push(searchUrl);
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
