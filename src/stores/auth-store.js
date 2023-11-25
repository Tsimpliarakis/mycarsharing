import { reactive } from "vue";

export const authStore = {
  state: reactive({
    session: {},
  }),

  mutations: {
    setSession(state, session) {
      state.session = session;
    },
  },
};
