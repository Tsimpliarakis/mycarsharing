<template>
  <q-footer
    :class="{ 'bg-home': isHomePage, 'bg-green-5': !isHomePage }"
    :elevated="!isHomePage"
    class="text-white"
  >
    <q-toolbar>
      <div class="coloumn" style="width: 100%">
        <div class="coloumn list">
          <li><router-link to="/about" class="links">About</router-link></li>
          <li>
            <router-link to="/contact-us" class="links">Contact Us</router-link>
          </li>
          <li>
            <router-link to="/terms" class="links"
              >Terms & Conditions</router-link
            >
          </li>
          <li>
            <router-link to="/privacy-policy" class="links"
              >Privacy Policy</router-link
            >
          </li>
        </div>
        <div class="rights text-center">
          &copy; 2024 MyCarSharing. All rights reserved.
        </div>
      </div>
    </q-toolbar>
  </q-footer>
</template>

<script>
export default {
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
  },
};
</script>

<style scoped>
.links {
  color: inherit;
  text-decoration: none;
}

.list {
  margin-top: 20px;
  width: 80%;
  max-width: 800px;
  margin-left: 10%;
}

@media (min-width: 1000px) {
  .list {
    margin-left: calc((100% - 800px) / 2);
  }
}

.rights {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 12px;
}

.bg-home {
  background-color: #1c4e45 !important;
}
</style>
