<!-- Profile Button -->
<template>
  <q-btn
    flat
    rounded
    color="green-5"
    @click="goToUserProfile"
    style="text-transform: none"
  >
    <q-avatar v-if="user.avatar_url" size="25px" class="avatar">
      <q-img :src="user.avatar_url" />
    </q-avatar>
    <span>{{ user.username }}</span>
  </q-btn>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps } from "vue";

const props = defineProps({
  user: Object,
});

const router = useRouter();

const goToUserProfile = () => {
  router.push(`/profile/${props.user.username}`);
};
</script>

<style scoped>
.avatar {
  margin-right: 10px; /* Adjust the value as needed */
}
</style>
