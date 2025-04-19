<template>
  <div class="google-button">
    <GoogleLogin :callback="handleLogin" prompt auto-login />
  </div>
</template>

<script setup lang="ts">
import { GoogleLogin } from 'vue3-google-login';
import { loginService } from '../../services/LoginService';
import router from '../../router';
import { useStore } from '../../store/store';

const store = useStore();

const handleLogin = async ({ credential }: { credential: string }) => {
  const {
    data: { accessToken }
  } = await loginService.loginWithGoogle(credential);

  if (accessToken) {
    store.setToken(accessToken);
    router.replace({ path: '/' });
  }
};
</script>
