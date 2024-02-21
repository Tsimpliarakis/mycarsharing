<template>
  <q-page class="q-pa-md flex flex-center column">
    <div v-if="loadingProfile" class="text-h4 text-center">Loading...</div>
    <div v-else class="profilepage">
      <div class="text-h4 text-center" v-if="userError">
        <div>
          {{ userError }}
        </div>
        <div>¯\_(ツ)_/¯</div>
      </div>
      <div v-else>
        <!-- User's info -->
        <div class="q-mb-md flex flex-center column" v-if="user">
          <q-avatar size="100px">
            <q-img :src="user.avatar_url" />
          </q-avatar>
          <div class="text-subtitle2">{{ user.full_name }}</div>
          <div class="text-caption">{{ user.description }}</div>
        </div>

        <div v-if="cars.length">
          <div class="text-h5">Cars</div>
          <q-scroll-area style="height: 286px">
            <div class="row no-wrap">
              <CarThumbnail v-for="car in cars" :key="car.car_id" :car="car" />
            </div>
          </q-scroll-area>
        </div>

        <div v-if="reviews.length">
          <div class="text-h5">Reviews</div>
          <q-scroll-area style="height: 173px">
            <div class="row no-wrap">
              <ReviewThumb
                v-for="review in reviews"
                :key="review.booking_id"
                :review="review"
                :carImg="review.image_url[0]"
                :carMan="review.manufacturer"
                :carMod="review.model"
                :username="review.username"
                :avatarUrl="review.avatar_url"
              />
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useRoute } from "vue-router";
import ReviewThumb from "../components/ReviewThumb.vue";
import CarThumbnail from "src/components/car/CarThumbnail.vue";
import { ref, watchEffect } from "vue";
import { supabase } from "src/lib/supabaseClient";

const route = useRoute();
const userError = ref("");
const loadingProfile = ref(false);
const reviews = ref([]);
const cars = ref([]);
const user = ref(null);

async function fetchData(username) {
  try {
    loadingProfile.value = true;
    userError.value = "";
    const { data: userData, error: usrError } = await supabase
      .from("profiles")
      .select("*")
      .eq("username", username)
      .single();

    user.value = userData;
    const userId = userData.id;

    loadingProfile.value = false;

    const { data: carData, error: carError } = await supabase
      .from("cars")
      .select("car_id, image_url, manufacturer, model")
      .eq("user_id", userId);

    if (carError || !carData) {
      throw new Error("Failed to fetch car data");
    }

    cars.value = carData;

    const { data: reviewData, error: reviewError } = await supabase
      .from("reviews")
      .select("*")
      .eq("rated_user", userId);

    if (reviewError || !reviewData) {
      throw new Error("Failed to fetch review data");
    }

    const processedReviews = [];

    for (const review of reviewData) {
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .select("car_id, user_id")
        .eq("booking_id", review.booking_id)
        .single();

      if (bookingError || !bookingData) {
        console.error("Failed to fetch booking:", bookingError);
        continue;
      }

      const [profileData, carData] = await Promise.all([
        supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", bookingData.user_id)
          .single(),
        supabase
          .from("cars")
          .select("image_url, manufacturer, model")
          .eq("car_id", bookingData.car_id)
          .single(),
      ]);

      const defaultProfile = {
        username: "Deleted User",
        avatar_url:
          "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/avatars/favicon.png",
      };

      const reviewObj = {
        ...review,
        username: profileData?.data?.username || defaultProfile.username,
        avatar_url: profileData?.data?.avatar_url || defaultProfile.avatar_url,
        image_url: carData?.data?.image_url || [
          "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/cars/generic.jpeg",
        ],
        manufacturer: carData?.data?.manufacturer || "Unknown",
        model: carData?.data?.model || "Unknown",
      };

      processedReviews.push(reviewObj);
    }

    reviews.value = processedReviews;
  } catch (error) {
    userError.value = "User does not exist";
  }
}

watchEffect(() => {
  fetchData(route.params.username);
});
</script>

<style scoped>
.profilepage {
  max-width: 1000px;
  width: 100%;
}

.q-scrollarea:deep(.q-scrollarea__thumb) {
  display: none;
}
</style>
