<template>
  <q-page>
    <q-parallax src="../assets/carbg.jpeg" class="parallax-div">
      <SearchBar class="search" />
    </q-parallax>
    <div class="flex flex-center column suggestions">
      <div class="">Cars in Polykastro</div>
      <div class="flex flex-center row">
        <CarThumbnail v-for="car in cars" :key="car.id" :car="car" />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import SearchBar from "components/SearchBar.vue";
import CarThumbnail from "components/car/CarThumbnail.vue";
import { ref, onMounted } from "vue";
import { supabase } from "src/lib/supabaseClient.js";

const cars = ref([]);

onMounted(async () => {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .ilike("location", "Polykastro");
  if (error) console.log("Error: ", error);
  else {
    cars.value = data || [];
  }
});
</script>

<style scoped>
@media (orientation: landscape) and (min-width: 500px) {
  .search {
    position: absolute;
    left: 0;
    margin-left: 10vw;
    margin-top: 0;
  }
  .suggestions {
    margin-top: 50px;
  }
}

@media (orientation: portrait) and (max-width: 500px) {
  .parallax-div {
    min-height: 80vh;
  }
  .suggestions {
    margin-bottom: 30px;
  }

  .search {
    margin-top: calc(-40px + 2vh);
  }
}
</style>
