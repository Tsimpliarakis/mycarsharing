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

            <div class="text-bold">Renter Details</div>
            <div>First Name: {{ authStore.state.profile.first_name }}</div>
            <div>Last Name: {{ authStore.state.profile.last_name }}</div>
          </q-card-section>
          <!-- Car Details -->
          <q-card-section>
            <div class="text-bold">Car Details</div>
            <div>Manufacturer: {{ car.manufacturer }}</div>
            <div>Model: {{ car.model }}</div>
            <div>Year: {{ car.year }}</div>
          </q-card-section>

          <!-- Dates Details -->
          <q-card-section>
            <div class="text-bold">Dates</div>
            <div class="flex flex-center">
              <input
                type="date"
                v-model="bookingDates.start"
                @input="clearEndDate"
                :min="currentDate"
                :max="car.end_date"
              />
              <input
                type="date"
                v-model="bookingDates.end"
                @input="calculatePrice"
                :min="bookingDates.start"
                :max="car.end_date"
              />
            </div>

            <!-- Final Price -->
            <div class="text-bold">Final Price</div>
            <div>Total Price: {{ totalPrice }}€</div>

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
import { useRoute } from "vue-router";
import { supabase } from "src/lib/supabaseClient.js";
import { useQuasar } from "quasar";
import { authStore } from "src/stores/auth-store.js";

const route = useRoute();
const $q = useQuasar();

const car = ref({});
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
</style>
