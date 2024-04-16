<template>
  <q-page>
    <q-parallax src="../assets/carbg.jpeg" class="parallax-div">
      <SearchBar class="search" />
    </q-parallax>
    <Suggestions />
    <Moto class="moto" />
    <Instructions />
    <q-img class="footerimg" src="../assets/forest.jpeg" />
  </q-page>
</template>

<script setup>
import SearchBar from "src/components/SearchBar.vue";
import Suggestions from "src/components/SuggestionsComp.vue";
import Moto from "src/components/MotoComp.vue";
import Instructions from "src/components/InstructionsComp.vue";
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

.footerimg {
  width: 100%;
  margin-top: 20px;
  margin-bottom: -20px;
  mask-image: linear-gradient(to bottom, transparent 0%, black 100%);
  -webkit-mask-image: linear-gradient(to bottom, transparent 0%, black 25%);
}

@media screen and (min-width: 700px) {
  .footerimg {
    max-height: 300px;
  }
}

.moto {
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
