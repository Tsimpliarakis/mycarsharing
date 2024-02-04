<template>
  <div>
    <h4>Welcome,</h4>
    <p>In this section you can:</p>
    <li>Update your profile's information</li>
    <li>Upload documents (e.g. driver's license)</li>
    <li>Or even delete your account*</li>
    <br />
    <br />
    <br />
    <q-img src="../../assets/carsharemedia.png" />
    <br />
    <br />
    <br />
    <div v-if="!authStore.state.profile.is_erified">
      Your account is not verified.
    </div>
    <div v-if="!authStore.state.profile.is_verified">
      Upload the neccessary documents to get verified.
    </div>
    <div v-if="authStore.state.profile.is_verified">
      Your account is verified.
    </div>
    <div v-if="authStore.state.profile.is_verified">
      Now you can share your car or order someone else's.
    </div>
    <br />
    <br />
    <p style="font-size: 12px">*well that doesn't work yet :)</p>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { authStore } from "../../stores/auth-store";

export default defineComponent({
  setup() {
    return {
      authStore,
    };
  },
});
</script>
