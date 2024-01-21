<template>
  <q-page class="flex flex-center">
    <div class="text-center">
      <div class="text-h6">Add New Car</div>
      <form @submit.prevent="addCar">
        <q-input
          color="green"
          v-model="manufacturer"
          placeholder="Manufacturer"
          required
        />
        <q-input color="green" v-model="model" placeholder="Model" required />
        <q-input color="green" v-model="year" placeholder="Year" required />
        <q-input color="green" v-model="color" placeholder="Color" required />
        <q-input
          color="green"
          v-model="gasType"
          placeholder="Gas Type"
          required
        />
        <div class="text-left text-grey-8">Photos</div>
        <input class="photos" type="file" multiple @change="handleFiles" />
        <br />
        <q-btn :loading="isLoading" color="green" type="submit">Submit</q-btn>
      </form>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { authStore } from "src/stores/auth-store";
import { useQuasar } from "quasar";

export default {
  setup() {
    const manufacturer = ref("");
    const model = ref("");
    const year = ref("");
    const color = ref("");
    const gasType = ref("");
    const files = ref([]);
    const isLoading = ref(false);
    const $q = useQuasar();

    const handleFiles = (event) => {
      files.value = event.target.files;
    };

    const addCar = async () => {
      isLoading.value = true;
      try {
        // Upload images to Supabase storage
        for (const file of files.value) {
          const path = `${Date.now()}-${file.name}`;
          const { data, error } = await supabase.storage
            .from("cars")
            .upload(path, file);
          if (error) throw error;
        }

        // Insert car details into database
        const { data, error } = await supabase
          .from("cars")
          .insert([
            {
              user_id: authStore.state.session.user.id,
              manufacturer: manufacturer.value,
              model: model.value,
              year: year.value,
              color: color.value,
              fuel_type: gasType.value,
            },
          ])
          .single();
        if (error) throw error;

        // Clear form
        manufacturer.value = "";
        model.value = "";
        year.value = "";
        color.value = "";
        gasType.value = "";
        files.value = [];
        $q.notify({
          position: "top",
          color: "positive",
          message: "Car added successfully",
        });
      } catch (error) {
        // Set error notification
        $q.notify({
          position: "top",
          color: "negative",
          message: "Error adding car",
        });
      } finally {
        isLoading.value = false;
      }
    };

    return {
      manufacturer,
      model,
      year,
      color,
      gasType,
      handleFiles,
      addCar,
      isLoading,
    };
  },
};
</script>

<style scoped>
.q-input {
  margin: 10px;
}

.photos {
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>
