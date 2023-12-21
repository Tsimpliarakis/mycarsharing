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
              <q-item-section><q-btn flat>Change Avatar</q-btn></q-item-section>
            </q-item>
            <q-item>
              <q-item-section
                ><q-btn flat>Upload documents</q-btn></q-item-section
              >
            </q-item>
            <q-separator />
            <q-item>
              <q-item-section style="color: #dc143c"
                ><q-btn label="Delete Account" @click="confirmDialog = true"
              /></q-item-section>
              <q-dialog v-model="confirmDialog" persistent>
                <q-card>
                  <q-card-section class="row items-center">
                    <q-avatar icon="warning" color="red-7" text-color="white" />
                    <span class="q-ml-sm"
                      >Are you sure you want to permanently delete your account?
                      <br />
                      This action cannot be undone.</span
                    >
                  </q-card-section>

                  <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="green-8" v-close-popup />
                    <q-btn
                      flat
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
import { ref } from "vue";
import { authStore } from "../stores/auth-store";
import LoginForm from "../components/auth/LoginForm.vue";
import axios from 'axios';
import { supabase } from "../lib/supabaseClient";

export default {
  components: {
    LoginForm,
  },
  methods: {
    deleteUserAccount() {
      const url = 'https://igohglatbbhgyelsipze.supabase.co/functions/v1/delete-user-account';
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlnb2hnbGF0YmJoZ3llbHNpcHplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkzNTI5NzMsImV4cCI6MjAxNDkyODk3M30.0kAm5Z0owBVjy1kzzbbFsAgeGdQVIH7oUHobIi4lQag';

      const requestData = {
        name: 'kalhspera',
      };

      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      };

      axios.post(url, requestData, config)
        .then(response => {
          console.log('Response:', response.data);
          // Handle the response as needed
        })
        .catch(error => {
          console.error('Error:', error);
          // Handle errors
        });
    },
  },
  setup() {
    return {
      authStore,
      confirmDialog: ref(false),
    };
  },
};
</script>

<style scoped>
.right-panel {
  flex: 1;
}
</style>
