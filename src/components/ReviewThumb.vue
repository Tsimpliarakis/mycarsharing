<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3 review-thumbnail">
    <q-card class="bg-green-2">
      <q-card-section horizontal>
        <q-img :src="carImg" no-native-menu :style="{ height: '100px' }">
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
        <div
          class="text-caption"
          v-if="showReadMore && review.comment.length > maxLength"
        >
          {{ truncatedComment }}
          <q-btn
            @click="toggleReadMore"
            color="green"
            label="Read More"
            flat
            dense
          />
        </div>
        <div class="text-caption" v-else>
          {{ review.comment }}
          <q-btn
            v-if="review.comment.length > maxLength"
            @click="toggleReadMore"
            color="green"
            label="Read Less"
            flat
            dense
          />
        </div>
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup>
import ProfileButton from "./account/ProfileButton.vue";
import { ref, defineProps } from "vue";

const props = defineProps({
  review: Object,
  carImg: String,
  carMan: String,
  carMod: String,
  username: String,
  avatarUrl: String,
});

const showReadMore = ref(true); // Set to true for "Read More" as default state
const truncatedComment = ref("");

const toggleReadMore = () => {
  showReadMore.value = !showReadMore.value;
};

const displayStars = (rating) => {
  const numberOfStars = Math.round(rating);
  return "⭐".repeat(numberOfStars);
};

const maxLength = 20;
const updateTruncatedComment = (review) => {
  truncatedComment.value =
    review.comment.length > maxLength
      ? review.comment.slice(0, maxLength) + "..."
      : review.comment;
};

updateTruncatedComment(props.review); // Initial call to set truncated comment
</script>

<style scoped>
.review-thumbnail {
  margin: 10px;
}
</style>
