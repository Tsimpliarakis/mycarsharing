<template>
  <q-page class="flex flex-center column q-pa-md">
    <div class="card">
      <q-card flat bordered>
        <q-card-section>
          <div class="text-h6">Booking Details</div>
        </q-card-section>
        <q-separator />
        <div class="row justify-center">
          <!-- Users Details -->
          <q-card-section>
            <div class="text-bold">Owner Details</div>
            <div class="details">
              <div>First Name: {{ owner.first_name }}</div>
              <div>Last Name: {{ owner.last_name }}</div>
              <div>Email: {{ owner.email }}</div>
              <div>Phone: +30{{ owner.phone }}</div>
            </div>

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
              <div>Additional Features: {{ car.additional_features }}</div>
            </div>
          </q-card-section>

          <!-- Dates Details -->
          <q-card-section>
            <div class="text-bold">Dates</div>
            <div class="flex flex-center">
              <input
                type="date"
                class="details"
                v-model="bookingDates.start"
                @input="clearEndDate"
                :min="currentDate || car.start_date"
                :max="car.end_date"
              />
              <input
                type="date"
                class="details"
                v-model="bookingDates.end"
                @input="calculatePrice"
                :min="bookingDates.start || currentDate || car.start_date"
                :max="car.end_date"
              />
            </div>

            <!-- Location -->

            <div class="text-bold">Location</div>
            <div class="details">{{ car.location }}</div>

            <!-- Final Price -->
            <div class="text-bold">Final Price</div>
            <div class="details">
              Total Price: {{ totalPrice }}€
              <div class="text-caption">
                ({{ car.price }}€ per day + {{ car.cleaning_fee }}€ cleanning
                fee)
              </div>
            </div>

            <q-separator />
            <q-card-section>
              <q-card-actions align="center">
                <q-btn
                  color="green"
                  label="Pay with PayPal"
                  @click="payWithPayPal"
                />
                <q-btn
                  color="blue"
                  label="Pay with Card"
                  @click="payWithCard"
                />
              </q-card-actions>
            </q-card-section>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { supabase } from "src/lib/supabaseClient.js";
import { useQuasar } from "quasar";
import { authStore } from "src/stores/auth-store.js";

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const car = ref({});
const owner = ref({});
const bookingDates = ref({
  start: "",
  end: "",
});

const currentDate = new Date().toISOString().split("T")[0]; // Get current date in yyyy-mm-dd format

onMounted(async () => {
  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("car_id", route.query.id)
    .single();

  if (error) {
    console.error("Error fetching car details:", error.message);
    return;
  }

  car.value = data;

  // fetch owner details from car.user_id
  const { data: ownerData, error: ownerError } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", car.value.user_id)
    .single();

  if (ownerError) {
    console.error("Error fetching owner details:", ownerError.message);
    return;
  }

  owner.value = ownerData;

  // Check if dateFrom and dateTo are present in the URL query parameters
  if (route.query.dateFrom && route.query.dateTo) {
    // check if the dates from the url are valid
    if (
      route.query.dateFrom >= currentDate &&
      route.query.dateFrom >= car.value.start_date &&
      route.query.dateTo >= route.query.dateFrom &&
      route.query.dateTo <= car.value.end_date
    ) {
      // Assign dateFrom and dateTo to bookingDates
      bookingDates.value.start = route.query.dateFrom;
      bookingDates.value.end = route.query.dateTo;
      calculatePrice(); // Calculate the price based on the provided dates
    } else {
      $q.notify({
        color: "negative",
        message: "Invalid dates provided in the URL.",
        position: "top",
        icon: "report_problem",
      });
      // clear the url from the dates
      router.replace({
        query: { ...route.query, dateFrom: null, dateTo: null },
      });
    }
  }
});

const totalPrice = ref(0);

function calculatePrice() {
  if (!bookingDates.value.start || !bookingDates.value.end) {
    return;
  }

  const startDate = new Date(bookingDates.value.start);
  const endDate = new Date(bookingDates.value.end);
  const numDays = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;

  const dailyPrice = parseFloat(car.value.price);
  const cleaningFee = parseFloat(car.value.cleaning_fee);

  const totalPriceWithoutCleaningFee = dailyPrice * numDays;
  const totalPriceWithCleaningFee = totalPriceWithoutCleaningFee + cleaningFee;

  totalPrice.value = totalPriceWithCleaningFee.toFixed(2); // Rounded to two decimal places
}

function payWithPayPal() {
  // Implement PayPal payment logic here
}

function payWithCard() {
  // Implement card payment logic here
}

function clearEndDate() {
  bookingDates.value.end = ""; // Clear the end date input
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
