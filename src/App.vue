<template>
  <v-app id="app">
    <v-list>        
      <v-list-tile
        v-for="(item, index) in this.audioTracks"
        :key="index"
      >
        <v-list-tile-content v-on:click="choose(index)">
          <v-list-tile-title>
            <span v-if="currentaudioIndex === index"> + </span>
            {{ visibleIndex(index) }} : {{item.singer}} - {{item.song}}
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <div>
      <AudioTrack
        :singer="audioTracks[currentaudioIndex].singer"
        :song="audioTracks[currentaudioIndex].song"
        :fileName="musicServer + audioTracks[currentaudioIndex].fileName"
        :isPlaying="this.isPlaying"
      />
    </div>
      
    <div>
      <!-- <v-btn
        color="success"
        v-if="!this.isPlaying"
        v-on:click="play"
      >
        воспроизведение
      </v-btn>
      <v-btn
        color="error"
        v-if="this.isPlaying"
        v-on:click="stop"
      >
        пауза
      </v-btn> -->
      <v-btn color="info" v-on:click="prev">←предыдущий</v-btn>
      <v-btn color="info" v-on:click="next">следующий→</v-btn>
    </div>
    <!-- найти трек -->

    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import AudioTrack from './components/AudioTrack.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
    AudioTrack
  },
  computed: {
    musicServer() {
      return this.$store.getters.MUSICSERVER;
    },
    audioTracks() {
      return this.$store.getters.AUDIOTRACKS;
    },
    isPlaying() {
      return this.$store.getters.PLAY;
    },
    currentaudioIndex() {
      return this.$store.getters.CURRENTAUDIO;
    }
  },
  methods: {
    visibleIndex: function (index) {
      return index+1
    },
    play: function () {
      this.$store.dispatch('SET_PLAY', true);
    },
    stop: function () {
      this.$store.dispatch('SET_PLAY', false);
    },
    next: function () {
      let index = this.currentaudioIndex + 1;
      if (index > this.audioTracks.length - 1) {
        index = 0;
      }
      this.$store.dispatch('SET_CURRENTAUDIO', index);
      this.$store.dispatch('SET_PLAY', false);
    },
    prev: function () {
      let index = this.currentaudioIndex - 1;
      if (index < 0) {
        index = this.audioTracks.length - 1;
      }
      this.$store.dispatch('SET_CURRENTAUDIO', index);
      this.$store.dispatch('SET_PLAY', false);
    },
    choose: function (index) {
      if (index === this.currentaudioIndex) {
        this.$store.dispatch('SET_PLAY', !this.isPlaying);
      } else {
        this.$store.dispatch('SET_CURRENTAUDIO', index);
        this.$store.dispatch('SET_PLAY', false);
      }
    },
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
