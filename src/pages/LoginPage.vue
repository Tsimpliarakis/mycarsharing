<template>
  <q-page class="flex flex-center justify-center">
    <MagicLinkForm />
    <LoginForm class="form" />
    <RegisterForm class="form" />
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
};
</script>

<style scoped>
.form {
  margin-left: 50px;
}
</style>
