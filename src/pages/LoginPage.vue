<template>
  <q-page class="flex flex-center">
    <q-card class="q-card">
      <q-card-section>
        <q-form @submit.prevent="submitForm">
          <q-input filled v-model="email" label="Email" type="email" required />
          <q-input
            filled
            v-model="password"
            label="Password"
            type="password"
            required
          />
          <q-btn type="submit" color="primary" label="Submit" />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      // Handle form submission here
      console.log("Form submitted");
    },
  },
};
</script>
