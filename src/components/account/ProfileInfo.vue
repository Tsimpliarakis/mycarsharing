<template>
  <div class="personal-info-form">
    <br />
    <q-separator color="green" style="width: 100%; height: 3px" />
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
    <q-separator
      color="green-3"
      style="width: 90%; height: 2px; margin-left: 5%"
    />
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
    <q-separator color="green" style="width: 100%; height: 3px" />
    <br />
    <q-btn
      @click="submitInfo"
      color="green-7"
      label="Submit"
      :loading="submitting"
    />
  </div>
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
const submitting = ref(false);
const $q = useQuasar();

async function submitInfo() {
  submitting.value = true;

  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({
        description: description.value,
        phone: phoneNumber.value,
        first_name: firstName.value,
        last_name: lastName.value,
      })
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
</style>
