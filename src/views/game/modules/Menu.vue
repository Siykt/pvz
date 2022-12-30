<script setup lang="ts">
import { GameStatus, useGameStoreRefs } from '@/store/game'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import MenuButton from './MenuButton.vue'

const { gameStatus, isPause, isDisabledMusic, isAutoCollectingSun, musicControl, playerData } = useGameStoreRefs()
const router = useRouter()

const playButtonClickTone = () => musicControl.value?.ButtonClickToneControl?.replay()

const showDialog = ref(false)
const handleShowMenu = () => {
  showDialog.value = isPause.value = true
  musicControl.value?.PauseToneControl?.replay()
}
const handleContinueGame = () => {
  isPause.value = showDialog.value = false
  playButtonClickTone()
}
const handleReplay = () => {
  gameStatus.value = GameStatus.choosePlant
  playerData.value.plants = []
  handleContinueGame()
}
const handleToGameBegin = () => {
  router.push('/')
}
const handleDisabledMusic = () => {
  isDisabledMusic.value = !isDisabledMusic.value
  if (!isDisabledMusic.value && musicControl.value?.ButtonClickToneControl) {
    musicControl.value.ButtonClickToneControl.disabled = false
    playButtonClickTone()
  }
}
const handleChangeAutoCollectingSun = () => {
  isAutoCollectingSun.value = !isAutoCollectingSun.value
  playButtonClickTone()
}
</script>
<template>
  <div class="fc menu">
    <MenuButton @click="handleShowMenu">菜单</MenuButton>
  </div>
  <transition name="fade">
    <div v-show="showDialog" class="menu-dialog fc full">
      <img class="menu-dialog-bg" src="@/assets/images/menu-dialog-bg.png" alt="menu-dialog-bg" />
      <div class="menu-dialog-content fcsb">
        <div class="menu-dialog-options fcc">
          <MenuButton class="btn" @click="handleReplay">重新开始</MenuButton>
          <MenuButton class="btn" @click="handleToGameBegin">返回菜单</MenuButton>
          <!-- 开启/关闭音乐 -->
          <MenuButton class="btn" @click="handleDisabledMusic">{{ isDisabledMusic ? '开启' : '关闭' }}音乐</MenuButton>
          <!-- 开启/关闭自动收集阳光 -->
          <MenuButton class="btn" @click="handleChangeAutoCollectingSun">
            {{ isAutoCollectingSun ? '关闭' : '开启' }}自动收集阳光
          </MenuButton>
        </div>
        <MenuButton class="btn" @click="handleContinueGame">继续游戏</MenuButton>
      </div>
    </div>
  </transition>
</template>

<style lang="less" scoped>
.menu {
  position: absolute;
  right: 20px;
  top: 20px;
  z-index: 2;
  .mr-2 {
    margin-right: 2px;
  }
}
.menu-dialog {
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9;
  &-bg {
    position: absolute;
    width: 412px;
    height: 483px;
    z-index: 1;
  }
  &-content {
    position: relative;
    width: 250px;
    height: 483px;
    z-index: 2;
    padding: 120px 0 20px;
    box-sizing: border-box;
  }
  .menu-dialog-options {
    width: 80%;
    .btn {
      margin-bottom: 6px;
      height: 50px;
      font-size: 17px;
    }
  }
  .btn {
    width: 100%;
    height: 65px;
    font-size: 20px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
