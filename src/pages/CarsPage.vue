<template>
  <q-page class="flex flex-center">
    <div v-if="loading">Loading...</div>
    <div v-else-if="cars && cars.length > 0">
      You have {{ cars.length }} car(s).
    </div>
    <div v-else>You don't have any cars yet. Please add a car.</div>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { authStore } from "../stores/auth-store";
import { supabase } from "../lib/supabaseClient";
import { useRouter } from "vue-router";

export default {
  setup() {
    const cars = ref([]);
    const loading = ref(true);

    onMounted(async () => {
      const { data, error } = await supabase
        .from("cars")
        .select("*")
        .eq("user_id", authStore.state.session.user.id);

      if (error) console.log("Error: ", error);
      else {
        cars.value = data || [];
        loading.value = false;
      }
    });

    return { cars, loading, authStore };
  },
};
</script>
