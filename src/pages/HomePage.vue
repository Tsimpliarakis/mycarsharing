<template>
  <q-page>
    <q-parallax src="../../public/carbg.jpeg">
      <SearchBar />
    </q-parallax>
    <div class="flex flex-center">
      ---------------- Rest of the site ----------------
    </div>
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
