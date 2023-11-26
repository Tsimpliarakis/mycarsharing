<template>
  <q-input
    class="button"
    outlined
    v-model="text"
    label="Location"
    dense
    rounded
    bg-color="white"
  >
    <template v-slot:before>
      <q-icon name="place" />
    </template>

    <template v-slot:append>
      <q-icon
        v-if="text !== ''"
        name="close"
        @click="clearText"
        class="cursor-pointer"
      />
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchBar",
  data() {
    return {
      text: "",
    };
  },
  methods: {
    clearText() {
      this.text = "";
    },
  },
});
</script>

<style scoped>
.button {
  width: 50vw;
  min-width: 300px;
  max-width: 600px;
  background-color: #f1f1f1;
  border-radius: 20px;
}
</style>
