<template>
  <div class="documentsform">
    <br />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <br />
    <div class="input_field">
      <p style="text-align: left; font-weight: bold">
        Driver's license (Front side):
      </p>
      <q-file v-model="selectedFile" color="green-7" />
      <p style="font-size: 12px">Browse files</p>
    </div>
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />
    <br />
    <div class="input_field">
      <p style="text-align: left; font-weight: bold">
        Driver's license (Back side):
      </p>
      <q-file v-model="selectedFile" color="green-7" />
      <p style="font-size: 12px">Browse files</p>
    </div>
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />

    <br />
    <div class="input_field">
      <p style="text-align: left; font-weight: bold">
        Driver's license Number (Number 5):
      </p>
      <q-input color="green-7" type="text" placeholder="E.g. 123456789" />
    </div>
    <br />
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />
    <q-separator color="green-3" style="width: 110%; margin-left: -5%" />

    <br />
    <p style="text-align: left; font-weight: bold">
      Driver's license Expiration Date:
    </p>
    <q-date color="green" />
    <br />
    <br />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <q-separator color="green" style="width: 120%; margin-left: -10%" />
    <br />
    <q-btn
      @click="uploadAvatar"
      color="green-7"
      label="Upload"
      :loading="uploading"
    />
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
.documentsform {
  text-align: center;
}
</style>
