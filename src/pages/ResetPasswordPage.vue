<template>
  <q-page class="flex flex-center">
    <q-card class="q-pa-md">
      <q-card-section>
        <div class="text-h6">Reset Password</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit.prevent="resetPassword">
          <q-input
            v-model="newPassword"
            type="password"
            label="New Password"
            required
            :rules="[(val) => !!val || 'Password is required']"
          />

          <q-btn
            type="submit"
            label="Reset Password"
            color="primary"
            class="q-mt-md"
          />
        </q-form>
      </q-card-section>

      <q-card-section v-if="message" class="text-center">
        <q-banner dense inline-actions v-ripple>
          <template v-slot:avatar>
            <q-icon :name="messageIcon" color="white" />
          </template>
          {{ message }}
        </q-banner>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { supabase } from "src/lib/supabaseClient";

const $q = useQuasar();
const newPassword = ref("");
const message = ref("");
const messageIcon = ref("");

const resetPassword = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");

  if (!token) {
    $q.notify({
      message: "Invalid reset token",
      color: "negative",
    });
    return;
  }

  const { error } = await supabase.auth.updateUser(token, {
    password: newPassword.value,
  });

  if (error) {
    message.value = `Error: ${error.message}`;
    messageIcon.value = "error";
  } else {
    message.value = "Password reset successful!";
    messageIcon.value = "check_circle";
  }
};
</script>

<style scoped>
.q-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.q-card {
  max-width: 400px;
  width: 100%;
}
</style>
