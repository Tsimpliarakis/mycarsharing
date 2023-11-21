<template>
  <q-page class="flex flex-center">
    <SearchBar />
  </q-page>
</template>

<script>
import { defineComponent } from "vue";
import SearchBar from "components/SearchBar.vue";

export default defineComponent({
  name: "HomePage",
  components: {
    SearchBar,
  },
});
</script>
