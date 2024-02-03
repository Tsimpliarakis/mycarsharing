<template>
  <q-page class="flex flex-center column q-pa-md">
    <div v-if="isLoading" class="text-h6">Vroom vroom...</div>
    <div v-else class="card">
      <q-card flat bordered>
        <q-carousel
          animated
          v-model="slide"
          infinite
          autoplay
          arrows
          navigation
          control-color="green-5"
          transition-prev="jump-right"
          transition-next="jump-left"
          height="300px"
        >
          <q-carousel-slide
            v-for="(url, index) in car.image_url"
            :name="index"
            :key="index"
            class="column no-wrap flex-center"
          >
            <q-img :src="url" spinner-color="white" />
          </q-carousel-slide>
        </q-carousel>
        <q-card-section>
          <div class="row items-center no-wrap">
            <div class="col">
              <div class="text-subtitle2 text-center">
                {{ car.manufacturer }} {{ car.model }}
              </div>
              <div class="text-caption text-center">
                {{ car.year }} | {{ car.mileage }} miles
              </div>
            </div>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-actions align="around">
          <q-btn
            flat
            round
            color="red"
            :icon="isFavorite ? 'favorite' : 'favorite_border'"
            @click="toggleFavorite"
          />

          <q-btn
            flat
            round
            color="accent"
            icon="share"
            @click="copyUrlToClipboard"
          />
          <q-btn flat round color="green" icon="car_rental" />
        </q-card-actions>
        <q-card-actions align="center">
          <ProfileButton
            :user="{
              username: user.username,
              avatar_url: user.avatar_url,
            }"
          />
        </q-card-actions>
      </q-card>
      <q-list flat bordered class="bg-white">
        <q-item>
          <q-item-section>Location</q-item-section>
          <q-item-section side>{{ car.location }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Price</q-item-section>
          <q-item-section side>{{ car.price }}€ / day</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Color</q-item-section>
          <q-item-section side>{{ car.color }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Fuel Type</q-item-section>
          <q-item-section side>{{ car.fuel_type }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Transmission Type</q-item-section>
          <q-item-section side>{{ car.transmission_type }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Mileage</q-item-section>
          <q-item-section side>{{ car.mileage }} miles</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>Additional Features</q-item-section>
          <q-item-section side>{{ car.additional_features }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { supabase } from "src/lib/supabaseClient.js";
import { useQuasar } from "quasar";
import { authStore } from "src/stores/auth-store.js";
import ProfileButton from "src/components/account/ProfileButton.vue";

const route = useRoute();
const car = ref(null);
const isLoading = ref(true);
const q = useQuasar();
const slide = ref(0);
const isFavorite = ref(false);
const user = ref("");

onMounted(async () => {
  try {
    const { data, error } = await supabase
      .from("cars")
      .select("*")
      .eq("car_id", route.query.id)
      .single();

    if (error) throw error;
    car.value = data;
    isLoading.value = false;
  } catch (error) {
    q.notify({
      color: "negative",
      message: "We couldn't find the car you were looking for.",
      position: "top",
      icon: "report_problem",
    });
  }
  const { data, error } = await supabase
    .from("profiles")
    .select("username,avatar_url")
    .eq("id", car.value.user_id)
    .single();
  if (error) throw error;
  user.value = data;

  await checkIfFavorite();
});

async function checkIfFavorite() {
  if (authStore.state.session) {
    try {
      const { data, error } = await supabase
        .from("favorites")
        .select("id")
        .eq("car_id", route.query.id)
        .eq("user_id", authStore.state.session.user.id);

      if (data.length > 0) {
        isFavorite.value = true;
      } else {
        isFavorite.value = false;
      }
    } catch (error) {
      q.notify({
        color: "negative",
        message: "An error occurred while checking if the car is in favorites",
        position: "bottom-right",
      });
    }
  }
}

function copyUrlToClipboard() {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => {
      q.notify({
        color: "green-5",
        message: "URL copied to clipboard",
        position: "bottom-right",
      });
    })
    .catch((err) => {
      console.log("Could not copy text: ", err);
    });
}

async function toggleFavorite() {
  if (!authStore.state.session) {
    // Redirect the user to the login page
    router.push("/login");
    return;
  }
  if (isFavorite.value) {
    // Remove from favorites
    try {
      const { data, error } = await supabase.from("favorites").delete().match({
        car_id: car.value.car_id,
        user_id: authStore.state.session.user.id,
      });

      if (error) throw error;

      q.notify({
        color: "green-5",
        message: "Car removed from favorites",
        position: "bottom-right",
      });
    } catch (error) {
      q.notify({
        color: "negative",
        message: "An error occurred while removing the car from favorites",
        position: "bottom-right",
      });
    }
  } else {
    // Add to favorites
    try {
      const { data, error } = await supabase.from("favorites").insert([
        {
          car_id: car.value.car_id,
          user_id: authStore.state.session.user.id,
        },
      ]);

      if (error) throw error;

      q.notify({
        color: "green-5",
        message: "Car added to favorites",
        position: "bottom-right",
      });
    } catch (error) {
      q.notify({
        color: "negative",
        message: "An error occurred while adding the car to favorites",
        position: "bottom-right",
      });
    }
  }
  await checkIfFavorite();
}
</script>

<style scoped>
.card {
  width: 80%;
  max-width: 450px;
}
</style>
