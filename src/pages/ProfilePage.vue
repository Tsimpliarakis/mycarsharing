<template>
  <q-page class="q-pa-md">
    <div class="text-h4 text-center" v-if="userError">
      <div>
        {{ userError }}
      </div>
      <div>¯\_(ツ)_/¯</div>
    </div>
    <div v-else>
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
  </q-page>
</template>

<script setup>
import { useRoute } from "vue-router";
import ReviewThumb from "../components/ReviewThumb.vue";
import { ref, onMounted } from "vue";
import { supabase } from "src/lib/supabaseClient";

const bookingCarMap = {};
const bookingUserMap = {};
const route = useRoute();
const { username } = route.params;
const userError = ref(""); // Add this line

async function getReviews() {
  const { data: user, error: userError } = await supabase
    .from("profiles")
    .select("id")
    .eq("username", username)
    .single();

  if (userError || !user) throw new Error("Failed to fetch user");

  const { data: cars, error: carsError } = await supabase
    .from("cars")
    .select("car_id, image_url, manufacturer, model")
    .eq("user_id", user.id);

  if (carsError || !cars) throw new Error("Failed to fetch cars");

  for (let car of cars) {
    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select("booking_id, user_id")
      .eq("car_id", car.car_id);

    if (bookingsError || !bookings)
      throw new Error(`Failed to fetch bookings for car ${car.car_id}`);

    for (let booking of bookings) {
      bookingCarMap[booking.booking_id] = car;

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
  }

  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("*")
    .in("booking_id", Object.keys(bookingCarMap));

  if (reviewsError || !reviews) throw new Error("Failed to fetch reviews");

  return reviews;
}

const reviews = ref([]);

onMounted(async () => {
  try {
    reviews.value = await getReviews();
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
    userError.value = "User does not exist"; // Set userError here
  }
});
</script>
