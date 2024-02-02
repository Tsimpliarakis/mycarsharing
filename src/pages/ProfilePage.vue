<template>
  <q-page class="q-pa-md">
    <div v-if="loading" class="text-h4 text-center">Loading...</div>
    <div v-else>
      <div class="text-h4 text-center" v-if="userError">
        <div>
          {{ userError }}
        </div>
        <div>¯\_(ツ)_/¯</div>
      </div>
      <div v-else>
        <!-- User's name -->
        <div class="text-h4 text-center">{{ route.params.username }}</div>

        <div v-if="cars">
          <div class="text-h5">Cars</div>
          <div class="row">
            <CarThumbnail v-for="car in cars" :key="car.car_id" :car="car" />
          </div>
        </div>

        <div v-if="reviews.length > 0">
          <div class="text-h5">Reviews</div>
          <div class="row">
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
const loading = ref(false);
const reviews = ref([]);
const cars = ref([]);
const userId = ref("");

async function getReviews(userId) {
  const { data: reviews_data, error: review_error } = await supabase
    .from("reviews")
    .select("*")
    .eq("rated_user", userId);

  if (review_error || !reviews_data) {
    console.error("Failed to fetch reviews:", review_error);
    return [];
  } else {
    let processedReviews = [];

    for (let review of reviews_data) {
      const { data: booking_data, error: booking_error } = await supabase
        .from("bookings")
        .select("car_id, user_id")
        .eq("booking_id", review.booking_id)
        .single();

      if (booking_error || !booking_data) {
        console.error("Failed to fetch booking:", booking_error);
      } else {
        // Fetch the profile of the user who left the review
        const { data: profile_data, error: profile_error } = await supabase
          .from("profiles")
          .select("username, avatar_url")
          .eq("id", booking_data.user_id)
          .single();

        if (profile_error || !profile_data) {
          console.error("Failed to fetch profile:", profile_error);

          // Provide default values if the profile cannot be fetched
          const defaultProfile = {
            username: "Deleted User",
            avatar_url:
              "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/avatars/favicon.png",
          };

          const reviewObj = {
            ...review,
            ...defaultProfile,
            image_url: [
              "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/cars/generic.jpeg",
            ],
            manufacturer: "Unknown",
            model: "Unknown",
          };

          processedReviews.push(reviewObj);
        } else {
          const { data: car_data, error: car_error } = await supabase
            .from("cars")
            .select("image_url, manufacturer, model")
            .eq("car_id", booking_data.car_id)
            .single();

          if (car_error || !car_data) {
            console.error(
              "Failed to fetch car / Car has been deleted:",
              car_error
            );
            const reviewObj = {
              ...review,
              username: profile_data.username,
              avatar_url: profile_data.avatar_url,
              image_url: [
                "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/cars/generic.jpeg",
              ],
              manufacturer: "Unknown",
              model: "Unknown",
            };
            processedReviews.push(reviewObj);
          } else {
            const reviewObj = {
              ...review,
              username: profile_data.username,
              avatar_url: profile_data.avatar_url,
              image_url: car_data.image_url,
              manufacturer: car_data.manufacturer,
              model: car_data.model,
            };
            processedReviews.push(reviewObj);
          }
        }
      }
    }
    return processedReviews;
  }
}

async function getCars(userId) {
  const { data: cars, error } = await supabase
    .from("cars")
    .select("car_id, image_url, manufacturer, model")
    .eq("user_id", userId);

  if (error || !cars) {
    console.error("Failed to fetch cars:", error);
    return [];
  } else {
    return cars;
  }
}

async function getUserId(username) {
  try {
    const { data: user, error: userError } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", username)
      .single();

    if (userError || !user) throw new Error("Failed to fetch user");

    return user.id;
  } catch (error) {
    userError.value = "User does not exist";
    return "";
  }
}

watchEffect(() => {
  loading.value = true;
  const { username } = route.params;
  getUserId(username).then((newUserId) => {
    // Check if userId has changed before updating
    if (userId.value !== newUserId) {
      userId.value = newUserId;
      getReviews(userId.value).then((newReviews) => {
        reviews.value = newReviews;
      });
      getCars(userId.value).then((newCars) => {
        cars.value = newCars;
      });
    }
    loading.value = false;
  });
});
</script>
