<template>
  <q-page>
    <q-parallax src="../assets/carbg.jpeg" class="parallax-div">
      <SearchBar class="search" />
    </q-parallax>
    <div class="column suggestions">
      <div v-for="(location, index) in ['Polykastro', 'Corfu']" :key="index">
        <div class="text-center text-h6">Cars in {{ location }}</div>
        <q-scroll-area style="height: 286px">
          <div class="row no-wrap">
            <CarThumbnail
              v-for="car in cars[location]"
              :key="car.id"
              :car="car"
            />
          </div>
        </q-scroll-area>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import SearchBar from "components/SearchBar.vue";
import CarThumbnail from "components/car/CarThumbnail.vue";
import { ref, onMounted } from "vue";
import { supabase } from "src/lib/supabaseClient.js";

const cars = ref({ Polykastro: [], Corfu: [] });

const fetchCarsByLocation = async (location) => {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .ilike("location", location);
  if (error) console.log(`Error fetching ${location}: `, error);
  return data || [];
};

onMounted(async () => {
  const locations = ["Polykastro", "Corfu"];
  const fetchPromises = locations.map(fetchCarsByLocation);
  const [polykastroData, corfuData] = await Promise.all(fetchPromises);
  cars.value = { Polykastro: polykastroData, Corfu: corfuData };
});
</script>

<style scoped>
@media (min-width: 500px) {
  .search {
    position: absolute;
    left: 0;
    margin-left: 10vw;
    margin-top: 0;
  }
  .suggestions {
    margin-top: 50px;
    margin-left: 10%;
    width: 80%;
    max-width: 800px;
  }
}

@media (min-width: 1000px) {
  .suggestions {
    margin-left: calc((100% - 800px) / 2);
  }
}

@media (max-width: 500px) {
  .parallax-div {
    min-height: 80vh;
  }
  .suggestions {
    margin-bottom: 30px;
    margin-left: 5%;
    width: 90%;
  }

  .search {
    margin-top: calc(-40px + 2vh);
  }
}

.q-scrollarea:deep(.q-scrollarea__thumb) {
  display: none;
}
</style>
