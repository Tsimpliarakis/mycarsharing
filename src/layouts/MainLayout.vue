<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <router-link to="/" class="no-decoration"> mycarsharing </router-link>
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
      <q-list>
        <div class="text-center">
          <q-item-label header> Essential Links </q-item-label>
        </div>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          class="no-decoration"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref, defineComponent } from "vue";
import EssentialLink from "components/EssentialLink.vue";

const linksList = [
  {
    title: "Login",
    caption: "Get a magic link to sign in",
    icon: "person",
    link: "/login",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const rightDrawerOpen = ref(false);

    return {
      essentialLinks: linksList,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
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
