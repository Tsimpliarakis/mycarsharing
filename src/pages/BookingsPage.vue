<template>
  <q-page class="q-pa-md">
    <div>
      <div class="text-h4 text-center tittle">Your Bookings</div>
      <div v-if="loading">Loading...</div>
      <div v-else>
        <div v-if="bookings.length === 0">No bookings found.</div>
        <div class="flex flex-center" v-else>
          <div class="bookings">
            <q-list bordered padding class="rounded-borders">
              <q-item
                v-for="booking in bookings"
                :key="booking.id"
                class="q-mb-sm"
              >
                <q-item-section avatar>
                  <q-img
                    :src="booking.car.image_url[0]"
                    style="height: 100px; width: 160px"
                  />
                </q-item-section>
                <q-item-section>
                  <q-item-label class="text-bold"
                    >{{ booking.car.manufacturer }}
                    {{ booking.car.model }}</q-item-label
                  >
                  <q-item-label caption lines="2">
                    Start Date: {{ booking.start_date }} | End Date:
                    {{ booking.end_date }}
                  </q-item-label>
                  <q-item-label caption lines="1"
                    >Booking ID: {{ booking.booking_id }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { authStore } from "src/stores/auth-store";

const bookings = ref([]);
const loading = ref(true);

onMounted(async () => {
  // Fetch bookings when the component is created
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", authStore.state.session.user.id);

    if (error) {
      console.error("Error fetching bookings:", error);
    } else {
      bookings.value = data;

      // Fetch car details for each booking
      for (let booking of bookings.value) {
        const { data: carData, error: carError } = await supabase
          .from("cars")
          .select("image_url, user_id, manufacturer, model")
          .eq("car_id", booking.car_id)
          .single();

        if (carError) {
          console.error(`Error fetching car / Car was deleted:`, carError);
          booking.car = {
            image_url: [
              "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/cars/generic.jpeg",
            ],
            manufacturer: "Unknown",
            model: "Unknown",
          };
        } else {
          // Add car details to booking object
          booking.car = carData[0];
        }
      }
    }
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.bookings {
  width: 100%;
  max-width: 800px;
  margin-left: 10%;
  margin-right: 10%;
}

.tittle {
  margin-top: 20px;
  margin-bottom: 30px;
}

/* @media screen and (max-width: 500px) {
  .bookings {
    max-width: 300px;
    margin-left: 5%;
    margin-right: 5%;
  }
} */
</style>
