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
              :carImg="bookingCarMap[review.booking_id].image_url[0]"
              :carMan="bookingCarMap[review.booking_id].manufacturer"
              :carMod="bookingCarMap[review.booking_id].model"
              :username="bookingUserMap[review.booking_id].username"
              :avatarUrl="bookingUserMap[review.booking_id].avatar_url"
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

const bookingCarMap = {};
const bookingUserMap = {};
const route = useRoute();
const userError = ref("");
const loading = ref(false);
const reviews = ref([]);
const cars = ref([]);
const userId = ref("");

async function getReviews(userId) {
  try {
    const { data: cars, error: carsError } = await supabase
      .from("cars")
      .select("car_id, image_url, manufacturer, model")
      .eq("user_id", userId);

    if (carsError || !cars) throw new Error("Failed to fetch cars");

    const bookingIds = [];

    await Promise.all(
      cars.map(async (car) => {
        const { data: bookings, error: bookingsError } = await supabase
          .from("bookings")
          .select("booking_id, user_id")
          .eq("car_id", car.car_id);

        if (bookingsError || !bookings)
          throw new Error(`Failed to fetch bookings for car ${car.car_id}`);

        for (let booking of bookings) {
          bookingCarMap[booking.booking_id] = car;
          bookingIds.push(booking.booking_id);

          const { data: bookingUser, error: bookingUserError } = await supabase
            .from("profiles")
            .select("username, avatar_url")
            .eq("id", booking.user_id)
            .single();

          if (bookingUserError || !bookingUser)
            throw new Error(
              `Failed to fetch user for booking ${booking.booking_id}`
            );

          bookingUserMap[booking.booking_id] = bookingUser;
        }
      })
    );

    const { data: reviews, error: reviewsError } = await supabase
      .from("reviews")
      .select("*")
      .in("booking_id", bookingIds);

    if (reviewsError || !reviews) throw new Error("Failed to fetch reviews");

    return reviews;
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    userError.value = "User does not exist";
    return [];
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
