import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import GuidePage from '../pages/GuidePage.vue'
import ComponentsPage from '../pages/ComponentsPage.vue'
import ThemePage from '../pages/ThemePage.vue'
import RoadmapPage from '../pages/RoadmapPage.vue'

export const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/guide',
      name: 'guide',
      component: GuidePage,
    },
    {
      path: '/components',
      name: 'components',
      component: ComponentsPage,
    },
    {
      path: '/theme',
      name: 'theme',
      component: ThemePage,
    },
    {
      path: '/roadmap',
      name: 'roadmap',
      component: RoadmapPage,
    },
  ],
})
