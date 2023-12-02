<template>
  <div class="q-pa-md">
    <q-input
      outlined
      v-model="searchTerm"
      label="Search"
      @keyup.enter="searchData"
      required
    />
    <q-date
      v-model="date"
      mask="YYYY-MM-DD"
      today-btn
      @input="searchData"
      required
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { supabase } from "src/lib/supabaseClient.js";

const searchTerm = ref("");
const date = ref("");
const router = useRouter();

const searchData = async () => {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .ilike("pickup_location", `%${searchTerm.value}%`)
      .eq("start_date", date.value);

    if (error) throw error;
    console.log(data);

    // Redirect to the search page
    router.push("/search");
  } catch (error) {
    console.error(error);
  }
};
</script>
