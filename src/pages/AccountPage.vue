<template>
  <q-page>
    <div class="flex-container">
      <div class="left-panel">
        <div class="q-pa-md">
          <q-avatar size="72px">
            <img :src="userAvatar" />
          </q-avatar>
          <div class="text-subtitle2 q-mt-md q-mb-xs">{{ userName }}</div>
          <div class="text-subtitle1 q-mt-md q-mb-xs">{{ fullName }}</div>

          <!-- Add options for the user -->
          <div class="q-mt-md">
            <q-item @click="showComponent('changeAvatar')">
              <q-item-section>Change Avatar</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Upload documents</q-item-section>
            </q-item>
            <q-item>
              <q-item-section style="color: crimson"
                >Delete Account</q-item-section
              >
            </q-item>
            <!-- Add more options as needed -->
          </div>
        </div>
      </div>

      <div class="right-panel flex flex-center justify-center">
        <div class="q-pa-md">
          <!-- Use dynamic component to show the selected component -->
          <component :is="selectedComponent"></component>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { authStore } from "../stores/auth-store";
import { supabase } from "../lib/supabaseClient";

export default {
  setup() {
    const userAvatar = ref(null);
    const userName = ref(null);
    const fullName = ref(null);

    const fetchUserData = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("avatar_url, username, full_name")
          .eq("id", authStore.state.session.user.id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          userAvatar.value = data.avatar_url;
          userName.value = data.username;
          fullName.value = data.full_name;
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
      userAvatar,
      userName,
      fullName,
    };
  },
};
</script>
