<template>
  <main>
    <v-container class="restaurant-header">
      <h1>Restaurants</h1>
    </v-container>

    <v-container>
      <v-row justify="center">
        <v-col cols="2">
          <EmptyCard @onAdd="handleOpenRestaurantDialog" />
        </v-col>
        <v-col v-for="restaurant in restaurants" :key="restaurant.id" cols="2">
          <RestaurantCard
            :restaurant="restaurant"
            :isSelected="restaurant.id === selectedRestaurant?.id"
            @onUpdate="handleOpenRestaurantDialog"
            @onDelete="handleOpenDeleteConfirm"
            @onSelect="handleSelectRestaurant"
          />
        </v-col>
      </v-row>
    </v-container>

    <RestaurantDialog
      v-if="!isNil(selectedRestaurant)"
      :open="isRestaurantDialogOpen"
      :restaurant="selectedRestaurant"
      @onSave="handleSaveRestaurant"
      @onClose="handleRestaurantModalClose"
    />

    <ConfirmDialog
      message="Êtes vous sûr de vouloir supprimer ce restaurant ?"
      title="Suppression"
      :open="isConfirmOpen"
      @onClose="handleCloseConfirm"
      @onConfirm="handleDeleteRestaurant"
    />

    <v-container class="cartes-header">
      <h1>Cartes</h1>
    </v-container>
  </main>
</template>

<script setup lang="ts">
import './RestaurantList.scss';
import RestaurantCard from '../../components/restaurant/RestaurantCard.vue';
import { restaurantService } from '../../services/RestaurantService';
import { ref } from 'vue';
import { Restaurant } from '../../types/restaurant/restaurant';
import { useToast } from 'vue-toastification';
import { getErrorMessage } from '../../tools/api';
import EmptyCard from '../../components/restaurant/EmptyCard.vue';
import RestaurantDialog from '../../components/restaurant/RestaurantDialog/RestaurantDialog.vue';
import { isNil } from 'lodash';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';

const restaurants = ref<Restaurant[]>([]);
const selectedRestaurant = ref<Restaurant | null>(null);
const isRestaurantDialogOpen = ref<boolean>(false);
const isConfirmOpen = ref<boolean>(false);
const toast = useToast();
const fetchRestaurants = async () => {
  try {
    restaurants.value = (await restaurantService.getAll())?.data;
  } catch (e: any) {
    toast.error(getErrorMessage(e, 'Impossible de récupérer les restaurants'));
    restaurants.value = [];
  }
};

const handleOpenRestaurantDialog = (restaurant?: Restaurant) => {
  isRestaurantDialogOpen.value = true;
  if (!restaurant) {
    selectedRestaurant.value = {
      name: 'Restaurant',
      address: {
        city: 'REIMS',
        number: '9',
        postalCode: '51100',
        street: 'rue du burlat',
      }
    };
  } else {
    selectedRestaurant.value = restaurant;
  }
};

const handleRestaurantModalClose = () => {
  isRestaurantDialogOpen.value = false;
};

const handleCreateRestaurant = async (restaurant: Restaurant) => {
  try {
    const createdRestauraunt = (await restaurantService.create(restaurant))?.data;
    selectedRestaurant.value = createdRestauraunt;
    restaurants.value.push(createdRestauraunt);
    handleRestaurantModalClose();
  } catch (e: any) {
    toast.error(getErrorMessage(e, 'Création impossible.'));
    return;
  }
};

const handleUpdateRestaurant = async (restaurant: Restaurant) => {
  try {
    const updatedRestauraunt = (await restaurantService.update(restaurant))?.data;
    selectedRestaurant.value = updatedRestauraunt;
    restaurants.value = restaurants.value.map((r) => (r.id === restaurant.id ? restaurant : r));
    handleRestaurantModalClose();
  } catch (e: any) {
    toast.error(getErrorMessage(e, 'Mise à jour du restaurant impossible.'));
    return;
  }
};

const handleDeleteRestaurant = async () => {
  try {
    const id = selectedRestaurant.value?.id;
    if (!id) {
      return;
    }

    await restaurantService.delete(id);
    selectedRestaurant.value = null;
    restaurants.value = restaurants.value.filter((r) => r.id !== id);
    handleCloseConfirm();
  } catch (e: any) {
    toast.error(getErrorMessage(e, 'Suppression du restaurant impossible.'));
    return;
  }
};

const handleSaveRestaurant = (restaurant: Restaurant) => {
  if (isNil(restaurant.id)) {
    handleCreateRestaurant(restaurant);
  } else {
    handleUpdateRestaurant(restaurant);
  }
};

const handleCloseConfirm = () => {
  isConfirmOpen.value = false;
};

const handleOpenDeleteConfirm = (restaurant: Restaurant) => {
  selectedRestaurant.value = restaurant;
  isConfirmOpen.value = true;
};

const handleSelectRestaurant = (restaurant: Restaurant) => {
  console.log('restaurant', restaurant)
  selectedRestaurant.value = restaurant;
};

fetchRestaurants();
</script>
