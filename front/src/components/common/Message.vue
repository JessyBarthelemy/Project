<template>
  <v-scroll-x-transition>
    <v-alert v-if="text !== ''" :type="type" variant="tonal">
      <div v-html="text" />
    </v-alert>
  </v-scroll-x-transition>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const { text, type } = defineProps<{
  text: string;
  type: string;
}>();
</script>
