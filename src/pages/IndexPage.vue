<template>
  <q-page class="flex flex-center">
    <q-btn
      icon="person"
      color="blue"
      @click="$router.push('/login')"
      label="Login"
    ></q-btn>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "IndexPage",
});
</script>
