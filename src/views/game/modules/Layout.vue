<script setup lang="ts">
import { ref, onMounted, onDeactivated, computed, unref, Ref } from 'vue'
import { setScaleToResize } from '@/utils/setScale'
import { GameStatus, useGameStoreRefs } from '@/store/game'

const { gameStatus, playerData } = useGameStoreRefs()

const scaleRef = ref(0)
const gameLayoutRect = ref<DOMRect>()
const gameLayout = ref<HTMLDivElement>()
const plantInstanceRef = ref<HTMLImageElement>()
const gameContentBGPositionX = computed(() => (gameStatus.value === GameStatus.choosePlant ? '-500px' : '-115px'))

const getPlantInstancePosition = ({ clientX, clientY }: MouseEvent) => {
  if (!gameLayoutRect.value) return { left: '0px', top: '0px' }
  const scale = unref(scaleRef)
  const { top, height } = unref(gameLayoutRect) as DOMRect
  // 处理缩放
  const x = Math.round(clientX / scale)
  // 处理边界
  const y = Math.max(Math.min(Math.round((clientY - (top || 0)) / scale), height / scale), 0)
  return {
    left: x + 'px',
    top: y + 'px'
  }
}
const handleMovePlant = (evn: MouseEvent) => {
  const el = unref(plantInstanceRef)
  if (!playerData.value.selectedPlant || !el) return
  const { top, left } = getPlantInstancePosition(evn)
  el.style.top = top
  el.style.left = left
}

onMounted(() => {
  const el = gameLayout.value as HTMLDivElement
  const { clear, scale } = setScaleToResize(el, 900, 600)
  scaleRef.value = scale
  const getRect = () => (gameLayoutRect.value = el.getClientRects()[0])
  getRect()
  window.addEventListener('resize', getRect)
  onDeactivated(() => {
    clear()
    window.removeEventListener('resize', getRect)
  })
})
</script>
<template>
  <div class="full game-layout">
    <div
      ref="gameLayout"
      :style="{ backgroundPositionX: gameContentBGPositionX }"
      class="full game-content"
      @mousemove="handleMovePlant"
    >
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
  user-select: none;
  .game-content {
    background: url('@/assets/images/game-layout-bg.jpg') no-repeat;
    background-size: 1400px 600px;
    transition: all 1s;
  }

  .plant-instance {
    width: 63px;
    height: 70px;
    position: absolute;
    user-select: none;
    transform: translate(-50%, -50%);
    will-change: top, left;
    z-index: 2;
    cursor: grab;
  }
}
</style>
