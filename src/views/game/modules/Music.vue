<script setup lang="ts">
import { ref, Ref, watch } from 'vue'
import { useGameStoreRefs } from '@/store/game'
import { GameMusicControl, MusicControl } from '@/types/music'
import ChoosePlantBGM from '@/assets/musics/wait-bgm.mp3'
import PauseOGG from '@/assets/musics/pause.ogg'
import ButtonClickOGG from '@/assets/musics/button-click.ogg'
import ChoosePlantOGG from '@/assets/musics/choose-plant.ogg'
import PlantOGG from '@/assets/musics/plant.ogg'

interface Props {
  /** 自动播放背景音乐 */
  autoPlay?: boolean
}

type HTMLAudioElementRef = Ref<HTMLAudioElement | undefined>

defineProps<Props>()

const { musicControl, isDisabledMusic, isPause } = useGameStoreRefs()
const choosePlantBGMRef: HTMLAudioElementRef = ref()
const pauseToneRef: HTMLAudioElementRef = ref()
const buttonClickToneRef: HTMLAudioElementRef = ref()
const ChoosePlantToneRef: HTMLAudioElementRef = ref()
const PlantToneRef: HTMLAudioElementRef = ref()

const createMusicControl = (ref: HTMLAudioElementRef): MusicControl => {
  const control: MusicControl = {
    getElm: () => ref.value as HTMLAudioElement,
    disabled: false,
    getPaused: () => control.getElm().paused,
    play: () => !control.disabled && control.getElm().play(),
    pause: () => control.getElm().pause(),
    replay: () => {
      control.getElm().currentTime = 0
      control.play()
    }
  }
  return control
}

const ChoosePlantBGMControl = createMusicControl(choosePlantBGMRef)
const PauseToneControl = createMusicControl(pauseToneRef)
const ButtonClickToneControl = createMusicControl(buttonClickToneRef)
const ChoosePlantToneControl = createMusicControl(ChoosePlantToneRef)
const PlantToneControl = createMusicControl(PlantToneRef)

// 交移控制权
const exposeMusicControl: GameMusicControl = {
  ChoosePlantBGMControl,
  PauseToneControl,
  ButtonClickToneControl,
  ChoosePlantToneControl,
  PlantToneControl
}
musicControl.value = exposeMusicControl
defineExpose(exposeMusicControl)

// 所有BGM的集合
const BGMControlMap = [ChoosePlantBGMControl]
// 上次正在播放的BGM
const lastPlayBGMControl = ref<MusicControl | undefined>(ChoosePlantBGMControl)
watch(isDisabledMusic, (disabled) => {
  if (disabled) {
    if (!isPause.value) {
      // 保存BGM状态, 一般不存在多首BGM同时播放的情况
      lastPlayBGMControl.value = BGMControlMap.find((control) => !control.getPaused())
    }
  } else {
    // 重启BGM
    lastPlayBGMControl.value?.play()
  }
  for (const key in exposeMusicControl) {
    const control: MusicControl = exposeMusicControl[key]
    control.disabled = disabled
    disabled && control.pause()
  }
})
watch(isPause, (pause) => (pause ? lastPlayBGMControl.value?.pause() : lastPlayBGMControl.value?.replay()))
</script>
<template>
  <!-- 选择植物画面背景音乐 -->
  <audio ref="choosePlantBGMRef" :autoplay="autoPlay" loop :src="ChoosePlantBGM" />
  <!-- 暂停操作音 -->
  <audio ref="pauseToneRef" :src="PauseOGG" />
  <!-- 按钮操作音 -->
  <audio ref="buttonClickToneRef" :src="ButtonClickOGG" />
  <!-- 选择植物操作音 -->
  <audio ref="ChoosePlantToneRef" :src="ChoosePlantOGG" />
  <!-- 种植植物操作音 -->
  <audio ref="PlantToneRef" :src="PlantOGG" />
</template>
