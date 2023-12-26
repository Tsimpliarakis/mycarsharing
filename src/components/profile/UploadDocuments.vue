<template>
  <div>
    Upload your Driver's License
    <q-input type="file" @change="uploadLicense" />
    <img v-if="licenseUrl" :src="licenseUrl" alt="User License" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      licenseUrl: null,
    };
  },
  methods: {
    uploadLicense() {
      // stuff
    },
  },
};
</script>

<style scoped>
/* Add your component styles here */
</style>
