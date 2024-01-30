<template>
  <div class="review-thumbnail">
    <q-card class="bg-blue-1">
      <div class="row no-wrap">
        <div>
          <q-img :src="booking.review_image_url[0]" />
        </div>
        <div class="details">
          <q-card-section>
            <router-link
              :to="`/booking?id=${encodeURIComponent(booking.booking_id)}`"
              class="title"
            >
              <div class="text-h6">
                Review for Booking ID: {{ booking.booking_id }}
              </div>
            </router-link>
            <div><span class="label">Rating:</span> {{ booking.rating }}</div>
            <div><span class="label">Comment:</span> {{ booking.comment }}</div>
          </q-card-section>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
const props = defineProps({
  booking: Object,
});
</script>

<!-- Add your styles here -->
