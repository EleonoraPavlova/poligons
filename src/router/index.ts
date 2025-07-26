import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeSidebar from '../components/home/SideBar.vue'
import VillageSidebar from '../components/village/SideBarVillage.vue'
import VillageView from '@/views/VillageView.vue'
import { ROUTES } from '@/router/routers.ts'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: ROUTES.HOME.path,
      name: ROUTES.HOME.name,
      components: { default: HomeView, sidebar: HomeSidebar },
    },
    {
      path: ROUTES.VILLAGE.path,
      name: ROUTES.VILLAGE.name,
      components: { default: VillageView, sidebar: VillageSidebar },
    },
  ],
})

export default router
