<template>
  <div class="avatarform">
    <q-separator
      color="green"
      style="width: 120%; height: 3px; margin-left: -10%"
    />
    <br />
    <p style="text-align: left; font-weight: bold">Upload your Avatar:</p>
    <q-file v-model="selectedFile" color="green-7" />
    <p style="font-size: 12px">Browse files</p>
    <q-separator
      color="green"
      style="width: 120%; height: 3px; margin-left: -10%"
    />
    <br />
    <q-btn
      @click="uploadAvatar"
      color="green-7"
      label="Upload"
      :loading="uploading"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { authStore } from "src/stores/auth-store";
import { useQuasar } from "quasar";

const selectedFile = ref(null);
const uploading = ref(false); // Loading state
const $q = useQuasar();

async function uploadAvatar() {
  // Ensure a file is selected
  if (!selectedFile.value) {
    return;
  }

  uploading.value = true; // Set loading state to true

  const userId = authStore.state.session.user.id;
  const randomString = Math.random().toString(36).substring(2, 15);
  const fileExtension = selectedFile.value.name.split(".").pop();
  const fileName = `${userId}_${randomString}.${fileExtension}`;
  const avatar_url = `https://igohglatbbhgyelsipze.supabase.co/storage/v1/object/public/avatars/${fileName}`;

  try {
    // Upload the avatar to Supabase Storage
    const { data, error } = await supabase.storage
      .from("avatars")
      .upload(fileName, selectedFile.value, {
        cacheControl: "3600",
        upsert: false,
      });
    if (error) {
      console.error("Error uploading avatar:", error.message);
    } else {
      // Update the user's avatar in Supabase data
      const { data, error } = await supabase
        .from("profiles")
        .update({
          avatar_url: avatar_url,
        })
        .eq("id", userId)
        .single();
      if (error) {
        console.error("Error updating profile:", error.message);
      } else {
        // Update the user's avatar in the auth store
        authStore.state.profile.avatar_url = avatar_url;
        $q.notify({
          position: "top",
          color: "positive",
          message: "Avatar uploaded successfully",
        });
      }
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
  } finally {
    uploading.value = false; // Set loading state to false regardless of success or failure
  }
}
</script>

<style scoped>
.avatarform {
  text-align: center;
}
.input_field {
  background-color: #e2ffe0;
  padding: 10px;
  border-radius: 20px;
  border: 1px solid #558155;
}
</style>
