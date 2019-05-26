<template>
  <div id="app">
    <ul>
      <li>Frank Sinatra - Love and Marriage</li>
      <li>Astrud Gilberto - The Girl From Ipanema</li>
      <li>Beatles - Yesterday</li>
      <li>Queen - I Want To Break Free</li>
    </ul>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
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
