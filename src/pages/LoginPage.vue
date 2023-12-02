<!-- Your parent component -->
<template>
  <q-page class="flex flex-center justify-center">
    <MagicLinkForm
      class="form"
      v-show="showMagicLinkForm"
      :toggleMagicLink="toggleMagicLinks"
    />
    <LoginForm
      class="form"
      v-show="showLoginForm"
      :toggleForm="toggleForms"
      :toggleMagicLink="toggleMagicLinks"
    />
    <RegisterForm
      class="form"
      v-show="showRegisterForm"
      :toggleForm="toggleForms"
    />
  </q-page>
</template>

<script>
import MagicLinkForm from "../components/MagicLinkForm.vue";
import LoginForm from "../components/LoginForm.vue";
import RegisterForm from "../components/RegisterForm.vue";

export default {
  components: {
    MagicLinkForm,
    LoginForm,
    RegisterForm,
  },
  data() {
    return {
      showLoginForm: true,
      showRegisterForm: false,
      showMagicLinkForm: false,
    };
  },
  methods: {
    toggleForms(isRegisterForm) {
      this.showLoginForm = !isRegisterForm;
      this.showRegisterForm = isRegisterForm;
    },
    toggleMagicLinks(isMagicLinkForm) {
      this.showLoginForm = !isMagicLinkForm;
      this.showMagicLinkForm = isMagicLinkForm;
    },
  },
};
</script>

<style scoped>
.form {
  margin-bottom: 100px;
}
</style>
