<template>
  <div class="q-pa-md">
    <q-btn-dropdown
      color="green-8"
      label="My Account"
      dropdown-icon="change_history"
    >
      <div class="row no-wrap q-pa-md">
        <div class="column">
          <div class="text-h6 q-mb-md">Settings</div>
          <q-toggle v-model="mobileData" label="Use Mobile Data" />
          <q-toggle v-model="bluetooth" label="Bluetooth" />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

          <q-btn
            color="green-5"
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

<script>
import { ref } from "vue";
import { authStore } from "../stores/auth-store";
import { supabase } from "../lib/supabaseClient";

export default {
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
      mobileData: ref(false),
      bluetooth: ref(false),
      logoutSession,
      authStore,
    };
  },
};
</script>
