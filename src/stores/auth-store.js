import { reactive } from "vue";

export const authStore = {
  state: reactive({
    session: {},
    profile: {
      userName: "",
      fullName: "",
      avatar: "",
    },
  }),

  mutations: {
    setSession(state, session) {
      state.session = session;
    },
    setProfile(state, { userName, fullName, avatar }) {
      state.profile.userName = userName;
      state.profile.fullName = fullName;
      state.profile.avatar = avatar;
    },
  },
};
