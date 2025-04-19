import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/user/login/LoginView.vue';
import ResetPassword from '../views/user/ResetPassword.vue';
import RestaurantsListView from '../views/restaurant/RestaurantsListView.vue';
import { useStore } from '../store/store';
import SignUp from '@/views/user/login/SignUp.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: () => {
        const store = useStore();
        return store.token ? '/restaurants' : '/login';
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/user/:id/password/reset',
      name: 'resetPassword',
      component: ResetPassword
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: RestaurantsListView,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to) => {
  const store = useStore();
  if (to.meta.requiresAuth && store.token === null) {
    return {
      path: '/login',
      query: { redirect: to.fullPath }
    };
  }

  return true;
});

export default router;
