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
                  <div>{{ notification.displayMessage }}</div>
                  <div class="notification-time">
                    {{ notification.formattedTime }}
                  </div>
                </q-item-section>
                <q-separator v-if="index < notifications.length - 1" />
              </q-item>
              <q-btn flat @click="clearNotifications" class="clear-btn">
                Clear Notifications
              </q-btn>
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
import { ref, computed, onMounted } from "vue";
import { authStore } from "../stores/auth-store";
import { createClient } from "@supabase/supabase-js";
import MenuButton from "src/components/MenuButton.vue";
import { supabase } from "src/lib/supabaseClient.js";

const router = useRouter();
const notifications = ref([]);
const notificationMenu = ref(false);

const fetchNotifications = async () => {
  const { data, error } = await supabase
    .from("notifications")
    .select("*")
    .eq("user_id", authStore.state.session.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching notifications:", error);
  } else {
    notifications.value = data.map((notification) => {
      let message;
      switch (notification.message) {
        case 1:
          message = "You have a new booking!";
          break;
        case 2:
          message = "You have a new review!";
          break;
        default:
          message = "You have a new notification!";
      }
      return {
        ...notification,
        displayMessage: message,
        formattedTime: new Date(notification.created_at).toLocaleString(),
      };
    });
  }
};

const clearNotifications = async () => {
  const { error } = await supabase
    .from("notifications")
    .delete()
    .eq("user_id", authStore.state.session.user.id);

  if (error) {
    console.error("Error clearing notifications:", error);
  } else {
    notifications.value = [];
  }
};

onMounted(() => {
  if (authStore.state.session) {
    fetchNotifications();
  }
});

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
  top: 5px; /* Adjusted for better positioning */
  right: 5px; /* Adjusted for better positioning */
  width: 12px;
  height: 12px;
  background-color: red;
  border-radius: 50%;
}

.notification-time {
  font-size: 0.8em;
  color: gray;
}

.clear-btn {
  width: 100%;
  text-align: center;
  color: red;
  margin-top: 10px;
}
</style>
