<script setup lang="ts">
import { useScaleAndOpacityPlayAnimation } from '@/hooks/useClickAnimation'
import { onMounted, ref } from 'vue'

const menuBtnRef = ref<HTMLButtonElement>()

onMounted(() => useScaleAndOpacityPlayAnimation(menuBtnRef.value as HTMLButtonElement))

const emits = defineEmits(['click'])
</script>
<template>
  <button ref="menuBtnRef" class="menu-btn" @click="emits('click', $event)"><slot /></button>
</template>

<style lang="less" scoped>
.menu-btn {
  margin-left: 3px;
  width: 113px;
  height: 41px;
  color: #00cb08;
  font-weight: bold;
  opacity: 1;
  border: 0;
  cursor: pointer;
  user-select: none;
  background: no-repeat url('@/assets/images/menu-button.png');
  background-size: 100% 100%;
}
</style>
