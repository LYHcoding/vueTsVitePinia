import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/note/basicCommand',
      name: 'basicCommand',
      component: () => import('../views/Note.vue/basicCommand.vue')
    },
    {
      path: '/note/dynamicEvent',
      name: 'dynamicEvent',
      component: () => import('../views/Note.vue/dynamicEvent.vue')
    },
    {
      path: '/note/vMemo',
      name: 'vMemo',
      component: () => import('../views/Note.vue/vMemo.vue')
    },
  ],
})

export default router
