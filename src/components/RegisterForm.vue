<template>
  <q-form class="row flex-center flex" @submit.prevent="handleRegister">
    <div class="signin">
      <div class="text-green-10">
        <h2 class="header">Register</h2>
      </div>
      <q-input
        required
        color="green-5"
        type="text"
        placeholder="Your username"
        v-model="username"
      />
      <q-input
        required
        color="green-5"
        type="password"
        placeholder="Your password"
        v-model="password"
      />
      <q-btn
        icon="person_add"
        color="green-5"
        label="Register"
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
const username = ref("");
const password = ref("");

const $q = useQuasar();

const handleRegister = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signUp({
      email: username.value,
      password: password.value,
    });
    if (error) throw error;
    $q.notify({
      color: "positive",
      position: "top",
      message: "Registered successfully!",
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
