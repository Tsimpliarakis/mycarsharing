<template>
  <q-page class="flex flex-center column q-pa-md">
    <div v-if="isLoading" class="text-h6">Loading...</div>
    <div v-else class="card">
      <!-- Car Images Carousel -->
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
                {{ car.year }} | {{ car.mileage }} km
              </div>
              <div class="text-caption text-center">Views: {{ car.views }}</div>
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
          <q-btn flat round color="green" icon="car_rental" @click="bookCar" />
          <q-btn
            v-if="car.user_id === authStore.state.profile.id"
            flat
            round
            color="yellow-8"
            icon="edit"
          />
        </q-card-actions>
        <q-card-actions align="center">
          <ProfileButton
            :user="{
              username: user.username,
              avatar_url: user.avatar_url,
              rating: user.rating,
            }"
          />
        </q-card-actions>
      </q-card>

      <!-- Car Details List -->
      <q-list flat bordered class="bg-white">
        <q-item>
          <q-item-section>Location</q-item-section>
          <q-item-section side>{{ car.location }}</q-item-section>
        </q-item>
        <q-separator color="green" inset />
        <q-item>
          <q-item-section>Price</q-item-section>
          <q-item-section side>{{ car.price }}€ / day</q-item-section>
        </q-item>
        <q-separator color="green" inset />
        <q-item>
          <q-item-section>Color</q-item-section>
          <q-item-section side>{{ car.color }}</q-item-section>
        </q-item>
        <q-separator color="green" inset />
        <q-item>
          <q-item-section>Fuel Type</q-item-section>
          <q-item-section side>{{ car.fuel_type }}</q-item-section>
        </q-item>
        <q-separator color="green" inset />
        <q-item>
          <q-item-section>Transmission Type</q-item-section>
          <q-item-section side>{{ car.transmission_type }}</q-item-section>
        </q-item>
        <q-separator color="green" inset />
        <q-item>
          <q-item-section>Mileage</q-item-section>
          <q-item-section side>{{ car.mileage }} km</q-item-section>
        </q-item>
        <q-separator color="green" inset />
        <q-item>
          <q-item-section>Engine</q-item-section>
          <q-item-section side>{{ car.engine }} cc</q-item-section>
        </q-item>
        <q-separator color="green" inset />
        <q-item>
          <q-item-section>Power</q-item-section>
          <q-item-section side>{{ car.power }} hp</q-item-section>
        </q-item>
        <q-separator color="green" inset />
        <q-item>
          <q-item-section>Additional Features</q-item-section>
          <q-item-section side class="additional-features">
            <div
              v-for="(feature, index) in car.additional_features"
              :key="index"
              class="feature-item"
            >
              {{ feature }}
            </div>
          </q-item-section>
        </q-item>
        <q-separator color="green" inset />
        <q-item class="flex flex-center column">
          <q-item-section>Description</q-item-section>
          <q-item-section side>{{ car.car_description }}</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "src/lib/supabaseClient.js";
import { useQuasar } from "quasar";
import { authStore } from "src/stores/auth-store.js";
import ProfileButton from "src/components/account/ProfileButton.vue";

const route = useRoute();
const router = useRouter();
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
    .select("username,avatar_url,rating")
    .eq("id", car.value.user_id)
    .single();
  if (error) throw error;
  user.value = data;

  await checkIfFavorite();

  // Increment view count after 10 seconds
  setTimeout(incrementViewCount, 10000);
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

async function incrementViewCount() {
  try {
    const { data, error } = await supabase
      .from("cars")
      .update({ views: car.value.views + 1 })
      .eq("car_id", route.query.id);

    if (error) throw error;
  } catch (error) {
    console.error("Error incrementing view count:", error.message);
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

function bookCar() {
  // Get the dateFrom and dateTo from the URL query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const dateFrom = queryParams.get("dateFrom");
  const dateTo = queryParams.get("dateTo");

  // Construct the URL with car ID and optional dateFrom and dateTo
  let bookingUrl = `/book?id=${car.value.car_id}`;
  if (dateFrom && dateTo) {
    bookingUrl += `&dateFrom=${dateFrom}&dateTo=${dateTo}`;
  }

  // Navigate to the booking page
  router.push(bookingUrl);
}
</script>

<style scoped>
.card {
  width: 80%;
  max-width: 450px;
}
</style>
