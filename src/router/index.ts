import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeSidebar from '../components/home/SideBar.vue'
import VillageSidebar from '../components/village/SideBar.vue'
import VillageView from '@/views/VillageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      components: { default: HomeView, sidebar: HomeSidebar },
    },
    {
      path: '/village/:villageId',
      name: 'village',
      components: { default: VillageView, sidebar: VillageSidebar },
    },
  ],
})

export default router
