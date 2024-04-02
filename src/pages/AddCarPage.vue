<template>
  <q-page class="justify center q-pa-md">
    <div class="text-center">
      <div class="text-h4 tittle">Add New Car</div>
      <form @submit.prevent="addCar">
        <div class="row justify-center">
          <div class="carDetails">
            <div class="text-h6">Car Details</div>
            <q-input
              color="green"
              v-model="manufacturer"
              placeholder="Manufacturer"
              required
              bg-color="white"
            />
            <q-input
              color="green"
              v-model="model"
              placeholder="Model"
              bg-color="white"
              required
            />
            <q-input
              @keypress="onlyNumber"
              color="green"
              v-model="year"
              placeholder="Year"
              required
              bg-color="white"
            />
            <q-input
              color="green"
              v-model="color"
              placeholder="Color"
              required
              bg-color="white"
            />
            <q-input
              color="green"
              v-model="gasType"
              placeholder="Gas Type"
              required
              bg-color="white"
            />
            <q-input
              @keypress="onlyNumber"
              color="green"
              v-model="mileage"
              placeholder="Mileage"
              required
              bg-color="white"
            />
            <q-select
              v-model="transmission_type"
              :options="['Automatic', 'Manual']"
              label="Transmission Type"
              required
              color="green"
              bg-color="white"
            />
            <div class="bg-white q-input">
              <div class="text-left text-grey-8">Photos</div>
              <input
                class="photos"
                type="file"
                multiple
                @change="handleFiles"
              />
            </div>
          </div>
          <div class="locationDates">
            <div class="text-h6">Location & Dates</div>
            <q-select
              v-model="location"
              :options="['Athens', 'Corfu', 'Polykastro', 'Thessaloniki']"
              label="Location"
              required
              color="green"
              bg-color="white"
            />
            <!-- dates picker -->
            <q-date
              class="date-picker"
              v-model="year"
              mask="YYYY-MM-DD"
              today-btn
              color="green-5"
              range
              :rules="[
                (val) => (val && val.from && val.to) || 'Field is required',
              ]"
            />
            <q-input
              @keypress="onlyNumber"
              color="green"
              bg-color="white"
              v-model="price"
              placeholder="Price"
              required
            />
          </div>
        </div>
        <q-btn :loading="isLoading" color="green" type="submit" icon="add"
          >Add</q-btn
        >
      </form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { authStore } from "src/stores/auth-store";
import { useQuasar } from "quasar";

const manufacturer = ref("");
const model = ref("");
const year = ref("");
const color = ref("");
const gasType = ref("");
const price = ref("");
const location = ref("");
const mileage = ref("");
const transmission_type = ref("");
const files = ref([]);
const isLoading = ref(false);
const $q = useQuasar();

function onlyNumber($event) {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if (keyCode < 48 || keyCode > 57) {
    // Prevent default action (typing non-number character)
    $event.preventDefault();
  }
}

function handleFiles(event) {
  files.value = event.target.files;
}

async function addCar() {
  isLoading.value = true;
  const imageURLs = [];
  const baseURL =
    "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/cars/";

  try {
    for (const file of files.value) {
      const randomId = Math.random().toString(36).substring(2, 15);
      const fileExtension = file.name.split(".").pop();
      const newName = `${randomId}.${fileExtension}`;
      const { data, error } = await supabase.storage
        .from("cars")
        .upload(newName, file);

      if (error) throw error;

      imageURLs.push(baseURL + newName);
    }

    if (files.value.length === 0) {
      imageURLs.push(
        "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/cars/generic.jpeg"
      );
    }

    const { data, error } = await supabase
      .from("cars")
      .insert([
        {
          user_id: authStore.state.session.user.id,
          manufacturer: manufacturer.value,
          model: model.value,
          year: year.value,
          color: color.value,
          fuel_type: gasType.value,
          image_url: imageURLs,
          price: price.value,
          location: location.value,
          mileage: mileage.value,
          transmission_type: transmission_type.value,
        },
      ])
      .single();

    if (error) throw error;

    manufacturer.value = "";
    model.value = "";
    year.value = "";
    color.value = "";
    gasType.value = "";
    price.value = "";
    location.value = "";
    mileage.value = "";
    transmission_type.value = "";
    files.value = [];
    $q.notify({
      position: "top",
      color: "positive",
      message: "Car added successfully",
    });
  } catch (error) {
    $q.notify({
      position: "top",
      color: "negative",
      message: "Error adding car",
    });
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.q-input,
.q-select {
  margin: 10px;
}

.photos {
  margin-top: 10px;
  margin-bottom: 30px;
}

.carDetails {
  width: 300px;
}

.locationDates {
  width: 300px;
}

.tittle {
  margin-top: 20px;
  margin-bottom: 30px;
}

@media screen and (min-width: 650px) {
  .carDetails {
    margin-right: 4vw;
  }

  .locationDates {
    margin-left: 4vw;
  }
}
</style>
