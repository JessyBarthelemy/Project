import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/user/LoginView.vue';
import ResetPassword from '../views/user/ResetPassword.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: HomeView,
    },
    {
      path: '/user/:id/password/reset',
      name: 'resetPassword',
      component: ResetPassword,
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: HomeView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

export default router;
