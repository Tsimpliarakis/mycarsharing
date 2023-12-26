<template>
  <div>
    <q-input type="file" @change="uploadAvatar" />
    <img v-if="avatarUrl" :src="avatarUrl" alt="User Avatar" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatarUrl: null,
    };
  },
  methods: {
    uploadAvatar() {
      // stuff
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
