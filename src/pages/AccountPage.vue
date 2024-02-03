<template>
  <q-page class="q-pa-md">
    <div class="flex xefl">
      <LeftPanelMenu :togglePanel="togglePanels" />
      <q-separator vertical inset />
      <div class="right-panel">
        <div class="q-pa-md flex flex-center">
          <component :is="activePanel" :togglePanel="togglePanels" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import LeftPanelMenu from "src/components/account/LeftPanelMenu.vue";
import ChangeAvatar from "src/components/account/ChangeAvatar.vue";
import UploadDocuments from "src/components/account/UploadDocuments.vue";
import WelcomeProfile from "src/components/account/WelcomeProfile.vue";

export default {
  components: {
    LeftPanelMenu,
    WelcomeProfile,
    ChangeAvatar,
    UploadDocuments,
  },
  data() {
    return {
      activePanel: "WelcomeProfile",
    };
  },
  methods: {
    togglePanels(newPanel) {
      this.activePanel = newPanel;
    },
  },
};
</script>

<style scoped>
.right-panel {
  flex: 1;
}

@media (orientation: portrait) and (max-width: 500px) {
  .xefl {
    display: block;
  }
}
</style>
