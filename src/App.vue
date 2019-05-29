<template>
  <v-app id="app">
    <ul>
      <li v-bind:key="index" v-for="(item, index) in this.audioTracks">
        <div v-on:click="choose(index)">
          <p>
            <span v-if="currentaudioIndex === index"> + </span>
            {{ visibleIndex(index) }} : {{item.singer}} - {{item.song}}
          </p>
          <p>
            <audio controls>
              <source :src="musicServer + item.fileName" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </p>
        </div>
      </li>      
    </ul>
    <div>
      <p>
        Current audio: {{ musicServer + audioTracks[currentaudioIndex].fileName }}
      </p>      
    </div>
      
    <div>
      <v-btn
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
      </v-btn>
      <v-btn color="info" v-on:click="prev">←предыдущий</v-btn>
      <v-btn color="info" v-on:click="next">следующий→</v-btn>
    </div>
    <!-- найти трек -->
    <!-- выбрать конкретную временную метку песни -->
    <!-- отрегулировать громкость -->

    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
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
    },
    prev: function () {
      let index = this.currentaudioIndex - 1;
      if (index < 0) {
        index = this.audioTracks.length - 1;
      }
      this.$store.dispatch('SET_CURRENTAUDIO', index);
    },
    choose: function (index) {
      if (index === this.currentaudioIndex) {
        this.$store.dispatch('SET_PLAY', !this.isPlaying);
      } else {
        this.$store.dispatch('SET_CURRENTAUDIO', index);
      }
    },
  },
  mounted() {
    // eslint-disable-next-line
    console.log(this.audioTracks);
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
