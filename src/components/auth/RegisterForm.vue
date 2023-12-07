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
        placeholder="Your email"
        v-model="username"
      />
      <q-input
        required
        color="green-5"
        type="password"
        placeholder="Your password"
        v-model="password"
      />
      <q-input
        required
        color="green-5"
        type="password"
        placeholder="Confirm password"
        v-model="confirmPassword"
      />
      <q-btn
        icon="person_add"
        color="green-5"
        label="Register"
        type="submit"
        class="btn"
      />
      <div>
        <div>Already have an account?</div>
        <span class="clickable-text" @click="toggleForm('LoginForm')"
          >Login here.</span
        >
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { supabase } from "src/lib/supabaseClient.js";

const { toggleForm: parentToggleForm } = defineProps(["toggleForm"]);
const username = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const $q = useQuasar();

const toggleForm = (formName) => {
  parentToggleForm(formName);
};

const handleRegister = async () => {
  try {
    if (password.value !== confirmPassword.value) {
      throw new Error("Passwords do not match");
    }

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
.btn {
  width: 100%;
  margin-top: 15px;
  margin-bottom: 15px;
}

.clickable-text {
  color: #38663a;
  cursor: pointer;
}
</style>
