// auth-store.js
import { reactive } from "vue";

export const authStore = {
  state: reactive({
    session: {},
    profile: {
      userName: "",
      fullName: "",
      avatar: "",
      isVerified: false,
    },
  }),

  mutations: {
    setSession: (state, session) => {
      state.session = session;
    },
    setProfile: (state, { userName, fullName, avatar, isVerified }) => {
      state.profile.userName = userName;
      state.profile.fullName = fullName;
      state.profile.avatar = avatar;
      state.profile.isVerified = isVerified;
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
          const { username, avatar_url, full_name } = profileData.data;
          const { is_verified } = verificationData.data;

          authStore.mutations.setProfile(authStore.state, {
            userName: username,
            fullName: full_name,
            avatar: avatar_url,
            isVerified: is_verified,
          });
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
