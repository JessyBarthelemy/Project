<template>
  <v-container>
    <v-data-table
      :items="carteList"
      class="elevation-1"
      hide-default-header
      hide-default-footer
      :headers="headers"
      @click:row="handleCarteSelect"
    />
  </v-container>
</template>

<script setup lang="ts">
import { Carte } from '@/types/restaurant/carte';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const headers = [{ text: 'Nom', value: 'name' }];
const router = useRouter();

const { cartes } = defineProps<{
  cartes: Carte[];
}>();

const carteList = computed(() => [{ id: -1, name: 'Ajouter une carte' }, ...cartes]);

const handleCarteSelect = (e, carte: any) => {
  router.push(carte?.item?.id === -1 ? `/cartes/new` : `/cartes/${carte?.item?.id}`);
};
</script>
