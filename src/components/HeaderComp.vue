<template>
  <q-header elevated class="bg-green-5 text-white">
    <q-toolbar>
      <q-toolbar-title class="text-green-10">
        <router-link to="/" class="no-decoration">
          <q-avatar>
            <img src="../assets/favicon.png" />
          </q-avatar>
          mycarsharing
        </router-link>
      </q-toolbar-title>
      <q-btn
        flat
        icon="person"
        @click="redirectToLogin"
        v-if="!authStore.state.session && $route.path !== '/login'"
        >Login</q-btn
      >
      <profile-button v-if="authStore.state.session" />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { authStore } from "../stores/auth-store";
import ProfileButton from "../components/ProfileButton.vue";

const router = useRouter();

const redirectToLogin = () => {
  router.push("/login");
};
</script>

<style scoped>
.no-decoration {
  color: inherit;
  text-decoration: none;
}
</style>
