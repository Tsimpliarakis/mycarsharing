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
              label="Manufacturer"
              required
            />
            <q-input color="green" v-model="model" label="Model" required />
            <q-input
              @keypress="onlyNumber"
              color="green"
              v-model="year"
              label="Year"
              required
            />
            <q-input
              @keypress="onlyNumber"
              color="green"
              v-model="engine"
              label="Engine (cc)"
              required
            />
            <q-input
              @keypress="onlyNumber"
              color="green"
              v-model="power"
              label="Power (hp)"
              required
            />
            <q-input color="green" v-model="color" label="Color" required />
            <q-input
              color="green"
              v-model="gasType"
              label="Gas Type"
              required
            />
            <q-input
              @keypress="onlyNumber"
              color="green"
              v-model="mileage"
              label="Mileage"
              required
            />
            <q-select
              v-model="transmission_type"
              :options="['Automatic', 'Manual']"
              label="Transmission Type"
              required
              color="green"
            />
            <q-select
              v-model="additional_features"
              :options="['stuff1', 'stuff2']"
              label="Additrional Features"
              required
              color="green"
            />
            <q-input color="green" v-model="description" label="Description" />
            <q-select
              v-model="fuel"
              :options="['1', '2', '3', '4', '5', '6', '7', '8']"
              label="Fuel level"
              required
              color="green"
            />
            <div class="q-input">
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
            />
            <!-- dates picker -->
            <q-date
              class="date-picker"
              v-model="dates"
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
              v-model="price"
              label="Price (daily)"
              required
            />
            <q-input
              @keypress="onlyNumber"
              color="green"
              v-model="cleaning_fee"
              label="Cleaning Fee"
              required
            />
            <q-select
              v-model="is_available"
              :options="['Yes', 'No']"
              label="Available"
              required
              color="green"
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
const engine = ref("");
const power = ref("");
const dates = ref("");
const cleaning_fee = ref("");
const is_available = ref("");
const additional_features = ref("");
const description = ref("");
const fuel = ref("");
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
          engine: engine.value,
          power: power.value,
          cleaning_fee: cleaning_fee.value,
          start_date: dates.value.from,
          end_date: dates.value.to,
          is_available: is_available.value,
          additional_features: additional_features.value,
          car_description: description.value,
          fuel_level: fuel.value,
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
