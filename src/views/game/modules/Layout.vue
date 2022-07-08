<script setup lang="ts">
import { ref, onMounted, onDeactivated, computed, unref } from 'vue'
import { setScaleToResize } from '@/utils/setScale'
import { GameStatus, useGameStoreRefs } from '@/store/game'

const { gameStatus, playerData } = useGameStoreRefs()

let scale: number
let clear: () => void
const gameLayout = ref<HTMLDivElement>()
const plantInstanceRef = ref<HTMLImageElement>()
const gameContentBGPositionX = computed(() => (gameStatus.value === GameStatus.choosePlant ? '-500px' : '-115px'))

const getPlantInstancePosition = ({ x, y }: MouseEvent) => {
  return {
    left: x / scale + 'px',
    top: y / scale + 'px'
  }
}
const handleMovePlant = (evn: MouseEvent) => {
  const el = unref(plantInstanceRef)
  if (!playerData.value.selectedPlant || !el) return
  const { top, left } = getPlantInstancePosition(evn)
  el.style.top = top
  el.style.left = left
}

onMounted(() => ({ clear, scale } = setScaleToResize(gameLayout.value as HTMLDivElement, 900, 600)))
onDeactivated(() => clear && clear())
</script>
<template>
  <div class="full game-layout" @mousemove="handleMovePlant">
    <div ref="gameLayout" :style="{ backgroundPositionX: gameContentBGPositionX }" class="full game-content">
      <slot />
      <img
        v-if="playerData.selectedPlant"
        ref="plantInstanceRef"
        class="plant-instance"
        :src="playerData.selectedPlant.diagram"
        :style="getPlantInstancePosition(playerData.selectedPlant.event)"
        alt="plant-instance"
      >
    </div>
  </div>
</template>

<style lang="less" scoped>
.game-layout {
  position: relative;
  background: #000;
  .game-content {
    background: url('@/assets/images/game-layout-bg.jpg') no-repeat;
    background-size: 1400px 600px;
    transition: all 1s;
  }

  .plant-instance {
    position: absolute;
    transform: translate(-50%, -100%);
    will-change: top left;
    z-index: 2;
    cursor: grab;
  }
}
</style>
