<script setup lang="ts">
import { ref, Ref, watch } from 'vue'
import { useGameStoreRefs } from '@/store/game'
import ChoosePlantBGM from '@/assets/musics/wait-bgm.mp3'

interface Props {
  /** 自动播放背景音乐 */
  autoPlay?: boolean
}

type HTMLAudioElementRef = Ref<HTMLAudioElement | undefined>

withDefaults(defineProps<Props>(), {
  autoPlay: true
})

const { isPause } = useGameStoreRefs()
const choosePlantBGMRef: HTMLAudioElementRef = ref()

watch(isPause, (value) => value && [ChoosePlantBGMControl.pause()])

const createMusicControl = (audioElmRef: HTMLAudioElementRef) => ({
  play: () => audioElmRef.value?.play(),
  pause: () => audioElmRef.value?.pause()
})

const ChoosePlantBGMControl = createMusicControl(choosePlantBGMRef)

defineExpose({ ChoosePlantBGMControl })
</script>
<template>
  <!-- 选择植物画面背景音乐 -->
  <audio ref="choosePlantBGMRef" autoplay loop :src="ChoosePlantBGM" />
</template>
