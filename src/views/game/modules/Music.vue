<script setup lang="ts">
import { ref, Ref } from 'vue'
import MountainsAudio from '@/assets/music/mountains.ogg'

interface Props {
  /** 自动播放背景音乐 */
  autoPlay?: boolean
}

type HTMLAudioElementRef = Ref<HTMLAudioElement | undefined>

withDefaults(defineProps<Props>(), {
  autoPlay: true
})

const BGMAudioRef: HTMLAudioElementRef = ref()

const createMusicControl = (audioElmRef: HTMLAudioElementRef) => ({
  play: () => audioElmRef.value?.play(),
  pause: () => audioElmRef.value?.pause()
})

defineExpose({ BGMControl: createMusicControl(BGMAudioRef) })
</script>
<template>
  <!-- 背景音乐 -->
  <audio ref="BGMAudioRef" loop :src="MountainsAudio" :autoplay="autoPlay" />
</template>
