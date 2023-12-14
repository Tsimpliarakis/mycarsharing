// App.vue
<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { supabase } from "./lib/supabaseClient";
import { authStore } from "./stores/auth-store";

export default defineComponent({
  name: "App",
  setup() {
    const fetchUserProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authStore.state.session.user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", error.message);
        return;
      }

      if (data) {
        const { username, avatar_url, full_name } = data;
        authStore.mutations.setProfile(authStore.state, {
          userName: username,
          fullName: full_name,
          avatar: avatar_url,
        });
      }
    };

    onMounted(async () => {
      // Fetch the user's profile information when the component is mounted
      if (authStore.state.session.user) {
        await fetchUserProfile();
      }

      // Subscribe to changes in authentication state
      supabase.auth.onAuthStateChange((_, session) => {
        authStore.mutations.setSession(authStore.state, session);

        // Fetch and update user profile when the authentication state changes
        if (session) {
          fetchUserProfile();
        } else {
          // Clear user profile when the user is logged out
          authStore.mutations.setProfile(authStore.state, {
            userName: "",
            fullName: "",
            avatar: "",
          });
        }
      });
    });

    return {
      authStore,
    };
  },
});
</script>
