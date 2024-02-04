import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/user/login/LoginView.vue';
import ResetPassword from '../views/user/ResetPassword.vue';
import RestaurantsListView from '../views/restaurant/RestaurantsListView.vue';
import store from '../store/store';

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
      component: RestaurantsListView,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from) => {
  console.log('bedore each', store.state.token); 
  if (to.meta.requiresAuth && store.state.token === null) {
    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router;
