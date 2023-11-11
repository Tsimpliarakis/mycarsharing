<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <router-link to="/" class="no-decoration"> mycarsharing </router-link>
        </q-toolbar-title>
        <q-btn flat dense round icon="menu" aria-label="Menu" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",
});
</script>

<style scoped>
/* Style to prevent color change on click */
.no-decoration {
  color: inherit;
  text-decoration: none;
}
</style>
