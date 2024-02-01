<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3 review-thumbnail">
    <q-card class="bg-green-2">
      <q-card-section horizontal>
        <q-img :src="carImg" no-native-menu>
          <q-icon
            class="absolute all-pointer-events"
            size="25px"
            name="info"
            color="green-1"
          >
            <q-tooltip> {{ carMan }} {{ carMod }} </q-tooltip>
          </q-icon>
        </q-img>
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
        <ProfileButton
          :user="{
            username: username,
            avatar_url: avatarUrl,
          }"
        />
        <div class="text-caption">: {{ review.comment }}</div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import ProfileButton from "./profile/ProfileButton.vue";

const props = defineProps({
  review: Object,
  carImg: String,
  carMan: String,
  carMod: String,
  username: String,
  avatarUrl: String,
});

const displayStars = (rating) => {
  const numberOfStars = Math.round(rating);
  return "⭐".repeat(numberOfStars);
};
</script>

<style scoped>
.review-thumbnail {
  margin: 10px;
}
</style>
