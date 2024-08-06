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
          />
          <q-btn
            type="submit"
            label="Reset Password"
            color="primary"
            class="q-mt-md"
            :loading="loading"
          />
        </q-form>
        <q-banner v-if="error" type="negative" class="q-mt-md">
          {{ error }}
        </q-banner>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { supabase } from "../lib/supabaseClient";

export default {
  data() {
    return {
      newPassword: "",
      loading: false,
      error: null,
    };
  },
  methods: {
    async resetPassword() {
      this.error = null;
      this.loading = true;
      try {
        const token = this.$route.query.token;
        if (!token) {
          throw new Error("Invalid token");
        }

        const { error } = await supabase.auth.updateUser(token, {
          password: this.newPassword,
        });

        if (error) {
          throw error;
        }

        this.$q.notify({
          type: "positive",
          message: "Password has been successfully reset!",
        });

        this.$router.push("/login");
      } catch (err) {
        this.error =
          err.message || "Failed to reset password. Please try again.";
      } finally {
        this.loading = false;
      }
    },
  },
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
