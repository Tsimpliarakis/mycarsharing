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

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    onSubmit() {
      // handle form submission
      console.log("Form submitted");
    },
    onReset() {
      this.name = "";
      this.email = "";
      this.message = "";
    },
  },
};
</script>

<style scoped>
.page {
  margin-top: -50px;
}
</style>
