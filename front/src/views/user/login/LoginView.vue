<template>
  <MiddleForm title="CONNEXION" :message="message" :withBackground="true">
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

      <v-btn type="submit" block color="primary" class="shrink mx-auto" @click="handleLogin">
        Connexion
      </v-btn>
    </v-card-text>

    <div class="login-extra-links">
      <router-link to="/signup">Pas de compte ? S'inscrire</router-link>
      <a href="#" @click="handlePasswordReset">Mot de passe oublié</a>
    </div>
    <GoogleLoginButton />
  </MiddleForm>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { loginService } from '../../../services/LoginService';
import { User } from '../../../types/user/User';
import './Login.css';
import { ValidationError } from '../../../exceptions/ValidationError';
import { useMessage } from '../../../hooks/useMessage';
import MiddleForm from '../../../components/common/MiddleForm.vue';
import router from '../../../router';
import { getErrorMessage } from '../../../tools/api';
import GoogleLoginButton from '../../../components/user/GoogleLoginButton.vue';
import { useStore } from '../../../store/store';

// Déclaration des références réactives
const user = ref<User>({ email: null, password: null });
const { message, updateMessage } = useMessage();
const store = useStore();

// Fonction de gestion de la connexion
const handleLogin = async () => {
  try {
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
      text: getErrorMessage(
        e,
        'Connexion impossible. <br> Veuillez vérifier vos informations de connexion'
      )
    });
  }
};

// Fonction de gestion de la réinitialisation du mot de passe
const handlePasswordReset = async (e: Event) => {
  e.preventDefault();
  try {
    await loginService.requestResetPassword(user.value.email);
    message.value.type = 'success';
    message.value.text = 'Demande effectuée. Un email a été envoyé.';
  } catch (e: any) {
    message.value.type = 'error';
    if (e instanceof ValidationError) {
      message.value.text = e.message;
    }
  }
};
</script>
