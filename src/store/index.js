import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import axios from 'axios';

export default createStore({
  state() {
    return {
      de_sponsors: [],
      d_sponsors: [],
      g_sponsors: [],
    };
  },
  getters: {
    getDeSponsors(state) {
      return state.de_sponsors;
    },
    getDSponsors(state) {
      return state.d_sponsors;
    },
    getGSponsors(state) {
      return state.g_sponsors;
    },
  },
  mutations: {
    setSponsors(state, sponsors) {
      state.de_sponsors = sponsors.de_sponsors || [];
      state.d_sponsors = sponsors.d_sponsors || [];
      state.g_sponsors = sponsors.g_sponsors || [];
    },
  },
  actions: {
    fetchSponsors({ commit }) {
      return axios.get('/api/sponsors')
        .then(response => {
          const sponsors = {
            de_sponsors: [],
            d_sponsors: [],
            g_sponsors: [],
          };

          response.data.forEach(sponsor => {
            const formattedSponsor = {
              id: sponsor.sponsorName,
              name: sponsor.sponsorName,
              description: sponsor.sponsorDescription,
              logo: sponsor.sponsorImageUrl,
            };

            switch (sponsor.sponsorClass.toUpperCase()) {
              case 'DIAMOND_EXCLUSIVE':
                sponsors.de_sponsors.push(formattedSponsor);
                break;
              case 'DIAMOND':
                sponsors.d_sponsors.push(formattedSponsor);
                break;
              case 'GOLD':
                sponsors.g_sponsors.push(formattedSponsor);
                break;
            }
          });

          commit('setSponsors', sponsors);
        })
        .catch(error => {
          console.error('Failed to fetch sponsors:', error);
        });
    },
  },
  plugins: [createPersistedState({
    storage: window.localStorage,
  })],
});