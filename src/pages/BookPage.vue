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
              <q-date
                v-model="bookingDates"
                mask="YYYY-MM-DD"
                today-btn
                color="green-5"
                range
                minimal
                @input="calculatePrice"
                :rules="[
                  (val) => (val && val.from && val.to) || 'Field is required',
                ]"
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

// get car details from the route
const car = ref({});

onMounted(async () => {
  // Fetch car details from the database
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
  // Perform price calculation logic here based on booking dates and car details
  // This is a placeholder, replace it with your actual calculation logic
  totalPrice.value = 100; // Placeholder price
}

function payWithPayPal() {
  // Implement PayPal payment logic here
  // Redirect the user to PayPal for payment processing
}

function payWithCard() {
  // Implement card payment logic here
  // You can use a payment processing library or integrate with a payment gateway
}
</script>

<style scoped>
.card {
  width: 80%;
  max-width: 1000px;
  min-width: 320px;
}
</style>
