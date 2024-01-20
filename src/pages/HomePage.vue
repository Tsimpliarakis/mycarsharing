<template>
  <q-page>
    <q-parallax src="../assets/carbg.jpeg">
      <SearchBar class="search" />
    </q-parallax>
    <div class="flex flex-center">
      ---------------- Rest of the site ----------------
    </div>
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

<style scoped>
@media (orientation: landscape) and (min-width: 500px) {
  .search {
    position: absolute;
    left: 0;
    margin-left: 10vw;
  }
}
</style>
