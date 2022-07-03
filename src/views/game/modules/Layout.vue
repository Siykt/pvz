<script setup lang="ts">
import { ref, onMounted, onDeactivated, computed } from 'vue'
import { setScaleToResize } from '@/utils/setScale'
import { GameStatus, useGameStore } from '@/store/game'

const gameLayout = ref<HTMLDivElement>()
let clear: () => void
onMounted(() => (clear = setScaleToResize(gameLayout.value as HTMLDivElement, 900, 600)))
onDeactivated(() => clear && clear())

const gameStore = useGameStore()

const gameContentBGPositionX = computed(() => (gameStore.gameStatus === GameStatus.choosePlant ? '-500px' : '-115px'))
</script>
<template>
  <div class="full game-layout">
    <div ref="gameLayout" :style="{ backgroundPositionX: gameContentBGPositionX }" class="full game-content">
      <slot />
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
}
</style>
