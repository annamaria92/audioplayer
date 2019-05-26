import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
  	audiotracks: [
      "Frank Sinatra - Love and Marriage",
      "Astrud Gilberto - The Girl From Ipanema",
      "Beatles - Yesterday",
      "Queen - I Want To Break Free",
    ],
    play: false,
  },
  getters: {
  	AUDIOTRACKS: state => {
  	  return state.audiotracks;
    },
    PLAY: state => {
  	  return state.play;
    },
  },
  mutations: {
    SET_PLAY: (state, payload) => {
      state.play = payload;
    },
  },
  actions: {
    SET_PLAY: (context, payload) => {
      context.commit('SET_PLAY', payload);
    },
  },
});
