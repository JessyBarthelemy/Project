<template>
  <v-dialog
    max-width="40vw"
    :model-value="open"
    @click:outside="emit('onClose')"
    @keydown.esc="emit('onClose')"
  >
    <v-card>
      <v-card-title class="text-h6">{{ message }}</v-card-title>
      <v-card-actions>
        <v-spacer />
        <v-btn @click="$emit('onClose')">Annuler</v-btn>
        <v-btn color="red" @click="$emit('onConfirm')">Confirmer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const emit = defineEmits<{
  onClose: [];
  onConfirm: [];
}>();

const { open, message } = defineProps<{
  open: boolean;
  message: string;
}>();
</script>
