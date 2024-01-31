<template>
  <q-page>
    <!-- User's reviews -->
    <div class="row">
      <div class="col-12">
        <div class="text-h5">Reviews</div>
        <div class="row">
          <div
            class="col-12 col-sm-6 col-md-4 col-lg-3"
            v-for="review in reviews"
            :key="review.booking_id"
          >
            <ReviewThumb :review="review" />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import ReviewThumb from "../components/ReviewThumb.vue";
import { ref, onMounted } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { authStore } from "src/stores/auth-store";

async function getReviews() {
  const { data: cars, error: carsError } = await supabase
    .from("cars")
    .select("car_id")
    .eq("user_id", authStore.state.session.user.id);

  if (carsError || !cars) throw new Error("Failed to fetch cars");

  const carIds = cars.map((car) => car.car_id);

  const { data: bookings, error: bookingsError } = await supabase
    .from("bookings")
    .select("booking_id")
    .in("car_id", carIds);

  if (bookingsError || !bookings) throw new Error("Failed to fetch bookings");

  const bookingIds = bookings.map((booking) => booking.booking_id);

  const { data: reviews, error: reviewsError } = await supabase
    .from("reviews")
    .select("*")
    .in("booking_id", bookingIds);

  if (reviewsError || !reviews) throw new Error("Failed to fetch reviews");

  return reviews;
}

const reviews = ref([]);

onMounted(async () => {
  try {
    reviews.value = await getReviews();
  } catch (error) {
    console.error("Failed to fetch reviews:", error);
  }
});
</script>
