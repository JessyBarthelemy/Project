<template>
  <main>
    <v-card
      class="mx-auto empty-card card d-flex flex-column align-center pa-6"
      @click="handleClick"
    >
      <div class="flex-grow-1 d-flex align-center">
        <v-icon size="128" class="icon-add">mdi-plus</v-icon>
      </div>

      <v-card-title class="text-center">Ajouter un restaurant</v-card-title>
    </v-card>
  </main>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  onAdd: [];
}>();

const handleClick = () => {
  emit('onAdd');
};
</script>
