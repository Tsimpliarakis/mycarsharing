<template>
  <div class="account-page">
    <h1>Account Page</h1>
    <div class="avatar-section">
      <h2>Change Avatar</h2>
      <input type="file" @change="handleAvatarUpload" accept="image/*" />
      <img :src="avatarUrl" />
    </div>
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
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      // Perform avatar upload logic here
      // For example, you can use a library like Axios to send the file to the server
      // Once the upload is successful, update the avatarUrl with the new URL
      // this.avatarUrl = response.data.avatarUrl;
    },
  },
};
</script>

<style scoped>
.account-page {
  /* Add your styles here */
}

.avatar-section {
  /* Add your styles here */
}
</style>
