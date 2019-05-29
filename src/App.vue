<template>
  <div id="app">
    <ul>
      <li v-bind:key="index" v-for="(item, index) in this.audioTracks">
        <div v-on:click="choose(index)">
          <p>
            <span v-if="currentaudioIndex === index"> + </span>
            {{ visibleIndex(index) }} : {{item.singer}} - {{item.song}}
          </p>
          <p> 
            <small>
              Audio: {{musicServer + item.fileName}}
            </small>
          </p>
        </div>
      </li>      
    </ul>
    
    <button
      v-if="!this.isPlaying"
      v-on:click="play"
    >
      воспроизведение
    </button>
    <button
      v-if="this.isPlaying"
      v-on:click="stop"
    >
      пауза
    </button>
    <button v-on:click="prev">←предыдущий</button>
    <button v-on:click="next">следующий→</button>
    <!-- найти трек -->
    <!-- выбрать конкретную временную метку песни -->
    <!-- отрегулировать громкость -->

    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
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
