<template>
  <main>
    <v-card class="mx-auto card">
      <div
        class="card-image"
        :style="{
          backgroundImage: `url(${restaurant?.profilImage ? '/api/images/' + restaurant.profilImage : '/background.png'})`
        }"
      >
        <div class="card-actions">
          <v-icon icon="mdi-pencil" color="white" @click="emit('onUpdate', restaurant)" />
          <v-icon icon="mdi-delete" color="white" @click="emit('onDelete', restaurant)" />
        </div>
      </div>
      <v-card-title>{{ restaurant.name }}</v-card-title>

      <v-card-text>
        <div>{{ restaurant.address.number }} {{ restaurant.address.street }}</div>
        <div>{{ restaurant.address.postalCode }} {{ restaurant.address.city }}</div>
      </v-card-text>
    </v-card>
  </main>
</template>

<script setup lang="ts">
import type { Restaurant } from '../../types/restaurant/restaurant';

const { restaurant } = defineProps<{
  restaurant: Restaurant;
}>();

const emit = defineEmits<{
  onUpdate: [Restaurant];
  onDelete: [Restaurant];
}>();
</script>
