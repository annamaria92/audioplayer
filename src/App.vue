<template>
  <div id="app">
    <ul>
      <li v-bind:key="index" v-for="(item, index) in this.audioTracks">
        {{ visibleIndex(index) }} : {{item}}
      </li>      
    </ul>
    
    <button v-if="!this.isPlaying">воспроизведение</button>
    <button v-if="this.isPlaying">пауза</button>
    <button>следующий</button>
    <button>предыдущий</button>
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
  },
  methods: {
    visibleIndex: function (index) {
      return index+1
    }
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
