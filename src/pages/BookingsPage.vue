<template>
  <q-page class="q-pa-md">
    <div class="row justify-center">
      <div class="userbookings">
        <div class="text-h4 text-center tittle">Your Bookings</div>
        <div class="flex flex-center" v-if="loading">Loading...</div>
        <div v-else>
          <div class="flex flex-center" v-if="userBookings.length === 0">
            No bookings found.
          </div>
          <div class="flex flex-center" v-else>
            <div class="bookings">
              <q-list padding>
                <BookingThumbnail
                  v-for="booking in userBookings"
                  :key="booking.id"
                  :booking="booking"
                />
              </q-list>
            </div>
          </div>
        </div>
      </div>
      <q-separator vertical inset v-show="screenWidth > 1027" />
      <!-- Display bookings received by the user -->
      <div class="recievedbookings">
        <div class="text-h4 text-center tittle">Bookings Received</div>
        <div class="flex flex-center" v-if="loading">Loading...</div>
        <div v-else>
          <div class="flex flex-center" v-if="receivedBookings.length === 0">
            No bookings found.
          </div>
          <div class="flex flex-center" v-else>
            <div class="bookings">
              <q-list padding>
                <BookingThumbnail
                  v-for="booking in receivedBookings"
                  :key="booking.id"
                  :booking="booking"
                />
              </q-list>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { authStore } from "src/stores/auth-store";
import BookingThumbnail from "src/components/BookingThumb.vue";

const userBookings = ref([]);
const receivedBookings = ref([]);
const loading = ref(true);
const screenWidth = ref(window.innerWidth);

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

onMounted(async () => {
  window.addEventListener("resize", updateScreenWidth);

  // Fetch bookings made by the user
  try {
    const { data: userBookingData, error: userBookingError } = await supabase
      .from("bookings")
      .select("*")
      .eq("user_id", authStore.state.session.user.id);

    if (userBookingError) {
      console.error("Error fetching user bookings:", userBookingError);
    } else {
      userBookings.value = userBookingData;

      // Fetch car details for each user booking
      for (let booking of userBookings.value) {
        const { data: carData, error: carError } = await supabase
          .from("cars")
          .select("image_url, user_id, manufacturer, model")
          .eq("car_id", booking.car_id)
          .single();

        if (carError) {
          console.error(`Error fetching car for user booking:`, carError);
          booking.car = {
            image_url: [
              "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/cars/generic.jpeg",
            ],
            manufacturer: "Unknown",
            model: "Unknown",
          };
        } else {
          // Add car details to booking object
          booking.car = carData;
        }
      }
    }
  } catch (error) {
    console.error("Error fetching user bookings:", error.message);
  }

  // Fetch bookings received by the user
  try {
    const { data: receivedBookingData, error: receivedBookingError } =
      await supabase
        .from("bookings")
        .select("*")
        .eq("owner_id", authStore.state.session.user.id);

    if (receivedBookingError) {
      console.error("Error fetching received bookings:", receivedBookingError);
    } else {
      receivedBookings.value = receivedBookingData;

      // Fetch car details for each received booking
      for (let booking of receivedBookings.value) {
        const { data: carData, error: carError } = await supabase
          .from("cars")
          .select("image_url, user_id, manufacturer, model")
          .eq("car_id", booking.car_id)
          .single();

        if (carError) {
          console.error(`Error fetching car for received booking:`, carError);
          booking.car = {
            image_url: [
              "https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/cars/generic.jpeg",
            ],
            manufacturer: "Unknown",
            model: "Unknown",
          };
        } else {
          // Add car details to booking object
          booking.car = carData;
        }
      }
    }
  } catch (error) {
    console.error("Error fetching received bookings:", error.message);
  } finally {
    loading.value = false;
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateScreenWidth);
});
</script>

<style scoped>
.tittle {
  margin-top: 20px;
  margin-bottom: 30px;
}

.userbookings {
  margin: 10px;
}

.recievedbookings {
  margin: 10px;
}
</style>
