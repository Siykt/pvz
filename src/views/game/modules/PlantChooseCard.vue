<script setup lang="ts">
import { GameStatus, useGameStoreRefs } from '@/store/game'
import Diagram from '@/components/Plant/Diagram.vue'
import { AllPlantMap } from '@/constants/plant'
import { Plant } from '@/types/plant.d'
import { computed, onMounted, ref, watch } from 'vue'
import { difference } from 'lodash'
import { useScaleAndOpacityPlayAnimation } from '@/hooks/useClickAnimation'

const { playerData, musicControl, gameStatus } = useGameStoreRefs()
const isChoosePlantMap = ref<{ [x: Plant['key']]: boolean }>({})
const startBtnRef = ref<HTMLElement>()

const isUpperLimit = computed(() => playerData.value.plantLimit === playerData.value.plants.length)

const handleChoosePlant = (plant: Plant) => {
  if (isUpperLimit.value) return
  isChoosePlantMap.value = {
    ...isChoosePlantMap.value,
    [plant.key]: true
  }
  playerData.value.plants = playerData.value.plants.concat(plant)
  musicControl.value.ChoosePlantToneControl?.replay()
}
const handleGameStart = () => {
  gameStatus.value = GameStatus.playing
}

watch<Plant[]>(
  () => playerData.value.plants,
  (plants, oldPlants) => {
    if (plants.length < oldPlants.length) {
      const plant = difference(oldPlants, plants)
      plant.forEach(({ key }) => delete isChoosePlantMap.value[key])
    }
  }
)

onMounted(() => useScaleAndOpacityPlayAnimation(startBtnRef.value as HTMLElement))
</script>
<template>
  <div class="plant-choose-card fcc">
    <div class="title">选择你的卡片</div>
    <div class="plant-list f">
      <Diagram
        v-for="(plant, i) in AllPlantMap"
        :key="i"
        class="plant-choose-card-plant"
        :plant="plant"
        :disabled="isChoosePlantMap[plant.key]"
        @click="handleChoosePlant"
      />
    </div>
    <button ref="startBtnRef" class="start-btn" @click="handleGameStart">一起摇滚吧 !</button>
  </div>
</template>

<style lang="less" scoped>
.plant-choose-card {
  width: 378px;
  height: 450px;
  margin-top: 100px;
  margin-left: 10px;
  padding: 0 14px 15px;
  background-image: url('@/assets/images/plant-chooser-card-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  user-select: none;
  .title {
    text-align: center;
    line-height: 26px;
    height: 26px;
    font-size: 14px;
    color: #fc6;
    width: 100%;
    font-weight: bold;
    margin-bottom: 6px;
  }
  .plant-list {
    width: 100%;
    flex-wrap: wrap;
    margin-bottom: auto;
    .plant-choose-card-plant {
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }
  .start-btn {
    width: 130px;
    height: 30px;
    border: 0;
    background-color: #9c481c;
    color: #fc6;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
    border-radius: 3px;
    box-shadow: 0px 1px 0px 1px #462e21;
  }
}
</style>
