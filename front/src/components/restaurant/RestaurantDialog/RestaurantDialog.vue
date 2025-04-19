<template>
  <v-dialog :model-value="open" @click:outside="emit('onClose')" @keydown.esc="emit('onClose')">
    <v-card class="restaurant-dialog mx-auto">
      <v-card-title class="text-h6">Ajouter un restaurant</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="restaurant.name"
          label="Nom"
          variant="underlined"
          color="primary"
          required
          class="mb-2"
        />

        <v-row dense>
          <v-col cols="2">
            <v-text-field
              v-model="restaurant.address.number"
              label="Numéro"
              variant="underlined"
              color="primary"
              class="mb-2"
            />
          </v-col>
          <v-col cols="10">
            <v-text-field
              v-model="restaurant.address.street"
              label="Rue"
              variant="underlined"
              color="primary"
              class="mb-2"
            />
          </v-col>
        </v-row>

        <v-text-field
          v-model="restaurant.address.postalCode"
          label="Code postal"
          variant="underlined"
          color="primary"
          class="mb-2"
        />

        <v-text-field
          v-model="restaurant.address.city"
          label="Ville"
          variant="underlined"
          color="primary"
          class="mb-2"
        />

        <v-file-input
          label="Choisir une image"
          accept="image/*"
          prepend-icon="mdi-camera"
          show-size
          outlined
          @change="onFileChange"
        />
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn text @click="emit('onClose')">Annuler</v-btn>
        <v-btn color="primary" @click="handleSubmit">Valider</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { Restaurant } from '../../../types/restaurant/restaurant';
import './RestaurantDialog.css';

const { open, restaurant } = defineProps<{
  open: boolean;
  restaurant: Restaurant;
}>();

const emit = defineEmits<{
  onClose: [];
  onSave: [Restaurant];
}>();

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      restaurant.profilImage = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleSubmit = () => {
  emit('onSave', restaurant);
};
</script>
