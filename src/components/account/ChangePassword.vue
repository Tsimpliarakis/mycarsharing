<template>
  <div class="change-password-form">
    <br />
    <q-separator
      color="green"
      style="width: 120%; height: 3px; margin-left: -10%"
    />
    <br />
    <div class="input_field">
      <p style="text-align: left; font-weight: bold">Change Password</p>
      <q-input
        v-model="newPassword"
        type="password"
        color="green-7"
        label="New Password"
        placeholder="Enter your new password"
        :disable="loading"
        dense
        outlined
        clearable
      />
      <q-input
        v-model="confirmPassword"
        type="password"
        color="green-7"
        label="Confirm New Password"
        placeholder="Re-enter your new password"
        :disable="loading"
        dense
        outlined
        clearable
        class="q-mt-md"
      />
    </div>
    <q-separator
      color="green-3"
      style="width: 110%; height: 2px; margin-left: -5%"
    />
    <br />
    <q-btn
      @click="changePassword"
      color="green-7"
      label="Change Password"
      :loading="loading"
      style="margin-bottom: 20px"
    />
    <q-banner v-if="error" type="negative" class="q-mt-md">
      {{ error }}
    </q-banner>
    <q-banner v-if="success" type="positive" class="q-mt-md">
      {{ success }}
    </q-banner>
    <br />
    <q-separator
      color="green"
      style="width: 120%; height: 3px; margin-left: -10%"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { useQuasar } from "quasar";
import { authStore } from "src/stores/auth-store";

const newPassword = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const error = ref(null);
const success = ref(null);
const $q = useQuasar();

async function changePassword() {
  error.value = null;
  success.value = null;

  if (newPassword.value !== confirmPassword.value) {
    error.value = "Passwords do not match.";
    return;
  }

  loading.value = true;
  try {
    const user = authStore.state.session.user.id;

    if (!user) {
      throw new Error("User is not authenticated.");
    }

    const { error: changeError } = await supabase.auth.updateUser({
      password: newPassword.value,
    });

    if (changeError) {
      throw changeError;
    }

    success.value = "Password has been successfully changed!";
    $q.notify({
      type: "positive",
      message: success.value,
      position: "top",
    });

    setTimeout(() => {
      $router.push("/login");
    }, 1500);
  } catch (err) {
    error.value = err.message || "Failed to change password. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.change-password-form {
  text-align: center;
  max-width: 400px;
  margin: auto;
  padding: 20px;
}
.input_field {
  margin-bottom: 20px;
}

.q-banner {
  background-color: transparent;
}
</style>
