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
            label="Profile"
            push
            size="sm"
            v-close-popup
            @click="$router.push('/profile')"
          />
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
            label="Orders"
            push
            size="sm"
            v-close-popup
            @click="$router.push('/orders')"
          />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img :src="authStore.state.profile.avatar" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">
            {{ authStore.state.profile.userName }}
          </div>

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
