import axios from 'axios';
import { useStore } from '../store/store';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL
});

api.interceptors.request.use(
  (config) => {
    const authStore = useStore();

    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
