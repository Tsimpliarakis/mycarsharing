<template>
  <q-layout view="hHh lpr fff">
    <header-component />
    <q-page-container>
      <router-view />
    </q-page-container>
    <footer-component />
  </q-layout>
</template>

<script setup>
import HeaderComponent from "src/components/HeaderComp.vue";
import FooterComponent from "src/components/FooterComp.vue";
</script>

<style scoped>
.q-page-container {
  background-color: #f1f1f1;
}
</style>
