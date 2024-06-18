<template>
  <q-page class="flex flex-center justify-center">
    <component :is="activeForm" class="form" :toggleForm="toggleForms" />
  </q-page>
</template>

<script>
import MagicLinkForm from "../components/auth/MagicLinkForm.vue";
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";
import ForgotPassword from "../components/auth/ForgotPassword.vue"; // Import the ForgotPassword component

export default {
  components: {
    MagicLinkForm,
    LoginForm,
    RegisterForm,
    ForgotPassword, // Include ForgotPassword component in components section
  },
  data() {
    return {
      activeForm: "LoginForm", // Default active form is LoginForm
    };
  },
  methods: {
    toggleForms(newForm) {
      this.activeForm = newForm; // Method to toggle between different forms
    },
  },
};
</script>

<style scoped>
.form {
  margin-bottom: 100px;
}
</style>
