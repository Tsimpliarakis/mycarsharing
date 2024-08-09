<template>
  <q-page class="q-pa-md flex flex-center column">
    <div v-if="loadingProfile" class="text-h4 text-center">Loading...</div>
    <div v-else class="profilepage">
      <div class="text-h4 text-center" v-if="userError">
        <div>{{ userError }}</div>
        <div>¯\_(ツ)_/¯</div>
      </div>
      <div v-else>
        <!-- User's info -->
        <div class="q-mb-md flex flex-center column" v-if="user">
          <q-avatar size="100px">
            <q-img :src="user.avatar_url" />
          </q-avatar>
          <div class="text-subtitle2 full_name">
            {{ user.first_name }} {{ user.last_name }}
          </div>
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
                :rating="review.rating"
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

// References for data and loading states
const route = useRoute();
const userError = ref("");
const loadingProfile = ref(false);
const reviews = ref([]);
const cars = ref([]);
const user = ref(null);

// Utility function to handle errors
function handleError(errorMessage) {
  userError.value = errorMessage;
  loadingProfile.value = false;
}

// Fetch user data
async function fetchUser(username) {
  const { data: userData, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !userData) {
    throw new Error("Failed to fetch user data");
  }

  return userData;
}

// Fetch cars data
async function fetchCars(userId) {
  const { data: carData, error } = await supabase
    .from("cars")
    .select(
      "car_id, image_url, manufacturer, model, year, mileage, price, transmission_type, fuel_type"
    )
    .eq("user_id", userId);

  if (error || !carData) {
    throw new Error("Failed to fetch car data");
  }

  return carData;
}

// Fetch reviews data
async function fetchReviews(userId) {
  const { data: reviewData, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("rated_user", userId);

  if (error || !reviewData) {
    throw new Error("Failed to fetch review data");
  }

  return reviewData;
}

// Fetch booking data
async function fetchBooking(bookingId) {
  const { data, error } = await supabase
    .from("bookings")
    .select("car_id, user_id")
    .eq("booking_id", bookingId)
    .single();

  if (error || !data) {
    throw new Error("Failed to fetch booking data");
  }

  return data;
}

// Fetch user profile
async function fetchUserProfile(username) {
  try {
    loadingProfile.value = true;
    userError.value = "";

    // Fetch user data
    const userData = await fetchUser(username);
    user.value = userData;
    const userId = userData.id;

    // Fetch cars and reviews data concurrently
    const [carData, reviewData] = await Promise.all([
      fetchCars(userId),
      fetchReviews(userId),
    ]);

    cars.value = carData;

    // Process reviews data
    const processedReviews = await Promise.all(
      reviewData.map(async (review) => {
        try {
          const bookingData = await fetchBooking(review.booking_id);
          const [profileData, carData] = await Promise.all([
            supabase
              .from("profiles")
              .select("username, avatar_url, rating")
              .eq("id", review.rating_user)
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
            rating: 0,
          };

          return {
            ...review,
            username: profileData?.data?.username || defaultProfile.username,
            avatar_url:
              profileData?.data?.avatar_url || defaultProfile.avatar_url,
            rating: profileData?.data?.rating || defaultProfile.rating,
            image_url: carData?.data?.image_url || [
              "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/cars/generic.jpeg",
            ],
            manufacturer: carData?.data?.manufacturer || "Unknown",
            model: carData?.data?.model || "Unknown",
          };
        } catch (err) {
          console.error("Failed to process review:", err);
          return null; // Return null if there's an error processing a review
        }
      })
    );

    reviews.value = processedReviews.filter((review) => review !== null); // Filter out any null reviews
    loadingProfile.value = false;
  } catch (error) {
    handleError("User does not exist");
  }
}

// Watch route changes to fetch data
watchEffect(() => {
  fetchUserProfile(route.params.username);
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

.full_name {
  margin-top: 10px;
  margin-bottom: 3px;
}
</style>
