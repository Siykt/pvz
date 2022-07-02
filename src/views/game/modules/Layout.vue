<script setup lang="ts">
import { ref, onMounted, onDeactivated, computed } from 'vue'
import { setScaleToResize } from '@/utils/setScale'
import { GameStatus, useGameStore } from '@/store/game'
import MenuButton from './MenuButton.vue'

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
      <div class="fc menu">
        <MenuButton>暂停</MenuButton>
        <MenuButton>菜单</MenuButton>
      </div>
      <slot />
    </div>
  </div>
</template>

<style lang="less" scoped>
.game-layout {
  position: relative;
  background: #000;
  .game-content {
    background: url('@/assets/game-layout-bg.jpg') no-repeat;
    background-size: 1400px 600px;
  }

  .menu {
    position: absolute;
    right: 20px;
    top: 20px;
    z-index: 2;
  }
}
</style>
