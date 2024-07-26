<template>
  <q-page class="justify center q-pa-md">
    <div class="text-center">
      <q-spinner v-if="isFetching" color="green" size="50px" />
      <div v-else>
        <div v-if="!carExists || !isOwner" class="text-h4 tittle">
          <q-icon name="error" color="negative" />
          <div class="text-negative q-my-md">
            {{
              carExists
                ? "You do not have permission to edit this car."
                : "Car does not exist."
            }}
          </div>
        </div>
        <div v-else>
          <div class="text-h4 tittle">Edit Car</div>
          <form @submit.prevent="updateCar">
            <div class="row justify-center">
              <div class="carDetails">
                <div class="text-h6">Car Details</div>
                <q-input
                  color="green"
                  v-model="car.manufacturer"
                  label="Manufacturer"
                  required
                />
                <q-input
                  color="green"
                  v-model="car.model"
                  label="Model"
                  required
                />
                <q-select
                  @keypress="onlyNumber"
                  color="green"
                  v-model="car.year"
                  :options="years"
                  label="Year"
                  required
                />
                <q-input
                  @keypress="onlyNumber"
                  color="green"
                  v-model="car.engine"
                  label="Engine (cc)"
                  required
                />
                <q-input
                  @keypress="onlyNumber"
                  color="green"
                  v-model="car.power"
                  label="Power (hp)"
                  required
                />
                <q-input
                  color="green"
                  v-model="car.color"
                  label="Color"
                  required
                />
                <q-select
                  color="green"
                  :options="['Petrol', 'Diesel', 'Electric', 'LPG', 'CNG']"
                  v-model="car.fuel_type"
                  label="Gas Type"
                  required
                />
                {{ car.gasType }}
                <q-input
                  @keypress="onlyNumber"
                  color="green"
                  v-model="car.mileage"
                  label="Mileage"
                  required
                />
                <q-select
                  v-model="car.transmission_type"
                  :options="['Manual', 'Automatic', 'Semi-Automatic']"
                  label="Transmission Type"
                  required
                  color="green"
                />
                <q-select
                  v-model="car.additional_features"
                  :options="[
                    'AC',
                    'Clima',
                    'GPS',
                    'Android Auto',
                    'Apple Carplay',
                    'Bluetooth',
                    'Hybrid',
                    'Snowchains',
                    '4x4',
                    'Roof Rack',
                    'Cargo Box',
                    'Towbar',
                    'Leather Seats',
                    'Heated Seats',
                    'Cruise Control',
                    'Parking Sensors',
                    'Rear Camera',
                    'Sunroof',
                    'Convertible',
                    'Fog Lights',
                  ]"
                  clearable
                  label="Additional Features"
                  color="green"
                  multiple
                />
                <q-select
                  v-model="car.fuel_level"
                  :options="['1', '2', '3', '4', '5', '6', '7', '8']"
                  label="Fuel level"
                  required
                  color="green"
                />
                <q-input
                  color="green"
                  v-model="car.car_description"
                  label="Description"
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
                  v-model="car.location"
                  :options="['Athens', 'Corfu', 'Polykastro', 'Thessaloniki']"
                  label="Location"
                  required
                  color="green"
                />
                <!-- dates picker -->
                <q-date
                  class="date-picker"
                  v-model="car.dates"
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
                  v-model="car.price"
                  label="Price (daily)"
                  required
                />
                <q-input
                  @keypress="onlyNumber"
                  color="green"
                  v-model="car.cleaning_fee"
                  label="Cleaning Fee"
                  required
                />
                <q-select
                  v-model="car.is_available"
                  :options="['Yes', 'No']"
                  label="Available"
                  required
                  color="green"
                />
              </div>
            </div>
            <q-btn
              :loading="isLoading"
              color="green"
              type="submit"
              icon="save"
              style="margin-top: 10px"
              >Save Changes</q-btn
            >
          </form>

          <!-- Delete Button -->
          <q-btn
            color="red"
            icon="delete"
            @click="showDialog = true"
            style="margin-top: 10px"
            >Delete Listing</q-btn
          >

          <!-- Confirmation Dialog -->
          <QDialog v-model="showDialog" @hide="confirmDeleteDialog.hide()">
            <q-card>
              <q-card-section>{{ dialogMessage }}</q-card-section>
              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Cancel"
                  @click="confirmDeleteDialog.hide()"
                />
                <q-btn color="red" label="Delete" @click="performDeletion" />
              </q-card-actions>
            </q-card>
          </QDialog>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { authStore } from "src/stores/auth-store";
import { useQuasar, QDialog } from "quasar";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const carId = route.query.id;

const confirmDeleteDialog = ref(null);
const showDialog = ref(false);
const dialogMessage = ref("Are you sure you want to delete this car listing?");

const car = ref({
  manufacturer: "",
  model: "",
  year: "",
  color: "",
  fuel_type: "",
  price: "",
  location: "",
  mileage: "",
  transmission_type: "",
  engine: "",
  power: "",
  dates: { from: "", to: "" },
  cleaning_fee: "",
  is_available: "",
  additional_features: [],
  car_description: "",
  fuel: "",
  image_url: "",
});

const files = ref([]);
const isLoading = ref(false);
const isFetching = ref(true);
const carExists = ref(true);
const isOwner = ref(false);
const $q = useQuasar();
const currentYear = new Date().getFullYear();
const years = computed(() =>
  Array.from({ length: currentYear - 1990 }, (_, i) => currentYear - i)
);

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

async function fetchCarDetails() {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("car_id", carId)
    .single();

  if (error) {
    console.error("Error fetching car details:", error.message);
    carExists.value = false;
    isFetching.value = false; // Add this line
    return;
  }

  carExists.value = true;
  car.value = {
    ...data,
    dates: {
      from: data.start_date,
      to: data.end_date,
    },
  };

  if (data.user_id !== authStore.state.session.user.id) {
    isOwner.value = false;
  } else {
    isOwner.value = true;
  }
  isFetching.value = false; // Add this line
}

async function updateCar() {
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

    if (files.value.length === 0 && car.value.image_url) {
      imageURLs.push(car.value.image_url);
    }

    const updatePayload = {
      manufacturer: car.value.manufacturer,
      model: car.value.model,
      year: car.value.year,
      color: car.value.color,
      fuel_type: car.value.fuel_type,
      price: car.value.price,
      location: car.value.location,
      mileage: car.value.mileage,
      transmission_type: car.value.transmission_type,
      engine: car.value.engine,
      power: car.value.power,
      cleaning_fee: car.value.cleaning_fee,
      start_date: car.value.dates.from,
      end_date: car.value.dates.to,
      is_available: car.value.is_available,
      additional_features: car.value.additional_features,
      car_description: car.value.car_description,
      fuel_level: car.value.fuel,
    };

    // Only include image_url in the update payload if imageURLs is not empty
    if (imageURLs.length > 0) {
      updatePayload.image_url = imageURLs;
    }

    const { data, error } = await supabase
      .from("cars")
      .update(updatePayload)
      .eq("car_id", carId);

    if (error) throw error;

    $q.notify({
      position: "top",
      color: "positive",
      message: "Car updated successfully",
    });

    router.push("/car?id=" + carId);
  } catch (error) {
    $q.notify({
      position: "top",
      color: "negative",
      message: "Error updating car",
    });
  } finally {
    isLoading.value = false;
  }
}

async function deleteCar() {
  showDialog.value = true; // Show the confirmation dialog

  confirmDeleteDialog.value.onHide(() => {
    showDialog.value = false; // Reset the dialog visibility state
  });
}

async function performDeletion() {
  isLoading.value = true;

  try {
    const { error } = await supabase.from("cars").delete().eq("car_id", carId);

    if (error) throw error;

    $q.notify({
      position: "top",
      color: "positive",
      message: "Car listing deleted successfully",
    });

    router.push("/"); // Redirect to home page or another appropriate page after deletion
  } catch (error) {
    $q.notify({
      position: "top",
      color: "negative",
      message: "Error deleting car listing",
    });
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchCarDetails);
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
