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
                      @click="deleteAccount"
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
  {{ authStore.state.session.user.id }}
</template>

<script>
import { ref } from "vue";
import { authStore } from "../stores/auth-store";
import LoginForm from "../components/auth/LoginForm.vue";
import { supabase } from "../lib/supabaseClient";

export default {
  components: {
    LoginForm,
  },
  setup() {
    const deleteAccount = async () => {
      try {
        // Perform deletion from Supabase database
        const user = authStore.state.session.user; // Assuming you have user data in your authStore
        const { error } = await supabase.auth.admin.deleteUser(user.id); // Replace "id" with the actual primary key field of your user table

        if (error) {
          console.error("Error deleting account:", error);
          // Handle error appropriately (show a message to the user, etc.)
        } else {
          // Successfully deleted account
          console.log("Account deleted successfully");
          // Optionally, perform any additional cleanup or redirection after deletion
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return {
      authStore,
      confirmDialog: ref(false),
      deleteAccount,
    };
  },
};
</script>

<style scoped>
.right-panel {
  flex: 1;
}
</style>
