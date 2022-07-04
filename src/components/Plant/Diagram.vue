<script setup lang="ts">
import type { Plant } from '@/types/plant.d'

interface Props {
  plant: Plant
}

interface Emits {
  (event: 'click', plant: Plant): void
}

defineProps<Props>()
const emits = defineEmits<Emits>()
</script>
<template>
  <div class="diagram fc" @click="emits('click', plant)">
    <img class="full absolute" src="@/assets/images/plants/diagram-bg.png">
    <img class="plant-diagram" :src="plant.diagram" alt="plant-diagram">
    <img class="full absolute" src="@/assets/images/plants/diagram-layout.png" alt="diagram-layout">
    <span class="absolute sun">{{ plant.sun }}</span>
  </div>
</template>

<style lang="less" scoped>
.diagram {
  position: relative;
  width: 48px;
  height: 64px;
  cursor: pointer;
  user-select: none;
  .absolute {
    position: absolute;
    top: 0;
    left: 0;
  }
  .plant-diagram {
    position: absolute;
    top: 9px;
    left: 7px;
    width: 35px;
  }
  .sun {
    top: unset;
    bottom: 2px;
    text-align: right;
    width: calc(100% - 20px);
    font-size: 12px;
  }
}
</style>
