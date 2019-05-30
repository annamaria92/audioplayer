<template>
  <div class="audio-track">
    <p>
      {{song}} by {{singer}}
    </p>
    <p>
      Source: {{fileName}}
    </p>
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
