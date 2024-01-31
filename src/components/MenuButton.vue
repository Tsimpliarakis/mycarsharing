<template>
  <div class="q-pa-md">
    <q-btn-dropdown color="green-7" label="Menu" dropdown-icon="change_history">
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="q-mb-md" style="font-size: 18px; font-weight: 500">
            Dashboard
          </div>
          <q-btn
            class="q-mb-md"
            color="green-5"
            label="My Cars"
            push
            size="sm"
            v-close-popup
            @click="$router.push('/mycars')"
          />
          <q-btn
            class="q-mb-md"
            color="green-5"
            label="Favorites"
            push
            size="sm"
            v-close-popup
            @click="$router.push('/favorites')"
          />
          <q-btn
            class="q-mb-md"
            color="green-5"
            label="Bookings"
            push
            size="sm"
            v-close-popup
            @click="$router.push('/bookings')"
          />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <router-link
            style="text-decoration: none; color: inherit"
            to="/account"
            class="text-center"
          >
            <q-avatar size="72px">
              <img :src="authStore.state.profile.avatar" />
            </q-avatar>

            <div
              class="text-subtitle1 q-mt-md q-mb-xs"
              style="
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              "
            >
              {{ authStore.state.profile.userName }}
            </div>
          </router-link>
          <q-btn
            class="logout"
            color="red-6"
            label="Logout"
            push
            size="sm"
            v-close-popup
            @click="logoutSession"
          />
        </div>
      </div>
    </q-btn-dropdown>
  </div>
</template>

<script setup>
import { authStore } from "../stores/auth-store";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();

const router = useRouter();

const logoutSession = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "report_problem",
      message: error.message,
      position: "top",
    });
  } else {
    $q.notify({
      color: "orange-5",
      textColor: "white",
      icon: "exit_to_app",
      message: "Logged out successfully",
      position: "top",
    });

    router.push("/");
  }
};
</script>

<style scoped>
.logout {
  margin-top: 7px;
}
</style>
