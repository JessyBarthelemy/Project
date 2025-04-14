<template>
  <div class='google-button'>
    <GoogleLogin :callback="handleLogin" prompt auto-login />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { GoogleLogin } from 'vue3-google-login';
import { loginService } from '../../services/LoginService';
import { useStore } from 'vuex';
import router from '../../router';


export default defineComponent({
  components: {GoogleLogin},
  setup() {
    const store = useStore();
    const handleLogin = async ({credential}) => {
      const { data: { accessToken } } = await loginService.loginWithGoogle(credential);

      if (accessToken) {
        store.commit('setToken', { token: accessToken });
        router.replace({ path: '/' })
      }
    };

    return {
      handleLogin,
    }
  }
})
</script>

