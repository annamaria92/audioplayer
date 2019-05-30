<template>
  <div class="audio-track">
    <p>
      {{song}} by {{singer}}
    </p>
    <p>
      Source is {{ isPlaying ? "playing" : "paused" }}: {{fileName}}
    </p>
    
    <audio ref="audioElem" controls>
      <source :src="fileName" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
export default {
  name: 'AudioTrack',
  data: function() {
    return {
      currentTrack: null,
    };
  },
  props: {
    singer: String,
    song: String,
    fileName: String,
    isPlaying: Boolean
  },
  methods: {
    initAudio: function() {
      if (this.currentTrack !== this.fileName) {
        this.currentTrack = this.fileName;

        // https://stackoverflow.com/a/8870315
        this.$refs.audioElem.setAttribute('src', this.currentTrack); //change the source
        this.$refs.audioElem.load(); //load the new source
      }

      if (this.isPlaying) {
        this.$refs.audioElem.play();
      } else {
        this.$refs.audioElem.pause(); 
      }
    }
  },
  mounted() {
    this.initAudio();
  },
  beforeUpdate() {
    this.initAudio();
  }
}
</script>

<style scoped>

.audio-track {
  border: 1px solig gray;
}

</style>
