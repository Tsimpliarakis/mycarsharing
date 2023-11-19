<script setup>
import { ref } from "vue";
import { supabase } from "src/lib/supabaseClient.js";
import { useQuasar } from "quasar";

const loading = ref(false);
const email = ref("");

const $q = useQuasar();

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
    if (error) throw error;
    $q.notify({
      color: "positive",
      position: "top",
      message: "Good job!",
    });
  } catch (error) {
    if (error instanceof Error) {
      $q.notify({
        color: "negative",
        position: "top",
        message: error.message,
      });
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <q-page class="flex flex-center">
    <q-form class="row flex-center flex" @submit.prevent="handleLogin">
      <div>
        <div class="text-blue">
          <h2 class="header">Sign in</h2>
        </div>
        <div>Sign in via magic link with your email below</div>
        <q-input
          required
          type="email"
          placeholder="Your email"
          v-model="email"
        />
        <q-btn
          icon="mail"
          color="blue"
          label="Send email"
          type="submit"
          style="margin-top: 10px"
        />
      </div>
    </q-form>
  </q-page>
</template>
