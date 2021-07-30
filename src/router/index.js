import { createRouter, createWebHistory } from 'vue-router'
import single from '../views/single.vue'
import double from '../views/double.vue'

const routes = [
  {
    path: '/border',
    name: 'Border',
    component: single
  },
  {
    path: '/double',
    name: 'Double',
    component:double
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
