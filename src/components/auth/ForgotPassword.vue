<template>
  <q-form class="row flex-center flex" @submit.prevent="handleForgotPassword">
    <div class="signin">
      <div class="text-green-10">
        <h2 class="header" style="height: 22px">Forgot</h2>
        <h2 class="header" style="height: 22px">Password</h2>
      </div>
      <q-input
        required
        color="green-5"
        type="text"
        placeholder="Your email"
        v-model="email"
      />
      <q-btn
        icon="email"
        color="green-5"
        label="Reset Password"
        type="submit"
        class="btn"
        :loading="loading"
      />
      <div class="divide">------------ OR ------------</div>
      <div class="text-center">
        Back to
        <span class="clickable-text" @click="toggleForm('LoginForm')"
          >Login</span
        >
        or
        <span class="clickable-text" @click="toggleForm('RegisterForm')"
          >Register</span
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
const email = ref("");
const loading = ref(false);
const $q = useQuasar();

const toggleForm = (formName) => {
  parentToggleForm(formName);
};

const handleForgotPassword = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.resetPasswordForEmail(email.value);
    if (error) throw error;
    $q.notify({
      color: "positive",
      position: "top",
      message:
        "If there is a user register with this email, a reset password link will be sent to the email.",
      icon: "email",
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
.divide {
  text-align: center;
  margin: 30px;
}
</style>
