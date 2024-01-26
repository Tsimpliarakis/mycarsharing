<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { authStore } from "./stores/auth-store";
import { supabase } from "src/lib/supabaseClient";

onMounted(async () => {
  authStore.actions.setSessionFromLocalStorage();

  if (authStore.state.session.user) {
    await authStore.actions.fetchUserProfile(
      supabase,
      authStore.state.session.user.id
    );
  }

  supabase.auth.onAuthStateChange((_, session) => {
    authStore.mutations.setSession(authStore.state, session);

    if (session) {
      authStore.actions.fetchUserProfile(supabase, session.user.id);
    }
  });
});
</script>
