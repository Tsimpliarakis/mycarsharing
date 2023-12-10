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
            label="Cars"
            push
            size="sm"
            v-close-popup
            @click="$router.push('/cars')"
          />
        </div>

        <q-separator vertical inset class="q-mx-lg" />

        <div class="column items-center">
          <q-avatar size="72px">
            <img :src="userAvatar" />
          </q-avatar>

          <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userName }}</div>

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
import { ref, onMounted } from "vue";
import { authStore } from "../stores/auth-store";
import { supabase } from "../lib/supabaseClient";

export default {
  setup() {
    const mobileData = ref(false);
    const bluetooth = ref(false);
    const userAvatar = ref(null);
    const userName = ref(null);

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

    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url, username")
          .eq("id", authStore.state.session.user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          userAvatar.value = data.avatar_url;
          userName.value = data.username;
        }
      } catch (error) {
        $q.notify({
          color: "negative",
          position: "top",
          message: error.message,
        });
      }
    };

    onMounted(() => {
      fetchUserData();
    });

    return {
      mobileData,
      bluetooth,
      userAvatar,
      userName,
      logoutSession,
    };
  },
};
</script>
