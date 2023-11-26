<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="blue text-white">
      <!-- ^^ change the color to almost transparent ^^ -->
      <q-toolbar>
        <q-toolbar-title class="text-green-10">
          <router-link to="/" class="no-decoration">
            <q-avatar>
              <img src="../../public/icons/favicon.png" />
            </q-avatar>
            mycarsharing
          </router-link>
        </q-toolbar-title>
        <q-btn
          dense
          flat
          icon="person"
          @click="redirectToLogin"
          v-if="!authStore.state.session"
          >Login</q-btn
        >
        <!-- change the login to logout buttons if the user is logged in -->
        <q-btn
          v-if="authStore.state.session"
          dense
          flat
          icon="logout"
          @click="logoutSession"
          >Logout</q-btn
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-blue-grey-4 text-white">
      <q-toolbar> blabla </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import { authStore } from "../stores/auth-store";
import { supabase } from "../lib/supabaseClient";

export default defineComponent({
  name: "MainLayout",
  methods: {
    redirectToLogin() {
      // Use the router to navigate to the /login route
      this.$router.push("/login");
    },
  },
  setup() {
    const logoutSession = async () => {
      try {
        await supabase.auth.signOut();
        authStore.state.session = null; // Clear the session in the Pinia store
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: error.message,
        });
      }
    };
    return {
      authStore,
      logoutSession,
    };
  },
});
</script>

<style scoped>
/* Style to prevent color change on click */
.no-decoration {
  color: inherit;
  text-decoration: none;
}
</style>
