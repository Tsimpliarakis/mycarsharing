<template>
  <div class="q-pa-md">
    <q-card class="bg-green-2">
      <q-card-section horizontal>
        <q-img src="your_image_url" class="col-5" />
        <div class="col-7 q-ml-md">
          <div class="text-caption">Date: {{ review.date }}</div>
          <div class="text-caption">
            Accuracy Rating: {{ review.accuracy_rating }}/5
          </div>
          <div class="text-caption">
            Communication Rating: {{ review.communication_rating }}/5
          </div>
          <div class="text-caption">
            Cleanliness Rating: {{ review.cleanliness_rating }}/5
          </div>
          <div class="text-caption">
            Overall Rating: {{ displayStars(review.overall_rating) }}
          </div>
        </div>
      </q-card-section>
      <q-separator />
      <q-card-actions>
        <div class="text-caption">Comment: {{ review.comment }}</div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  review: Object,
});

const displayStars = (rating) => {
  const numberOfStars = Math.round(rating);
  return "⭐".repeat(numberOfStars);
};
</script>
