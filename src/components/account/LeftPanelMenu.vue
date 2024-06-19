<template>
  <div class="left-panel text-center">
    <div class="q-pa-md">
      <q-avatar size="100px">
        <q-img :src="authStore.state.profile.avatar_url" />
      </q-avatar>
      <div style="margin-top: 5px; margin-bottom: -10px">
        <ProfileButton
          :user="{
            username: authStore.state.profile.username,
            avatar_url: null,
            rating: authStore.state.profile.rating,
          }"
        />
      </div>
      <div class="text-subtitle1 q-mt-md q-mb-xs">
        {{ authStore.state.profile.first_name }}
        {{ authStore.state.profile.last_name }}
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
        <q-item v-if="!authStore.state.profile.is_verified">
          <q-item-section
            ><q-btn flat rounded @click="togglePanel('UploadDocuments')"
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
import { ref } from "vue";
import { authStore } from "../../stores/auth-store";
import ProfileButton from "./ProfileButton.vue";
import { supabase } from "src/lib/supabaseClient";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();

const router = useRouter();

const { togglePanel: parentTogglePanel } = defineProps(["togglePanel"]);

const togglePanel = (panelName) => {
  parentTogglePanel(panelName);
};

// Define deleteUserAccount as a ref
async function deleteUserAccount() {
  await supabase.rpc("delete_user");
  await logoutSession();
}

const logoutSession = async () => {
  const { error } = await supabase.auth.signOut();
  authStore.mutations.resetStates(authStore.state);

  if (error) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "report_problem",
      message: error.message,
      position: "top",
    });
  } else {
    $q.notify({
      color: "orange-5",
      textColor: "white",
      icon: "exit_to_app",
      message: "Logged out successfully",
      position: "top",
    });

    router.push("/");
  }
};

// Define confirmDialog as a ref
const confirmDialog = ref(false);
</script>
