<script setup lang="ts">
import { PlayerData } from '@/store/game'
import type { Plant } from '@/types/plant.d'

interface Props {
  plant: Plant
  disabled?: boolean
}

interface Emits {
  (event: 'click', plantAndEvent: Required<PlayerData>['selectedPlant']): void
}

defineProps<Props>()
const emits = defineEmits<Emits>()
</script>
<template>
  <div class="diagram fc" @click="!disabled && emits('click', { ...plant, event: $event })">
    <img class="full absolute" src="@/assets/images/plants/diagram-bg.png" />
    <img class="plant-diagram" :src="plant.diagram" alt="plant-diagram" />
    <img class="full absolute" src="@/assets/images/plants/diagram-layout.png" alt="diagram-layout" />
    <span class="absolute sun">{{ plant.sun }}</span>
    <div v-show="disabled" class="full diagram-disabled" />
  </div>
</template>

<style lang="less" scoped>
.diagram {
  position: relative;
  width: 48px;
  height: 64px;
  cursor: pointer;
  user-select: none;
  &-disabled {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.6);
  }
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
