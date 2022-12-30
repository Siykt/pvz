<script setup lang="ts">
import { ref, onMounted, onDeactivated, computed, unref } from 'vue'
import { setScaleToResize } from '@/utils/setScale'
import { GameStatus, useGameStoreRefs } from '@/store/game'
import { useEventListener } from '@vueuse/core'

const { gameStatus, playerData, musicControl, curEvent } = useGameStoreRefs()

const scaleRef = ref(0)
const gameLayoutRect = ref<DOMRect>()
const gameLayout = ref<HTMLDivElement>()
const plantInstanceRef = ref<HTMLImageElement>()
const gameContentBGPositionX = computed(() => (gameStatus.value === GameStatus.choosePlant ? '-500px' : '-115px'))

/**
 * 计算缩放与边界
 * @param pos Event坐标
 * @param screenDistance 外部盒子屏幕距离参照
 * @param boxSize 外部盒子大小参照
 */
function computeScaleAndBorder(pos: number, screenDistance: number, boxSize: number) {
  const scale = unref(scaleRef)
  // 处理缩放
  let posComputed = Math.round((pos - (screenDistance || 0)) / scale)
  // 处理边界
  posComputed = Math.max(Math.min(posComputed, boxSize / scale), 0)
  return posComputed
}
// 获取植物实例的位置
const getPlantInstancePosition = ({ clientX, clientY }: MouseEvent) => {
  if (!gameLayoutRect.value) return { left: '0px', top: '0px' }
  const { top, height, left, width } = unref(gameLayoutRect) as DOMRect

  // 横轴(X轴)对应外部盒子与屏幕的left距离及其宽度
  const x = computeScaleAndBorder(clientX, left, width)
  // 纵轴(Y轴)对应外部盒子与屏幕的 top 距离及其高度
  const y = computeScaleAndBorder(clientY, top, height)
  return {
    left: x + 'px',
    top: y + 'px'
  }
}
// 处理植物移动
const handleMovePlant = (evn: MouseEvent) => {
  const el = unref(plantInstanceRef)
  if (!playerData.value.selectedPlant || !el) return
  const { top, left } = getPlantInstancePosition(evn)
  el.style.top = top
  el.style.left = left
}
// 棋盘
const handlePlantToChessboard = (evn: MouseEvent) => {
  console.log('evn ->', evn)
}
// 取消植物选择
const handleCannelPlantChoose = () => {
  if (!playerData.value.selectedPlant) return
  playerData.value.selectedPlant = undefined
  musicControl.value.ChoosePlantToneControl?.play()
}
// 获取 gameLayoutRect
const getGameLayoutRect = () => {
  const el = gameLayout.value as HTMLDivElement
  gameLayoutRect.value = el.getClientRects()[0]
}
useEventListener('resize', getGameLayoutRect)
// 监听键位
useEventListener('keydown', ({ code }) => {
  // 监听 Esc 键位退出选择
  if (code === 'Escape') {
    handleCannelPlantChoose()
  }
})
// 处理右键菜单
useEventListener('contextmenu', (evn) => {
  handleCannelPlantChoose()
  evn.preventDefault()
})

onMounted(() => {
  const el = gameLayout.value as HTMLDivElement
  const { clear, scale } = setScaleToResize(el, 900, 600)
  scaleRef.value = scale
  getGameLayoutRect()
  onDeactivated(clear)
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
        v-if="playerData.selectedPlant && curEvent"
        ref="plantInstanceRef"
        class="plant-instance"
        :src="playerData.selectedPlant.diagram"
        :style="getPlantInstancePosition(curEvent)"
        alt="plant-instance"
        @click="handlePlantToChessboard"
      />
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
