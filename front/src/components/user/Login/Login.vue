<template>
  <MiddleForm title="CONNEXION" :message="message">
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
        label="Password"
        hide-details
        required
        variant="underlined"
        color="primary"
        class="mb-8 py-4"
        type="password"
      />

      <v-btn
        v-on:click="handleLogin"
        block
        color="primary"
        class="shrink mx-auto"
      >
        Connexion
      </v-btn>
    </v-card-text>

    <div class="text-right">
      <a href='#' v-on:click="handlePasswordReset">Mot de passe oublié</a>
    </div>
  </MiddleForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { loginService } from '../../../services/LoginService';
import {User} from '../../../types/user/User';
import './Login.css';
import { ValidationError } from '../../../exceptions/ValidationError';
import Message from '../../Common/Message.vue';
import { useMessage } from '../../../hooks/useMessage';
import MiddleForm from '../../Common/MiddleForm.vue';
import router from '../../../router';

export default defineComponent({
  name: 'Login',
  components: { Message, MiddleForm },
  setup() {
    const store = useStore();
    const user = ref<User>({email: null, password: null});
    
    const {message, updateMessage} = useMessage();
    const handleLogin = async () => { 
      try {
        const { data : {accessToken}} = await loginService.login(user.value);
        if (accessToken) {
          store.commit('setToken', {token: accessToken});
          router.replace({ path: '/restaurants' })
        }
      } 
      catch(e : any) {
        if(e instanceof ValidationError) {
          updateMessage({
            type: 'error',
            text: e.message,
          });
        } else {
          updateMessage({
            type: 'error',
            text: 'Connexion impossible. <br> Veuillez vérifier vos informations de connexion',
          });
        }
      }
    }

    const handlePasswordReset = async (e) => {
      e.preventDefault();
      try {
        await loginService.requestResetPassword(user.value.email);
        message.value.type = 'success';
        message.value.text = 'Demande effectuée. Un email a été envoyé.';
      } catch(e : any) {
        message.value.type = 'error';
        if(e instanceof ValidationError) {
          message.value.text = e.message;
        }
      }
    }
    
    return {
      user,
      handleLogin,
      handlePasswordReset,
      message,
    }
  },
})
</script>
