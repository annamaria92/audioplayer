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

export default {
  name: 'app',
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
    isRestored() {
      return this.$store.getters.RESTORED;
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
      if (!this.isPlaying) {
        let refName = 'audioElem' + this.currentaudioIndex;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].play();
        }

        this.$store.dispatch('SET_PLAY', true);
      }
    },
    stop: function () {
      if (this.isPlaying) {
        let refName = 'audioElem' + this.currentaudioIndex;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          this.$refs[refName][0].pause();
        }
      
        this.$store.dispatch('SET_PLAY', false);

        refName = 'audioElem' + this.currentaudioIndex;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          const currentTime = this.$refs[refName][0].currentTime;

          // Save position after stop: currentTime
          this.$store.dispatch('SET_CURRENT_TIME', currentTime);
        }
      }
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
      this.$store.dispatch('SET_RESTORED', false);
      this.$store.dispatch('SET_CURRENTAUDIOINDEX', index);
    },
    volumeChange: function () {
      const refName = 'audioElem' + this.currentaudioIndex;
      if (this.$refs[refName] && this.$refs[refName][0]) {
        const volume = this.$refs[refName][0].volume;
        this.$store.dispatch('SET_VOLUME', volume);
      }
    },
    oncanplay: function () {
      if (!this.isRestored) {
        const refName = 'audioElem' + this.currentaudioIndex;
        if (this.$refs[refName] && this.$refs[refName][0]) {
          const restoredTime = this.audioTracks[this.currentaudioIndex].time;

          // Restore position on track: restoredTime
          this.$store.dispatch('SET_RESTORED', true);
          this.$refs[refName][0].currentTime = restoredTime;
        }
      }
    },
    mountNativeEventsHandlers: function() {
      const refName = 'audioElem' + this.currentaudioIndex;
      if (this.$refs[refName] && this.$refs[refName][0]) {
        const audioElem = this.$refs[refName][0];
        
        audioElem.volume = this.audioTracks[this.currentaudioIndex].volume;

        audioElem.onplay = this.play;
        audioElem.onpause = this.stop;
        audioElem.oncanplay = this.oncanplay;
        audioElem.onvolumechange = this.volumeChange; 
      }
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
