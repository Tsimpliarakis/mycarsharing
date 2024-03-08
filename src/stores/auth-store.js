// auth-store.js
import { reactive } from "vue";

export const authStore = {
  state: reactive({
    session: {},
    profile: {},
    bookings: {},
    cars: {},
    reviews: {},
    favorites: {},
  }),

  mutations: {
    setSession: (state, session) => {
      state.session = session;
    },
    setProfile: (state, profile) => {
      state.profile = profile;
    },
    setBookings: (state, bookings) => {
      state.bookings = bookings;
    },
    setCars: (state, cars) => {
      state.cars = cars;
    },
    setReviews: (state, reviews) => {
      state.reviews = reviews;
    },
    setFavorites: (state, favorites) => {
      state.favorites = favorites;
    },
    resetStates: (state) => {
      state.profile = {};
      state.bookings = {};
      state.cars = {};
      state.reviews = {};
      state.favorites = {};
    },
  },

  actions: {
    fetchUserProfile: async (supabaseClient, userId) => {
      try {
        const [
          profileData,
          verificationData,
          bookingsData,
          carsData,
          reviewsData,
          favoritesData,
        ] = await Promise.all([
          supabaseClient.from("profiles").select("*").eq("id", userId).single(),
          supabaseClient
            .from("verification")
            .select("is_verified")
            .eq("id", userId)
            .single(),
          supabaseClient.from("bookings").select("*").eq("user_id", userId),
          supabaseClient.from("cars").select("*").eq("user_id", userId),
          supabaseClient.from("reviews").select("*").eq("rated_user", userId),
          supabaseClient.from("favorites").select("*").eq("user_id", userId),
        ]);

        if (profileData?.data && verificationData?.data) {
          const profile = profileData.data;
          profile.is_verified = verificationData.data.is_verified;
          authStore.mutations.setProfile(authStore.state, profile);
        }

        if (bookingsData?.data) {
          authStore.mutations.setBookings(authStore.state, bookingsData.data);
        }

        if (carsData?.data) {
          authStore.mutations.setCars(authStore.state, carsData.data);
        }

        if (reviewsData?.data) {
          authStore.mutations.setReviews(authStore.state, reviewsData.data);
        }

        if (favoritesData?.data) {
          // Set favorites if available
          authStore.mutations.setFavorites(authStore.state, favoritesData.data);
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
