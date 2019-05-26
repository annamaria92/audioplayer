<template>
  <div id="app">
    <ul>
      <li v-bind:key="index" v-for="(item, index) in this.audioTracks">
        <span v-if="currentaudioIndex === index"> + </span>
        {{ visibleIndex(index) }} : {{item}}
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
    <button v-on:click="next">следующий</button>
    <button v-on:click="prev">предыдущий</button>
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
      console.log('play')
      this.$store.dispatch('SET_PLAY', true);
    },
    stop: function () {
      console.log('stop')
      this.$store.dispatch('SET_PLAY', false);
    },
    next: function () {
      console.log('next')
      this.$store.dispatch('SET_CURRENTAUDIO', 1);
    },
    prev: function () {
      console.log('prev')
      this.$store.dispatch('SET_CURRENTAUDIO', 2);
    },
  },
  mounted() {
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
