<script setup lang="ts">
import { useGameStoreRefs } from '@/store/game'
import Diagram from '@/components/Plant/Diagram.vue'
import { AllPlantMap } from '@/constants/plant'
import { Plant } from '@/types/plant.d'
import { ref, watch } from 'vue'
import { difference } from 'lodash'

const { playerData } = useGameStoreRefs()
const isChoosePlantMap = ref<{ [x: Plant['key']]: boolean }>({})

const handleChoosePlant = (plant: Plant) => {
  if (!isChoosePlantMap.value[plant.key]) {
    isChoosePlantMap.value = {
      ...isChoosePlantMap.value,
      [plant.key]: true
    }
    playerData.value.plants = playerData.value.plants.concat(plant)
  }
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
</script>
<template>
  <div class="plant-choose-card">
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
  </div>
</template>

<style lang="less" scoped>
.plant-choose-card {
  width: 378px;
  height: 450px;
  margin-top: 100px;
  margin-left: 10px;
  padding: 0 14px;
  background-image: url('@/assets/images/plant-chooser-card-bg.png');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
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
    .plant-choose-card-plant {
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }
}
</style>
