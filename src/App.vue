<template>
  <div
    id="app"
    class="container container-center"
  >
    <header class="pb-4 pt-4">
      <h1 class="text-center">
        Audio Player
      </h1>
    </header>

    <div class="pb-4">
      <p>
        Моя музыка
      </p>
      <ul class="list-group">
        <li
          class="list-group-item ap-list-item"
          v-for="(item, index) in this.audioTracks"
          v-bind:class="{ 'selected-item' : index === currentaudioIndex }"
          v-on:click="choose(index)"
          :key="index"
        >
          <div>
            {{item.singer}} - 
            {{item.song}}
          </div>
          <div v-if="index === currentaudioIndex" class="pt-2">
            <audio controls :ref="'audioElem' + index">
              <source :src="musicServer + item.fileName" type="audio/mpeg">
              Your browser does not support the audio element.
            </audio>
          </div>
        </li>
      </ul>
    </div>

    <div class="pb-4 d-flex flex-wrap justify-content-start">
      <button class="btn btn-secondary mr-2" v-if="!isPlaying" v-on:click="play"><i class="fa fa-play"></i></button>
      <button class="btn btn-secondary mr-2" v-if="isPlaying" v-on:click="stop"><i class="fa fa-pause"></i></button>
      <button class="btn btn-secondary mr-2" v-on:click="prev"><i class="fa fa-chevron-left"></i></button>
      <button class="btn btn-secondary mr-2" v-on:click="next"><i class="fa fa-chevron-right"></i></button>
    </div>

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

    <!-- найти трек -->

    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->

    <div class="pb-4">
      <p> {{ this.audioTracks[this.currentaudioIndex].singer }} - 
          {{ this.audioTracks[this.currentaudioIndex].song }} <br>
        <small> Громкость: {{ this.audioTracks[this.currentaudioIndex].volume }} </small> <br>
        <small> Прогресс: {{ this.audioTracks[this.currentaudioIndex].time }} </small> <br>
      </p>
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
      return this.$store.getters.CURRENTAUDIOINDEX;
    },
  },
  methods: {
    visibleIndex: function (index) {
      return index+1
    },
    play: function () {
      let i;
      let refName;
      for (i = 0; i < this.audioTracks.length; i++) {
        refName = 'audioElem' + i;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].pause();
        }
      }

      refName = 'audioElem' + this.currentaudioIndex;
      if (this.$refs[refName] && this.$refs[refName][0]) {
        this.$refs[refName][0].play();
      }

      this.$store.dispatch('SET_PLAY', true);
    },
    stop: function () {
      let i;
      let refName;
      for (i = 0; i < this.audioTracks.length; i++) {
        refName = 'audioElem' + i;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].pause();
        }
      }
      
      this.$store.dispatch('SET_PLAY', false);
    },
    next: function () {
      let index = this.currentaudioIndex + 1;
      if (index > this.audioTracks.length - 1) {
        index = 0;
      }
      this.setCurrentAudioIndex(index);
    },
    prev: function () {
      let index = this.currentaudioIndex - 1;
      if (index < 0) {
        index = this.audioTracks.length - 1;
      }
      this.setCurrentAudioIndex(index);
    },
    choose: function (index) {
      if (index === this.currentaudioIndex) {
        if (this.isPlaying) {
          this.stop();
        } else {
          this.play();
        }
      } else {
        this.setCurrentAudioIndex(index);        
      }
    },
    setCurrentAudioIndex: function (index) {
      this.stop();
      this.unmountNativeEventsHandlers();
      this.$store.dispatch('SET_CURRENTAUDIOINDEX', index);
    },
    volumeChange: function (volume) {
      this.$store.dispatch('SET_VOLUME', volume);
    },
    timeUpdate:  function (currentTime) {
      this.$store.dispatch('SET_CURRENT_TIME', currentTime);
    },
    mountNativeEventsHandlers: function() {
      console.log('mountNativeEventsHandlers');
    },
    unmountNativeEventsHandlers: function() {
      console.log('unmountNativeEventsHandlers');
    },
  },
  mounted() {
    this.mountNativeEventsHandlers();
  },
  updated() {    
    this.mountNativeEventsHandlers();
  },
}
</script>

<style>

.ap-list-item {
  cursor: pointer;
}

.selected-item {
  font-weight: bold;
}

</style>
