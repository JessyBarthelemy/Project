<template>
  <MiddleForm title="INSCRIPTION" :message="message" :with-background="true">
    <v-card-text>
      <v-text-field v-model="user.email" label="Email" hide-details variant="underlined" color="primary" required
        class="mb-2" />

      <v-text-field v-model="user.password" label="Mot de passe" hide-details required variant="underlined" color="primary"
        class="mb-8 py-4" type="password" />

      <v-btn v-on:click="handleSignUp" block color="primary" class="shrink mx-auto">
        Inscription
      </v-btn>
    </v-card-text>

    <div class="login-extra-links">
      <router-link to="/login">Se connecter</router-link>
    </div>
    <GoogleLoginButton />
  </MiddleForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { loginService } from '../../../services/LoginService';
import { User } from '../../../types/user/User';
import './Login.css';
import { ValidationError } from '../../../exceptions/ValidationError';
import Message from '../../../components/common/Message.vue';
import { useMessage } from '../../../hooks/useMessage';
import MiddleForm from '../../../components/common/MiddleForm.vue';
import router from '../../../router';
import { getErrorMessage } from '../../../tools/api';
import GoogleLoginButton from '../../../components/user/GoogleLoginButton.vue';

export default defineComponent({
  name: 'SignUp',
  components: { Message, MiddleForm, GoogleLoginButton },
  setup() {
    const store = useStore();
    const user = ref<User>({ email: null, password: null });
    const { message, updateMessage } = useMessage();

    const handleSignUp = async () => {
      try {
        const { data: { accessToken } } = await loginService.signUp(user.value);
        if (accessToken) {
          store.commit('setToken', { token: accessToken });
          router.replace({ path: '/' })
        }
      }
      catch (e: any) {
        updateMessage({
          type: 'error',
          text: getErrorMessage(e, 'Inscription impossible.')
        });
      }
    }

    return {
      user,
      message,
      handleSignUp,
    }
  },
})
</script>
