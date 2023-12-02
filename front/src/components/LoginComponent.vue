<template>
  <v-form @submit.prevent="">
    <v-container color="primary">
      <v-row justify="center">
        <v-col
          cols="4"
        >
            <v-card
              class="mx-auto px-10 py-8"
              elevation="16"
            >
              <v-card-title class="text-center text-primary">
                CONNEXION
              </v-card-title>

              <v-scroll-x-transition>
                <v-alert :type="error.type" v-if="error.message !== ''" variant="tonal">
                  <div v-html="error.message"></div>
                </v-alert>
              </v-scroll-x-transition>

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
            </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { loginService } from '../services/LoginService';
import {User} from '../types/User';
import './LoginComponent.css';
import { ValidationError } from '../exceptions/ValidationError';

export interface ErrorRef {
  type: "error" | "success",
  message: string,
};

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore();
    const user = ref<User>({email: null, password: null});
    const error = ref<ErrorRef>({type: 'error', message: ''});

    const handleLogin = async () => { 
      try {
        const { data : {accessToken}} = await loginService.login(user.value);
        if (accessToken) {
          store.commit('setToken', {token: accessToken});
        }
      } 
      catch(e : any) {
        error.value.type = 'error';
        if(e instanceof ValidationError) {
          error.value.message = e.message;
        } else {
          error.value.message = 'Connexion impossible. <br> Veuillez vérifier vos informations de connexion';
        }
      }
    }

    const handlePasswordReset = async (e) => {
      e.preventDefault();
      try {
        await loginService.resetPassword(user.value.email);
      } catch(e : any) {
        error.value.type = 'error';
        if(e instanceof ValidationError) {
          error.value.message = e.message;
        }
      }
    }

    return {
      user,
      handleLogin,
      handlePasswordReset,
      error,
    }
  }
})
</script>
