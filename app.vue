<template>
  <div class="grid grid-cols-4 gap-4 m-4">
    <Release v-bind="track" :playing="current" v-for="track in tracks" :key="track.href"
      @playing="updateCurrentPlayingTrack" />
  </div>
</template>
<script setup lang="ts">
const { data: tracks } = await useFetch('/api/get-tracks')

const current = ref('')

const updateCurrentPlayingTrack = (href: string) => {
  current.value = href
}
</script>

