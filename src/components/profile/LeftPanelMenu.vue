<template>
  <div class="left-panel text-center">
    <div class="q-pa-md">
      <q-avatar size="100px">
        <img :src="authStore.state.profile.avatar" />
      </q-avatar>
      <div style="margin-top: 5px; margin-bottom: -10px">
        <ProfileButton
          :user="{
            username: authStore.state.profile.userName,
            avatar_url: null,
          }"
        />
      </div>
      <div class="text-subtitle1 q-mt-md q-mb-xs">
        {{ authStore.state.profile.fullName }}
      </div>

      <!-- Add options for the user -->
      <div class="q-mt-md">
        <q-separator />
        <q-item>
          <q-item-section
            ><q-btn flat rounded @click="togglePanel('ChangeAvatar')"
              >Change Avatar</q-btn
            ></q-item-section
          >
        </q-item>
        <q-item>
          <q-item-section
            ><q-btn flat rounded @click="togglePanel('ProfileInfo')"
              >Profile Information</q-btn
            ></q-item-section
          >
        </q-item>
        <q-item v-if="!authStore.state.profile.isVerified">
          <q-item-section
            ><q-btn flat @click="togglePanel('UploadDocuments')"
              >Upload documents</q-btn
            ></q-item-section
          >
        </q-item>
        <q-separator />
        <q-item>
          <q-item-section
            ><q-btn
              flat
              rounded
              color="red-7"
              label="Delete Account"
              @click="confirmDialog = true"
          /></q-item-section>
          <q-dialog v-model="confirmDialog" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar icon="warning" color="red-7" text-color="white" />
                <div class="column q-ml-sm">
                  <span
                    >Are you sure you want to permanently delete your account? </span
                  ><span> This action cannot be undone.</span>
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  label="Cancel"
                  rounded
                  color="green-8"
                  v-close-popup
                />
                <q-btn
                  flat
                  rounded
                  label="Delete my account"
                  color="red-7"
                  @click="deleteUserAccount"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
        </q-item>
      </div>
    </div>
  </div>
</template>

<script setup>
import { authStore } from "../../stores/auth-store";
import ProfileButton from "./ProfileButton.vue";
import { ref } from "vue";
import axios from "axios";

const { togglePanel: parentTogglePanel } = defineProps(["togglePanel"]);

const togglePanel = (panelName) => {
  parentTogglePanel(panelName);
};

// Define deleteUserAccount as a ref
const deleteUserAccount = async () => {
  const url =
    "https://igohglatbbhgyelsipze.supabase.co/functions/v1/delete-user-account";
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnb2hnbGF0YmJoZ3llbHNpcHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNTI5NzMsImV4cCI6MjAxNDkyODk3M30.0kAm5Z0owBVjy1kzzbbFsAgeGdQVIH7oUHobIi4lQag";

  const requestData = {
    name: "kalhspera",
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.post(url, requestData, config);
    console.log("Response:", response.data);
    // Handle the response as needed
  } catch (error) {
    console.error("Error:", error);
    // Handle errors
  }
};

// Define confirmDialog as a ref
const confirmDialog = ref(false);
</script>
