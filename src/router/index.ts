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
      component: () => import('../views/note/basicCommand.vue')
    },
    {
      path: '/note/refRelated',
      name: 'refRelated',
      component: () => import('../views/note/refRelated.vue')
    },
    {
      path: '/note/reactiveRelated',
      name: 'reactiveRelated',
      component: () => import('../views/note/reactiveRelated.vue')
    },
    {
      path: '/note/toRelated',
      name: 'toRelated',
      component: () => import('../views/note/toRelated.vue')
    },
    {
      path: '/note/computedRelated',
      name: 'computedRelated',
      component: () => import('../views/note/computedRelated.vue')
    },
    {
      path: '/note/mapRelated',
      name: 'mapRelated',
      component: () => import('../views/note/mapRelated.vue')
    },
    {
      path: '/note/watchRelated',
      name: 'watchRelated',
      component: () => import('../views/note/watchRelated.vue')
    },
    {
      path: '/note/watchEffectRelated',
      name: 'watchEffectRelated',
      component: () => import('../views/note/watchEffectRelated.vue')
    },
    {
      path: '/note/parent_child/parentChildComponent',
      name: 'parentChildComponent',
      component: () => import('../views/note/parent_child/parentChildComponent.vue')
    },


    {
      path: '/note/dynamicEvent',
      name: 'dynamicEvent',
      component: () => import('../views/note/template/dynamicEvent.vue')
    },
    {
      path: '/note/vMemo',
      name: 'vMemo',
      component: () => import('../views/note/template/vMemo.vue')
    },
    {
      path: '/note/shoppingCart',
      name: 'shoppingCart',
      component: () => import('../views/note/template/shoppingCart.vue')
    },
    {
      path: '/note/waterFall',
      name: 'waterFall',
      component: () => import('../views/note/template/waterFall/waterFall.vue')
    },

  ],
})

export default router
