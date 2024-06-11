<template>
  <q-item class="q-mb-sm bg-green-1 booking">
    <q-item-section avatar side>
      <q-img
        :src="booking.car.image_url[0]"
        style="height: 100px; width: 120px"
        contain
      />
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-bold"
        >{{ booking.car.manufacturer }} {{ booking.car.model }}</q-item-label
      >
      <q-item-label caption lines="2"
        >Start Date: {{ booking.start_date }} | End Date:
        {{ booking.end_date }}</q-item-label
      >
      <q-item-label caption lines="1"
        >Booking ID: {{ booking.booking_id }}</q-item-label
      >
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "BookingThumbnail",
  props: {
    booking: Object,
  },
};
</script>

<style scoped>
.q-item {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15); /* Adds subtle shadow for depth */
  transition: transform 0.2s ease-in-out;
}

.q-item:hover {
  transform: scale(1.02); /* Enlarges the item on hover */
}

.q-item-section.avatar {
  min-width: 120px; /* Ensures avatar has enough space */
}

.booking {
  border-radius: 8px;
}

@media screen and (max-width: 500px) {
  .booking {
    width: 350px;
  }
}
</style>
