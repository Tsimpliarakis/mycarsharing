<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <div class="text-h6">Add New Car</div>
      <form @submit.prevent="addCar">
        <q-input
          color="green"
          v-model="manufacturer"
          placeholder="Manufacturer"
          required
        />
        <q-input color="green" v-model="model" placeholder="Model" required />
        <q-input
          @keypress="onlyNumber"
          color="green"
          v-model="year"
          placeholder="Year"
          required
        />
        <q-input color="green" v-model="color" placeholder="Color" required />
        <q-input
          color="green"
          v-model="gasType"
          placeholder="Gas Type"
          required
        />
        <q-input
          @keypress="onlyNumber"
          color="green"
          v-model="mileage"
          placeholder="Mileage"
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
          v-model="location"
          :options="['Athens', 'Corfu', 'Polykastro', 'Thessaloniki']"
          label="Location"
          required
          color="green"
        />
        <q-input
          @keypress="onlyNumber"
          color="green"
          v-model="price"
          placeholder="Price"
          required
        />
        <div class="text-left text-grey-8">Photos</div>
        <input class="photos" type="file" multiple @change="handleFiles" />
        <br />
        <q-btn :loading="isLoading" color="green" type="submit">Submit</q-btn>
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
</style>
