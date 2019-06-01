<template>
  <div id="app">
      <!-- List block -->
      <div>
        <div>
          Audio Player by Anna
        </div>

        <ul>
          <!--
            NOTE!

            Vuetify styles are bad.

            I was not able to find vuetify best practices.
            So I used 'selected-item' class to highlight selected element.

            TODO: fix it when Vuetify Framework documentation is updated.
          -->
          <li
            v-for="(item, index) in this.audioTracks"
            :key="index"
            v-bind:class="{ 'selected-item' : index === currentaudioIndex }"
          >
            <div v-on:click="choose(index)">
              <v-list-tile-title v-html="item.singer"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.song"></v-list-tile-sub-title>
            </div>
          </li>
        </ul>

          <div>
            <!-- <AudioTrack
              :singer="audioTracks[currentaudioIndex].singer"
              :song="audioTracks[currentaudioIndex].song"
              :fileName="musicServer + audioTracks[currentaudioIndex].fileName"
              :volume="audioTracks[currentaudioIndex].volume"
              :currentTime="audioTracks[currentaudioIndex].time"
              :isPlaying="this.isPlaying"
              v-on:playing="play"
              v-on:pause="stop"
              v-on:volume-change="volumeChange"
              v-on:time-update="timeUpdate"
            /> -->
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

        <!-- Audio tracks block -->
      
        <ul>
          <!-- TODO: fix no-use-v-if-with-v-for eslint warning -->
          <li
            v-for="(item, index) in this.audioTracks"
            v-if="index === currentaudioIndex"
            :key="index"
          >
            <div v-on:click="choose(index)">
              <!-- <v-list-tile-title v-html="item.singer"></v-list-tile-title>
              <v-list-tile-sub-title v-html="item.song"></v-list-tile-sub-title> -->
              <audio controls>
                <source :src="musicServer + item.fileName" type="audio/mpeg">
                Your browser does not support the audio element.
              </audio>
            </div>

          </li>
        </ul>
      </div>
  </div>
</template>

<script>
// import AudioTrack from './components/AudioTrack.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
    // AudioTrack
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
    },
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
    volumeChange: function (volume) {
      this.$store.dispatch('SET_VOLUME', volume);
    },
    timeUpdate:  function (currentTime) {
      this.$store.dispatch('SET_CURRENT_TIME', currentTime);
    },
  }
}
</script>

<style>

.selected-item {
  background-color: aliceblue;
  color: red;
}

</style>
