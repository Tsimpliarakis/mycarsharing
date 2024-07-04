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
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { supabase } from "src/lib/supabaseClient";

const $q = useQuasar();
const newPassword = ref("");

const resetPassword = async () => {
  const urlParams = new URLSearchParams(window.location.hash.substring(1));
  const token = urlParams.get("access_token");

  if (!token) {
    $q.notify({
      message: "Invalid reset token",
      color: "negative",
    });
    return;
  }

  const { error } = await supabase.auth.api.updateUser(token, {
    password: newPassword.value,
  });

  if (error) {
    $q.notify({
      message: error.message,
      color: "negative",
    });
  } else {
    $q.notify({
      message: "Password reset successful!",
      color: "positive",
    });
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
