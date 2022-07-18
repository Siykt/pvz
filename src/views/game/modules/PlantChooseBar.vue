<script setup lang="ts">
import { GameStatus, PlayerData, useGameStoreRefs } from '@/store/game'
import Diagram from '@/components/Plant/Diagram.vue'

const { playerData, gameStatus, musicControl } = useGameStoreRefs()

const handleChoosePlant = (plantAndEvent: Required<PlayerData>['selectedPlant']) => {
  if (gameStatus.value === GameStatus.choosePlant) {
    playerData.value.plants = playerData.value.plants.filter(({ key }) => plantAndEvent.key !== key)
    musicControl.value.ChoosePlantToneControl?.replay()
  } else {
    playerData.value.selectedPlant = plantAndEvent
    musicControl.value.PlantToneControl?.replay()
  }
}
</script>
<template>
  <div class="plant-choose-bar">
    <div class="sun-count fc">{{ playerData.sun }}</div>
    <div class="plant-list f">
      <Diagram v-for="(plant, i) in playerData.plants" :key="i" :plant="plant" @click="handleChoosePlant" />
    </div>
  </div>
</template>

<style lang="less" scoped>
.plant-choose-bar {
  position: absolute;
  top: 10px;
  left: 0;
  width: 402px;
  height: 75px;
  background-image: url('@/assets/images/plant-choose-bar-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position-x: -40px;
  user-select: none;
  .sun-count {
    position: absolute;
    left: 20px;
    bottom: 4px;
    width: 50px;
    height: 18px;
    color: #000;
    font-size: 14px;
    // background-color: #000;
  }
  .plant-list {
    padding-left: 79px;
    padding-top: 5px;
  }
}
</style>
