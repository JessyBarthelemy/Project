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

      <v-btn block color="primary" class="shrink mx-auto" @click="handleReset"> Valider </v-btn>
    </v-card-text>
  </MiddleForm>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ResetPassword } from '../../types/user/ResetPassword';
import { loginService } from '../../services/LoginService';
import { ValidationError } from '../../exceptions/ValidationError';
import { useMessage } from '../../hooks/useMessage';
import MiddleForm from '../../components/common/MiddleForm.vue';

const resetPassword = ref<ResetPassword>({ password: null, confirmPassword: null });
const { message, updateMessage } = useMessage();

const handleReset = async (e: Event) => {
  e.preventDefault();
  try {
    await loginService.resetPassword(resetPassword.value);

    updateMessage({
      type: 'success',
      text: 'Mot de passe mis à jour.'
    });
  } catch (e: any) {
    if (e instanceof ValidationError) {
      updateMessage({
        type: 'error',
        text: e.message
      });
    } else {
      updateMessage({
        type: 'error',
        text: 'Une erreur est survenue'
      });
    }
  }
};
</script>
