<template>
  <router-view :session="session" />

  <p v-if="session">User is connected!</p>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import { supabase } from "./lib/supabaseClient";

export default defineComponent({
  name: "App",
  setup() {
    const session = ref();

    onMounted(() => {
      supabase.auth.getSession().then(({ data }) => {
        session.value = data.session;
      });

      supabase.auth.onAuthStateChange((_, _session) => {
        session.value = _session;
      });
    });

    return {
      session,
    };
  },
});
</script>
