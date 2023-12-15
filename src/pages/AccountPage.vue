<template>
  <q-page>
    <div class="flex">
      <div class="left-panel text-center">
        <div class="q-pa-md">
          <q-avatar size="80px">
            <img :src="authStore.state.profile.avatar" />
          </q-avatar>
          <div class="text-subtitle2 q-mt-md q-mb-xs">
            {{ authStore.state.profile.userName }}
          </div>
          <div class="text-subtitle1 q-mt-md q-mb-xs">
            {{ authStore.state.profile.fullName }}
          </div>

          <!-- Add options for the user -->
          <div class="q-mt-md">
            <q-separator />
            <q-item>
              <q-item-section>Change Avatar</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Upload documents</q-item-section>
            </q-item>
            <q-separator />
            <q-item>
              <q-item-section style="color: crimson"
                >Delete Account</q-item-section
              >
            </q-item>
          </div>
        </div>
      </div>

      <q-separator vertical inset />

      <div class="right-panel">
        <div class="q-pa-md flex flex-center">
          <LoginForm />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { authStore } from "../stores/auth-store";
import LoginForm from "../components/auth/LoginForm.vue";

export default {
  components: {
    LoginForm,
  },
  setup() {
    return {
      authStore,
    };
  },
};
</script>

<style scoped>
.right-panel {
  flex: 1;
}
</style>
