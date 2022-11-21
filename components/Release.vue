<template>
    <div
        class="hover:scale-105 transition duration-300 ease-in-out hover:z-50 hover:shadow-xl rounded-lg overflow-clip">
        <audio :src="preview" ref="audio" hidden></audio>
        <img :src="image" @click="togglePlay">
    </div>
</template>
<script setup lang="ts">
const props = defineProps({
    preview: {
        type: String,
    },
    image: {
        type: String
    },
    href: {
        type: String
    },
    playing: {
        type: String
    }
})

const emit = defineEmits(['playing'])

const audio = ref<HTMLAudioElement>()

const state = ref('initial')

const togglePlay = () => {
    if (audio.value && (state.value === 'initial' || state.value === 'paused')) {
        audio.value.play()
        emit('playing', props.href)
    }
    if (audio.value && state.value === 'playing') audio.value.pause()
}

const currentlyPlaying = computed(() => {
    return props.href === props.playing
})

watch(currentlyPlaying, (val) => {
    if (!val) audio.value?.pause()
})

onMounted(() => {
    audio.value?.addEventListener('play', () => {
        state.value = 'playing'
    })

    audio.value?.addEventListener('pause', () => {
        state.value = 'paused'
    })
})

</script>