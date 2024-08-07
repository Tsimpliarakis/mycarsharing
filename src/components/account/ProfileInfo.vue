<template>
  <q-page style="width: 50%">
    <div class="personal-info-form">
      <br />
      <q-separator color="green" style="width: 100%; height: 3px" />
      <br />
      <div class="input_field">
        <p style="text-align: left; font-weight: bold">First Name:</p>
        <q-input
          v-model="firstName"
          color="green-7"
          type="text"
          placeholder="Your First Name"
        />
      </div>
      <br />
      <q-separator
        color="green-3"
        style="width: 90%; height: 2px; margin-left: 5%"
      />
      <br />
      <div class="input_field">
        <p style="text-align: left; font-weight: bold">Last Name:</p>
        <q-input
          v-model="lastName"
          color="green-7"
          type="text"
          placeholder="Your Last Name"
        />
      </div>
      <br />
      <q-separator
        color="green-3"
        style="width: 90%; height: 2px; margin-left: 5%"
      />
      <br />
      <div class="input_field">
        <p style="text-align: left; font-weight: bold">Phone Number:</p>
        <q-input
          v-model="phoneNumber"
          color="green-7"
          type="tel"
          placeholder="e.g., +30 6912345678"
        />
      </div>
      <br />
      <q-separator
        color="green-3"
        style="width: 90%; height: 2px; margin-left: 5%"
      />
      <br />
      <div class="input_field">
        <p style="text-align: left; font-weight: bold">Date of Birth:</p>
        <q-input
          v-model="dateOfBirth"
          color="green-7"
          type="date"
          placeholder="YYYY-MM-DD"
        />
      </div>
      <br />
      <q-separator
        color="green-3"
        style="width: 90%; height: 2px; margin-left: 5%"
      />
      <br />
      <div class="input_field">
        <p style="text-align: left; font-weight: bold">Description:</p>
        <q-input
          v-model="description"
          color="green-7"
          type="textarea"
          placeholder="Tell us about yourself..."
        />
      </div>
      <br />
      <q-separator color="green" style="width: 100%; height: 3px" />
      <br />
      <q-btn
        @click="submitInfo"
        color="green-7"
        label="Submit"
        :loading="submitting"
      />
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { authStore } from "src/stores/auth-store";
import { useQuasar } from "quasar";

const description = ref("");
const phoneNumber = ref("");
const firstName = ref("");
const lastName = ref("");
const dateOfBirth = ref(""); // Added date of birth field
const submitting = ref(false);
const $q = useQuasar();

async function submitInfo() {
  submitting.value = true;

  // Construct an object with only the fields that have values
  const updatedFields = {};
  if (firstName.value) updatedFields.first_name = firstName.value;
  if (lastName.value) updatedFields.last_name = lastName.value;
  if (phoneNumber.value) updatedFields.phone = phoneNumber.value;
  if (dateOfBirth.value) updatedFields.date_of_birth = dateOfBirth.value;
  if (description.value) updatedFields.description = description.value;

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update(updatedFields)
      .eq("id", authStore.state.session.user.id);

    if (error) throw error;

    $q.notify({
      position: "top",
      color: "positive",
      message: "Personal info updated successfully",
    });
  } catch (error) {
    console.error("Failed to update personal info:", error.message);
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.personal-info-form {
  text-align: center;
}
.input_field p {
  margin-bottom: 5px;
}

.q-page {
  max-width: 350px;
}
</style>
