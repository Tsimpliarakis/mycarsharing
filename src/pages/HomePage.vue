<template>
  <q-page class="flex flex-center">
    <SearchBar />
    <p v-if="authStore">Welcome, {{ authStore.state.session.user.email }}!</p>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import SearchBar from "components/SearchBar.vue";
import { authStore } from "../stores/auth-store";

export default defineComponent({
  name: "HomePage",
  components: {
    SearchBar,
  },
  setup() {
    return {
      authStore,
    };
  },
});
</script>
