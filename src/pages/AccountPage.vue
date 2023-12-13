<template>
  <q-page>
    <div class="flex-container">
      <div class="left-panel">
        <div class="q-pa-md">
          <q-avatar size="72px">
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
            <q-item>
              <q-item-section>Change Avatar</q-item-section>
            </q-item>
            <q-item>
              <q-item-section>Upload documents</q-item-section>
            </q-item>
            <q-item>
              <q-item-section style="color: crimson"
                >Delete Account</q-item-section
              >
            </q-item>
            <!-- Add more options as needed -->
          </div>
        </div>
      </div>

      <div class="right-panel flex flex-center justify-center">
        <div class="q-pa-md">
          <!-- Use dynamic component to show the selected component -->
          <!-- <component :is="selectedComponent"></component> -->
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { authStore } from "../stores/auth-store";

export default {
  setup() {
    return {
      authStore,
    };
  },
};
</script>
