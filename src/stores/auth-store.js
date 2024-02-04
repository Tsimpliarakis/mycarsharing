// auth-store.js
import { reactive } from "vue";

export const authStore = {
  state: reactive({
    session: {},
    profile: {},
  }),

  mutations: {
    setSession: (state, session) => {
      state.session = session;
    },
    setProfile: (state, profile) => {
      state.profile = profile;
    },
    resetProfile: (state) => {
      state.profile = {};
    },
  },

  actions: {
    fetchUserProfile: async (supabaseClient, userId) => {
      try {
        const [profileData, verificationData] = await Promise.all([
          supabaseClient.from("profiles").select("*").eq("id", userId).single(),
          supabaseClient
            .from("verification")
            .select("is_verified")
            .eq("id", userId)
            .single(),
        ]);

        if (profileData?.data && verificationData?.data) {
          const profile = profileData.data;
          profile.is_verified = verificationData.data.is_verified;
          authStore.mutations.setProfile(authStore.state, profile);
        }
      } catch (error) {
        console.error(error);
      }
    },

    setSessionFromLocalStorage: () => {
      try {
        const tokenStr = localStorage.getItem(
          "sb-igohglatbbhgyelsipze-auth-token"
        );

        // Check if token exists
        if (!tokenStr) {
          return;
        }

        const token = JSON.parse(tokenStr);

        if (token && token.user && token.user.id) {
          authStore.mutations.setSession(authStore.state, token.user.id);
        } else {
          console.log("Invalid token or user id not found");
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
};
