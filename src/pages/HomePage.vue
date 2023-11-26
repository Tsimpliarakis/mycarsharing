<template>
  <q-page class="flex flex-center search background">
    <SearchBar />
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
