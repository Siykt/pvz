import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Start',
    component: () => import('@/views/gameBegin/index.vue'),
    meta: {
      title: 'PVZ'
    }
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/game/index.vue'),
    meta: {
      title: '开始游戏'
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})
export default router
