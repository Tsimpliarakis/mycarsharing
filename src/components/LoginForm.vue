<template>
  <q-form class="row flex-center flex" @submit.prevent="handleLogin">
    <div class="signin">
      <div class="text-green-10">
        <h2 class="header">Login</h2>
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
      <q-btn
        icon="login"
        color="green-5"
        label="Login"
        type="submit"
        class="btn"
      />
      <div>
        <div>Don't have an account?</div>
        <span class="clickable-text" @click="toggleForm">Register here.</span>
        <div class="divide">------------ OR ------------</div>
        <div>
          Simply sign in with
          <span class="clickable-text" @click="toggleMagicLink"
            >magic link.</span
          >
        </div>
      </div>
    </div>
  </q-form>
</template>

<script setup>
import { ref, defineProps } from "vue";
import { useQuasar } from "quasar";

const { toggleForm: parentToggleForm, toggleMagicLink: parentToggleMagicLink } =
  defineProps(["toggleForm", "toggleMagicLink"]);
const formText = ref("Login");
const magicLinkText = ref("Login");
const username = ref("");
const password = ref("");
const $q = useQuasar();

const toggleForm = () => {
  formText.value = formText.value === "Login" ? "Register" : "Login";
  parentToggleForm(formText.value === "Register");
};

const toggleMagicLink = () => {
  magicLinkText.value = magicLinkText.value === "Login" ? "Magic" : "Login";
  parentToggleMagicLink(magicLinkText.value === "Magic");
};

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithPassword({
      email: username.value,
      password: password.value,
    });
    if (error) throw error;
    $q.notify({
      color: "positive",
      position: "top",
      message: "Logged in successfully!",
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
