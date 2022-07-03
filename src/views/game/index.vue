<script setup lang="ts">
import { useGameStoreRefs } from '@/store/game'
import { ref } from 'vue'
import Layout from './modules/Layout.vue'
import Music from './modules/Music.vue'
import Menu from './modules/Menu.vue'
import PlantChooseBar from './modules/PlantChooseBar.vue'
import { Plant1, Plant2 } from '@/components/Plant'

const { playerData } = useGameStoreRefs()
const MusicRef = ref<InstanceType<typeof Music>>()
const handleClick = () => {
  // 解决自动播放的问题
  MusicRef.value?.ChoosePlantBGMControl.play()
}

const init = () => {
  playerData.value.plants = [Plant1, Plant2, Plant2, Plant2, Plant2]
}

init()
</script>
<template>
  <div class="full" @click="handleClick">
    <!--  -->
    <Layout>
      <Menu />
      <PlantChooseBar />
    </Layout>
    <!-- 音乐控件 -->
    <Music ref="MusicRef" :auto-play="false" />
  </div>
</template>

<style lang="less" scoped></style>
