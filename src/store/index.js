import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    musicserver: "http://annamaria92.ru/music/",
    audiotracks: [
      {
        singer: "Frank Sinatra",
        song: "Love and Marriage",
        fileName: "Frank_Sinatra-Love_and_Marriage.mp3",
        volume: 1,
        time: 0,
      },
      {
        singer: "Astrud Gilberto",
        song: "The Girl From Ipanema",
        fileName: "Stan_Gets_and_Astrud_Gilberto-Girl_from_Ipanema.mp3",
        volume: 1,
        time: 0,
      },
      {
        singer: "Beatles",
        song: "Yesterday",
        fileName: "Beatles-Yesterday.mp3",
        volume: 1,
        time: 0,
      },
      {
        singer: "Queen",
        song: "I Want To Break Free",
        fileName: "Queen-I_Want_To_Break_Free.mp3",
        volume: 1,
        time: 0,
      },
    ],
    currentaudioindex: 0,
    play: false,
  },
  getters: {
    MUSICSERVER: state => {
      return state.musicserver;
    },
    AUDIOTRACKS: state => {
      return state.audiotracks;
    },
    CURRENTAUDIOINDEX: state => {
      return state.currentaudioindex;
    },
    PLAY: state => {
      return state.play;
    },
  },
  mutations: {
    SET_PLAY: (state, payload) => {
      state.play = payload;
    },
    SET_CURRENTAUDIOINDEX: (state, payload) => {
      state.currentaudioindex = payload;
    },
    SET_VOLUME: (state, payload) => {
      state.audiotracks[state.currentaudioindex].volume = payload;
    },
    SET_CURRENT_TIME: (state, payload) => {
      state.audiotracks[state.currentaudioindex].time = payload;
    },
  },
  actions: {
    SET_PLAY: (context, payload) => {
      context.commit('SET_PLAY', payload);
    },
    SET_CURRENTAUDIOINDEX: (context, payload) => {
      context.commit('SET_CURRENTAUDIOINDEX', payload);
    },
    SET_VOLUME: (context, payload) => {
      context.commit('SET_VOLUME', payload);
    },
    SET_CURRENT_TIME: (context, payload) => {
      context.commit('SET_CURRENT_TIME', payload);
    },
  },
});
