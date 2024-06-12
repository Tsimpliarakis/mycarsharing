<template>
  <q-page class="flex flex-center q-pa-md">
    <div class="page">
      <h3>Contact Us</h3>
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          color="green"
          filled
          v-model="name"
          label="Your name *"
          lazy-rules
          :rules="[(val) => !!val || 'Required']"
        />

        <q-input
          color="green"
          filled
          type="email"
          v-model="email"
          label="Your email *"
          lazy-rules
          :rules="[
            (val) => !!val || 'Required',
            (val) =>
              /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val) ||
              'Invalid email',
          ]"
        />

        <q-input filled v-model="message" label="Your message" color="green" />

        <div class="flex flex-center">
          <q-btn label="Submit" type="submit" color="green-6" />
          <q-btn
            label="Reset"
            type="reset"
            color="green-9"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { supabase } from "src/lib/supabaseClient";
import { useQuasar } from "quasar";

const name = ref("");
const email = ref("");
const message = ref("");
const $q = useQuasar();

const onSubmit = async () => {
  try {
    const { data, error } = await supabase
      .from("contact_us")
      .insert([
        { name: name.value, email: email.value, message: message.value },
      ]);

    if (error) {
      throw error;
    }

    $q.notify({
      color: "positive",
      message:
        "Thank you for contacting us. We will get back to you as soon as possible.",
      position: "top",
      icon: "check_circle",
    });
  } catch (error) {
    $q.notify({
      color: "negative",
      message:
        "An error occurred while submitting your message. Please try again.",
      position: "top",
      icon: "report_problem",
    });
  }

  onReset();
};

const onReset = () => {
  name.value = "";
  email.value = "";
  message.value = "";
};
</script>

<style scoped>
.page {
  margin-top: -50px;
}
</style>
