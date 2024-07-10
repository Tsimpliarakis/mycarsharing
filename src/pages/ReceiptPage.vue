<template>
  <div
    v-if="showReviewButton"
    class="flex flex-center column"
    style="margin-top: 40px"
  >
    <q-btn
      color="yellow"
      label="Go to Review"
      @click="goToReview"
      icon="star"
      style="margin-bottom: 20px"
    />
  </div>

  <q-page class="flex flex-center column q-pa-md">
    <div class="card">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Booking Receipt</div>
          <div class="text-caption">
            Booking ID: {{ route.params.booking_id }}
          </div>
          <div>{{ booking.created_at }}</div>
        </q-card-section>
        <q-separator />
        <div ref="receiptContent">
          <!-- Owner Details -->
          <q-card-section>
            <div class="text-bold">Owner Details</div>
            <div class="details">
              <div>First Name: {{ owner.first_name }}</div>
              <div>Last Name: {{ owner.last_name }}</div>
              <div>Email: {{ owner.email }}</div>
              <div>Phone: +30{{ owner.phone }}</div>
            </div>

            <!-- Renter Details -->
            <div class="text-bold">Renter Details</div>
            <div class="details">
              <div>First Name: {{ authStore.state.profile.first_name }}</div>
              <div>Last Name: {{ authStore.state.profile.last_name }}</div>
              <div>Email: {{ authStore.state.profile.email }}</div>
              <div>Phone: +30{{ authStore.state.profile.phone }}</div>
            </div>
          </q-card-section>
          <!-- Car Details -->
          <q-card-section>
            <div class="text-bold">Car Details</div>
            <div class="details">
              <div>Manufacturer: {{ car.manufacturer }}</div>
              <div>Model: {{ car.model }}</div>
              <div>Year: {{ car.year }}</div>
              <div>Engine: {{ car.engine }} cc</div>
              <div>Power: {{ car.power }} hp</div>
              <div>Mileage: {{ car.mileage }} km</div>
              <div>Fuel Type: {{ car.fuel_type }}</div>
              <div>Transmission Type: {{ car.transmission_type }}</div>
              <div>Color: {{ car.color }}</div>
              <div>Additional features:</div>
              <div
                v-for="(feature, index) in car.additional_features"
                :key="index"
                class="feature-item"
              >
                {{ feature }}
              </div>
            </div>
          </q-card-section>
          <!-- Pickup Instructions -->
          <q-card-section>
            <div class="text-bold">Pickup Instructions</div>
            <div class="details">{{ booking.pickup_instructions }}</div>
          </q-card-section>
          <!-- Booking Dates -->
          <q-card-section>
            <div class="text-bold">Booking Dates</div>
            <div class="details">
              <div>Start Date: {{ bookingDates.start }}</div>
              <div>End Date: {{ bookingDates.end }}</div>
            </div>
          </q-card-section>
          <!-- Location -->
          <q-card-section>
            <div class="text-bold">Location</div>
            <div class="details">{{ car.location }}</div>
          </q-card-section>
          <!-- Total Price -->
          <q-card-section>
            <div class="text-bold">Total Price</div>
            <div class="details">
              Total Price: {{ totalPrice }}€
              <div class="text-caption">
                ({{ car.price }}€ per day + {{ car.cleaning_fee }}€ cleaning
                fee)
              </div>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </q-page>
  <div class="flex flex-center column">
    <q-btn
      color="green"
      label="Receipt"
      @click="downloadReceipt"
      icon="download"
      style="margin-bottom: 40px; margin-top: 20px"
    />
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "src/lib/supabaseClient.js";
import { useQuasar } from "quasar";
import { authStore } from "src/stores/auth-store.js";
import html2pdf from "html2pdf.js";

const route = useRoute();
const router = useRouter();
const $q = useQuasar();
const showReviewButton = ref(false);
const currentDate = new Date();

const car = ref({});
const owner = ref({});
const bookingDates = ref({
  start: "",
  end: "",
});
const totalPrice = ref(0);
const booking = ref({});

onMounted(async () => {
  const { data: bookingData, error: bookingError } = await supabase
    .from("bookings")
    .select("*")
    .eq("booking_id", route.params.booking_id)
    .single();

  if (bookingError) {
    console.error("Error fetching booking details:", bookingError.message);
    return;
  }

  booking.value = bookingData;
  bookingDates.value.start = bookingData.start_date;
  bookingDates.value.end = bookingData.end_date;
  totalPrice.value = bookingData.total_cost;

  const { data: carData, error: carError } = await supabase
    .from("cars")
    .select("*")
    .eq("car_id", bookingData.car_id)
    .single();

  if (carError) {
    console.error("Error fetching car details:", carError.message);
    return;
  }

  car.value = carData;

  const { data: ownerData, error: ownerError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", carData.user_id)
    .single();

  if (ownerError) {
    console.error("Error fetching owner details:", ownerError.message);
    return;
  }

  owner.value = ownerData;

  if (new Date(bookingDates.value.end) < currentDate) {
    showReviewButton.value = true;
  }
});

function goToReview() {
  router.push("/review?id=" + booking.value.booking_id);
}

function downloadReceipt() {
  const element = document.querySelector(".card");
  html2pdf()
    .from(element)
    .set({
      margin: 1,
      filename: `booking_receipt_${new Date().toLocaleDateString()}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { orientation: "portrait" },
    })
    .save();
}
</script>

<style scoped>
.card {
  width: 80%;
  max-width: 1000px;
  min-width: 320px;
}

.details {
  margin: 10px;
}
</style>
