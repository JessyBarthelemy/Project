<template>
  <MiddleForm title="INSCRIPTION" :message="message" :with-background="true">
    <v-card-text>
      <v-text-field
        v-model="user.email"
        label="Email"
        hide-details
        variant="underlined"
        color="primary"
        required
        class="mb-2"
      />

      <v-text-field
        v-model="user.password"
        label="Mot de passe"
        hide-details
        required
        variant="underlined"
        color="primary"
        class="mb-8 py-4"
        type="password"
      />

      <v-btn block type="submit" color="primary" class="shrink mx-auto" @click="handleSignUp">
        Inscription
      </v-btn>
    </v-card-text>

    <div class="login-extra-links">
      <router-link to="/login">Se connecter</router-link>
    </div>
    <GoogleLoginButton />
  </MiddleForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { loginService } from '../../../services/LoginService';
import { User } from '../../../types/user/User';
import './Login.css';
import { useMessage } from '../../../hooks/useMessage';
import MiddleForm from '../../../components/common/MiddleForm.vue';
import router from '../../../router';
import { getErrorMessage } from '../../../tools/api';
import GoogleLoginButton from '../../../components/user/GoogleLoginButton.vue';
import { useStore } from '../../../store/store';

const user = ref<User>({ email: null, password: null });
const { message, updateMessage } = useMessage();
const store = useStore();

const handleSignUp = async () => {
  try {
    await loginService.signUp(user.value);
    const {
      data: { accessToken }
    } = await loginService.login(user.value);

    if (accessToken) {
      store.setToken(accessToken);
      router.replace({ path: '/' });
    }
  } catch (e: any) {
    updateMessage({
      type: 'error',
      text: getErrorMessage(e, 'Inscription impossible.')
    });
  }
};
</script>
