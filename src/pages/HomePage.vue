<template>
  <q-page>
    <q-parallax src="../assets/carbg.jpeg" class="parallax-div">
      <SearchBar class="search" />
    </q-parallax>
    <Suggestions />
  </q-page>
</template>

<script setup>
import SearchBar from "src/components/SearchBar.vue";
import Suggestions from "src/components/SuggestionsComp.vue";
</script>

<style scoped>
@media (min-width: 500px) {
  .search {
    position: absolute;
    left: 0;
    margin-left: 10vw;
    margin-top: 0;
  }
}

@media (max-width: 500px) {
  .parallax-div {
    min-height: 80vh;
  }
  .search {
    margin-top: calc(-40px + 2vh);
  }
}
</style>
