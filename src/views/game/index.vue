<script setup lang="ts">
import { GameStatus, useGameStoreRefs } from '@/store/game'
import { ref } from 'vue'
import Layout from './modules/Layout.vue'
import Music from './modules/Music.vue'
import Menu from './modules/Menu.vue'
import PlantChooseBar from './modules/PlantChooseBar.vue'
import PlantChooseCard from './modules/PlantChooseCard.vue'

const { gameStatus } = useGameStoreRefs()
const MusicRef = ref<InstanceType<typeof Music>>()
</script>
<template>
  <div class="full">
    <!--  -->
    <Layout>
      <Menu />
      <PlantChooseBar />
      <PlantChooseCard v-if="gameStatus === GameStatus.choosePlant" />
    </Layout>
    <!-- 音乐控件 -->
    <Music ref="MusicRef" auto-play />
  </div>
</template>

<style lang="less" scoped></style>
