<template>
  <div>
    <h4>Welcome,</h4>
    <p>In this section you can:</p>
    <li>Change your avatar</li>
    <li>Update your profile's information</li>
    <li>Upload documents (e.g. driver's license)</li>
    <li>Change your password</li>
    <li>Or even delete your account</li>
    <br />
    <br />
    <br />
    <q-img src="../../assets/carsharemedia.png" />
    <br />
    <br />
    <br />
    <div class="text-italic text-caption">
      <div v-if="!authStore.state.profile.is_verified">
        Your account is not verified.
      </div>
      <div v-if="!authStore.state.profile.is_verified">
        Upload the neccessary documents to get verified.
      </div>
      <div v-if="authStore.state.profile.is_verified">
        Your account is verified.
      </div>
      <div v-if="authStore.state.profile.is_verified">
        Now you can share your car or rent someone else's.
      </div>
    </div>
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
