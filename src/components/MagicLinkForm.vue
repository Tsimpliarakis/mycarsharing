<template>
  <q-form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="signin">
      <div class="text-green-10">
        <h2 class="header">Sign in</h2>
      </div>
      <div>Sign in via magic link with your email below</div>
      <q-input
        required
        color="green-5"
        type="email"
        placeholder="Your email"
        v-model="email"
      />
      <q-btn
        icon="mail"
        color="green-5"
        label="Send email"
        type="submit"
        style="margin-top: 10px"
      />
    </div>
  </q-form>
</template>

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
      message: "Email sent. Check your inbox for the login link!",
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

<style scoped>
.signin {
  margin-top: -100px;
}
</style>
