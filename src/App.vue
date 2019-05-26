<template>
  <div id="app">
    <ul>
      <li v-bind:key="item" v-for="item in this.audioTracks">
        {{item}}
      </li>      
    </ul>
    
    <button>воспроизведение</button>
    <button>пауза</button>
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
