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
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authStore.state.session.user.id)
          .single();

        if (profileError)
          throw new Error(
            `Error fetching user profile: ${profileError.message}`
          );

        const { data: verificationData, error: verificationError } =
          await supabase
            .from("verification")
            .select("is_verified")
            .eq("id", authStore.state.session.user.id)
            .single();

        if (verificationError)
          throw new Error(
            `Error fetching verification data: ${verificationError.message}`
          );

        if (profileData && verificationData) {
          const { username, avatar_url, full_name } = profileData;
          const { is_verified } = verificationData;

          authStore.mutations.setProfile(authStore.state, {
            userName: username,
            fullName: full_name,
            avatar: avatar_url,
            isVerified: is_verified,
          });
        }
      } catch (error) {
        console.error(error);
      }
    };

    onMounted(() => {
      if (authStore.state.session.user) {
        fetchUserProfile();
      }

      supabase.auth.onAuthStateChange((_, session) => {
        authStore.mutations.setSession(authStore.state, session);

        if (session) {
          fetchUserProfile();
        } else {
          authStore.mutations.setProfile(authStore.state, {
            userName: "",
            fullName: "",
            avatar: "",
            isVerified: false,
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
