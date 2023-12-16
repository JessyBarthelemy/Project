<template>
  <MiddleForm title="NOUVEAU MOT DE PASSE" :message="message">
    <v-card-text>
      <v-text-field
        v-model="resetPassword.password"
        label="Mot de passe"
        hide-details
        variant="underlined"
        color="primary"
        required
        class="mb-2"
        type="password"
      />

      <v-text-field
        v-model="resetPassword.confirmPassword"
        label="Confirmation"
        hide-details
        required
        variant="underlined"
        color="primary"
        class="mb-8 py-4"
        type="password"
      />

      <v-btn
        v-on:click="handleReset"
        block
        color="primary"
        class="shrink mx-auto"
      >
        Valider
      </v-btn>
    </v-card-text>
  </MiddleForm>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ResetPassword } from '../../../types/user/ResetPassword';
import { loginService } from '../../../services/LoginService';
import { ValidationError } from '../../../exceptions/ValidationError';
import { useMessage } from '../../../hooks/useMessage';
import MiddleForm from '../../Common/MiddleForm.vue';

export default defineComponent({
  name: 'ResetPassword',
  components: {MiddleForm},
  setup() {
    const resetPassword = ref<ResetPassword>({password: null, confirmPassword: null});
    const {message, updateMessage} = useMessage();
    
    const handleReset = async (e) => {
      e.preventDefault();
      try {
        await loginService.resetPassword(resetPassword.value);
        
        updateMessage({
          type: 'success',
          text: 'Mot de passe mis à jour.',
        });
      } catch(e : any) {
        if(e instanceof ValidationError) {
          updateMessage({
            type: 'error',
            text: e.message,
          });
        } else {
          updateMessage({
            type: 'error',
            text: 'Une erreur est survenue',
          });
        }
      }
    }

    return {
      resetPassword,
      handleReset,
      message,
    }
  }
})
</script>
