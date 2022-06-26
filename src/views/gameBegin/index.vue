<script setup lang="ts">
import { ref, onMounted, onDeactivated } from 'vue'
import { setScaleToResize } from '@/utils/setScale'
import { useRouter } from 'vue-router'

const router = useRouter()
const playGame = () => {
  router.push('/game')
}

const content = ref<HTMLDivElement>()
let clear: () => void
onMounted(() => (clear = setScaleToResize(content.value as HTMLDivElement, 800, 600)))
onDeactivated(() => clear && clear())
</script>
<template>
  <div class="container">
    <div ref="content" class="content">
      <div class="start-box">
        <div class="start-box-btn" @click="playGame" />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  background: #000;

  .content {
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .start-box {
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url('@/assets/start-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .start-box-btn {
    position: absolute;
    width: 320px;
    height: 60px;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    cursor: pointer;
  }
}
</style>
