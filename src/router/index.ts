import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Start',
    component: () => import('@/views/gameBegin/index.vue'),
    meta: {
      title: 'PVZ'
    }
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})
export default router
