import { createWebHistory, createRouter } from 'vue-router'

import AppointmentsView from './pages/appointments/AppointmentsView.vue';

const routes = [
  { 
    path: '/',
    component: AppointmentsView,
    meta: {
      title: 'My Appointments',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  document.title = to.meta?.title as string ?? 'App Title'
})

export default router;