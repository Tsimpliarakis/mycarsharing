import { reactive } from "vue";

export const store = {
  state: reactive({
    user: {},
    token: null,
  }),

  mutations: {
    setUser(state, user) {
      state.user = user;
    },

    setToken(state, token) {
      state.token = token;
    },
  },

  actions: {
    // Your existing actions...

    setTokenFromURL({ commit }, token) {
      commit("setToken", token);
    },
  },
};
