<template>
  <div class="audio-track">
    <p>
      {{song}} by {{singer}}
    </p>
    <p>
      Source: {{fileName}}
    </p>
    <audio controls>
      <source :src="fileName" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script>
export default {
  name: 'AudioTrack',
  props: {
    singer: String,
    song: String,
    fileName: String,
  }
}
</script>

<style scoped>

.audio-track {
  border: 1px solig gray;
}

</style>
