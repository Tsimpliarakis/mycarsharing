<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <div v-if="cars && cars.length > 0">
        You have {{ cars.length }} car(s).
      </div>
      <div v-else>
        <div class="text-h6">You don't have any cars yet.</div>
      </div>
      <br />
      <br />
      <q-btn color="green" label="Add car" @click="$router.push('/cars/new')" />
    </div>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import { authStore } from "../stores/auth-store";
import { supabase } from "../lib/supabaseClient";

export default {
  setup() {
    const cars = ref([]);

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

    return { cars };
  },
};
</script>
