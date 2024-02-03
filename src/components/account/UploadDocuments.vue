<template>
  <div class="documentsform">
    <br />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <br />
    <div class="input_field">
      <p style="text-align: left; font-weight: bold">
        Driver's license (Front side):
      </p>
      <q-file v-model="selectedFrontFile" color="green-7" />
      <p style="font-size: 12px">Browse files</p>
    </div>
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />
    <br />
    <div class="input_field">
      <p style="text-align: left; font-weight: bold">
        Driver's license (Back side):
      </p>
      <q-file v-model="selectedBackFile" color="green-7" />
      <p style="font-size: 12px">Browse files</p>
    </div>
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />
    <br />
    <div class="input_field">
      <p style="text-align: left; font-weight: bold">
        Driver's license Number (Number 5):
      </p>
      <q-input
        v-model="licenseNumber"
        color="green-7"
        type="text"
        placeholder="E.g. 123456789"
      />
    </div>
    <br />
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />
    <br />
    <div class="input_field">
      <p style="text-align: left; font-weight: bold">
        Driver's license Expiration Date:
      </p>
      <q-date v-model="expirationDate" color="green-5" />
    </div>
    <br />
    <br />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <br />
    <q-btn
      @click="uploadData"
      color="green-7"
      label="Upload"
      :loading="uploading"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { authStore } from "src/stores/auth-store";
import { useQuasar } from "quasar";

const selectedFrontFile = ref(null);
const selectedBackFile = ref(null);
const licenseNumber = ref("");
const expirationDate = ref(null);
const uploading = ref(false); // Loading state
const $q = useQuasar();

async function uploadData() {
  // Ensure both front and back files are selected
  if (!selectedFrontFile.value || !selectedBackFile.value) {
    return;
  }

  uploading.value = true; // Set loading state to true

  try {
    // Upload front and back files to Supabase Storage
    const frontFileName = `${generateRandomString()}_front.${getFileExtension(
      selectedFrontFile.value.name
    )}`;
    const backFileName = `${generateRandomString()}_back.${getFileExtension(
      selectedBackFile.value.name
    )}`;

    await uploadFile(frontFileName, selectedFrontFile.value);
    await uploadFile(backFileName, selectedBackFile.value);

    // Update the user's verification in Supabase data
    const { data, error } = await supabase.from("verification").upsert(
      {
        id: authStore.state.session.user.id,
        driver_license_front: frontFileName,
        driver_license_back: backFileName,
        driver_license_number: licenseNumber.value,
        driver_license_exp_date: expirationDate.value,
      },
      {
        onConflict: ["id"],
      }
    );

    if (error) {
      console.error("Error updating verification:", error.message);
    } else {
      $q.notify({
        position: "top",
        color: "positive",
        message: "Verification data uploaded successfully",
      });
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
  } finally {
    uploading.value = false; // Set loading state to false regardless of success or failure
  }
}

async function uploadFile(fileName, file) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, error } = await supabase.storage
        .from("licences") // Corrected bucket name to "licences"
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });
      if (error) {
        console.error("Error uploading file:", error.message);
        reject(error.message);
      } else {
        resolve(data.Key);
      }
    } catch (error) {
      reject(error.message);
    }
  });
}

function generateRandomString() {
  return Math.random().toString(36).substring(2, 15);
}

function getFileExtension(fileName) {
  if (!fileName) {
    return ""; // or handle it in a way that makes sense for your application
  }
  return fileName.split(".").pop();
}
</script>

<style scoped>
.documentsform {
  text-align: center;
}
</style>
