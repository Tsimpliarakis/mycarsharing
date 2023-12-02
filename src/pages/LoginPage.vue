<!-- Your parent component -->
<template>
  <q-page class="flex flex-center justify-center">
    <component :is="activeForm" class="form" :toggleForm="toggleForms"/>
  </q-page>
</template>

<script>
import MagicLinkForm from "../components/auth/MagicLinkForm.vue";
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";

export default {
  components: {
    MagicLinkForm,
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      activeForm: "LoginForm"
    };
  },
  methods: {
    toggleForms(newForm) {
      this.activeForm = newForm;
    },
  },
};
</script>

<style scoped>
.form {
  margin-bottom: 100px;
}
</style>
