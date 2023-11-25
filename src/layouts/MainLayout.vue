<template>
  <q-layout view="hHh lpR fff">
    <q-header elevated class="blue text-white">
      <!-- ^^ change the color to almost transparent ^^ -->
      <q-toolbar>
        <q-toolbar-title class="text-green-10">
          <q-avatar>
            <img src="../../public/icons/favicon.png" />
          </q-avatar>
          <router-link to="/" class="no-decoration"> mycarsharing </router-link>
        </q-toolbar-title>
        <q-btn dense flat icon="person" @click="redirectToLogin">Login</q-btn>
        <!-- change the login to logout buttons if the user is logged in -->
        <q-btn dense>Share your car</q-btn>
        <q-btn dense flat icon="logout">Logout</q-btn>
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

export default defineComponent({
  name: "MainLayout",
  methods: {
    redirectToLogin() {
      // Use the router to navigate to the /login route
      this.$router.push("/login");
    },
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
