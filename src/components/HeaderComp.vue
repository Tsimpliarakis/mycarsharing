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
      <div v-if="authStore.state.session" class="row flex flex-center">
        <q-btn
          flat
          round
          icon="notifications"
          @click="toggleNotificationMenu"
          ref="notificationButton"
          style="height: 100%"
          v-if="hasNotifications"
        >
          <span v-if="hasNotifications" class="red-dot"></span>
        </q-btn>
        <q-menu class="text-center">
          <q-list style="min-width: 200px">
            <div v-if="notifications.length > 0">
              <q-item
                v-for="(notification, index) in notifications"
                :key="index"
              >
                <q-item-section>
                  {{ notification }}
                </q-item-section>
              </q-item>
            </div>
            <div v-else>
              <q-item>
                <q-item-section> No notifications </q-item-section>
              </q-item>
            </div>
          </q-list>
        </q-menu>
        <menu-button />
      </div>
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, computed } from "vue";
import { authStore } from "../stores/auth-store";
import MenuButton from "src/components/MenuButton.vue";

const router = useRouter();
const notifications = ref([
  "test notification",
  "another test notificdsadsdsadsadsaation",
  "test notification",
]);
const notificationMenu = ref(false);

const redirectToLogin = () => {
  router.push("/login");
};

const toggleNotificationMenu = () => {
  notificationMenu.value = !notificationMenu.value;
};

const hasNotifications = computed(() => {
  return notifications.value.length > 0;
});
</script>

<style scoped>
.no-decoration {
  color: inherit;
  text-decoration: none;
}

.red-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 12px; /* Increase size */
  height: 12px; /* Increase size */
  background-color: red;
  border-radius: 50%;
}
</style>
