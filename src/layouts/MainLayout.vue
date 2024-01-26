<template>
  <q-layout view="hHh lpr fff">
    <q-header elevated class="bg-green-5 text-white">
      <!-- ^^ change the color to almost transparent ^^ -->
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
        <!-- change the login to Account buttons if the user is logged in -->
        <profile-button v-if="authStore.state.session" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-green-5 text-white">
      <q-toolbar>
        <ul>
          <router-link to="/about">
            <li>About</li>
          </router-link>
        </ul>
      </q-toolbar>
    </q-footer>
  </q-layout>
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
/* Style to prevent color change on click */
.no-decoration {
  color: inherit;
  text-decoration: none;
}

.q-page-container {
  background-color: #f1f1f1;
}
</style>
