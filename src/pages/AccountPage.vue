<template>
  <q-page>
    <div class="flex">
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
import LeftPanelMenu from "src/components/profile/LeftPanelMenu.vue";
import ChangeAvatar from "src/components/profile/ChangeAvatar.vue";
import UploadDocuments from "src/components/profile/UploadDocuments.vue";
import WelcomeProfile from "src/components/profile/WelcomeProfile.vue";

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
  .flex {
    display: block;
  }
}
</style>
