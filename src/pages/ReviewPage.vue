<template>
  <q-page class="q-pa-md">
    <div v-if="isLoading" class="flex flex-center">
      <q-spinner color="green" size="3em" />
    </div>
    <div v-else class="flex flex-center column">
      <q-card flat bordered class="review-card">
        <q-card-section>
          <q-card-section>
            <div class="text-h6">Leave a Review</div>
            <div class="text-caption">Booking ID: {{ review.booking_id }}</div>
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div class="text-bold">
              Rate the {{ isOwner ? "Renter" : "Owner" }}
            </div>
            <q-rating v-model="review.overall_rating" color="yellow" />
          </q-card-section>
          <q-card-section>
            <div class="text-bold">Rate the Experience</div>
            <div>Accuracy</div>
            <q-rating
              v-model="review.accuracy_rating"
              color="yellow"
              label="Accuracy"
            />
            <div>Communication</div>
            <q-rating
              v-model="review.communication_rating"
              color="yellow"
              label="Communication"
            />
            <div>Cleanliness</div>
            <q-rating
              v-model="review.cleanliness_rating"
              color="yellow"
              label="Cleanliness"
            />
          </q-card-section>
          <q-card-section>
            <q-input
              v-model="review.comment"
              type="textarea"
              label="Comments"
              outlined
              maxlength="500"
              counter
              color="green"
            />
          </q-card-section>
          <q-card-section class="flex flex-center">
            <q-btn color="green" label="Submit Review" @click="submitReview" />
          </q-card-section>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "src/lib/supabaseClient.js";
import { authStore } from "src/stores/auth-store.js";
import { useQuasar } from "quasar";

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const isLoading = ref(true);
const currentUser = authStore.state.profile;
const isOwner = ref(false);
const review = ref({
  accuracy_rating: 0,
  communication_rating: 0,
  cleanliness_rating: 0,
  overall_rating: 0,
  comment: "",
  date: new Date().toISOString().split("T")[0],
  booking_id: route.params.booking_id,
  rated_user: "",
  owner: false,
  rating_user: authStore.state.session.user.id,
});

onMounted(async () => {
  try {
    const { data: bookingData, error: bookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("booking_id", route.params.booking_id)
      .single();

    if (bookingError) {
      throw bookingError;
    }

    const { data: carData, error: carError } = await supabase
      .from("cars")
      .select("*")
      .eq("car_id", bookingData.car_id)
      .single();

    if (carError) {
      throw carError;
    }

    const { data: ownerData, error: ownerError } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", carData.user_id)
      .single();

    if (ownerError) {
      throw ownerError;
    }

    if (currentUser.id === ownerData.id) {
      isOwner.value = true;
      review.value.rated_user = bookingData.user_id;
      review.value.owner = true;
    } else {
      review.value.rated_user = ownerData.id;
      review.value.owner = false;
    }

    const { data: existingReview, error: existingReviewError } = await supabase
      .from("reviews")
      .select("*")
      .eq("booking_id", route.params.booking_id)
      .eq("owner", isOwner.value)
      .single();

    if (existingReviewError && existingReviewError.code !== "PGRST116") {
      throw existingReviewError;
    }

    if (existingReview) {
      $q.notify({
        type: "warning",
        message: "You have already left a review for this booking",
        position: "top",
      });
      router.push("/");
      return;
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    $q.notify({
      type: "negative",
      message: "Error loading data",
      position: "top",
    });
  } finally {
    isLoading.value = false;
  }
});

async function submitReview() {
  const { error } = await supabase.from("reviews").insert([review.value]);

  if (error) {
    console.error("Error submitting review:", error.message);
    $q.notify({
      type: "negative",
      message: "Error submitting review",
      position: "top",
    });
    return;
  }

  $q.notify({
    type: "positive",
    message: "Review submitted successfully",
    position: "top",
  });

  router.push("/");
}
</script>

<style scoped>
.review-card {
  width: 80%;
  max-width: 600px;
  min-width: 320px;
}

.text-bold {
  font-weight: bold;
}
</style>
