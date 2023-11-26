<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { supabase } from "./lib/supabaseClient";
import { authStore } from "./stores/auth-store";

export default defineComponent({
  name: "App",
  setup() {
    onMounted(() => {
      supabase.auth.getSession().then(({ data }) => {
        authStore.state.session = data.session;
      });

      supabase.auth.onAuthStateChange((_, session) => {
        authStore.state.session = session;
      });
    });

    return {
      authStore,
    };
  },
});
</script>
