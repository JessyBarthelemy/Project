<template>
  <RouterView />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import './styles/global.scss';
import { useStore } from './store/store';
import 'vue-toastification/dist/index.css';

const store = useStore();
// eslint-disable-next-line no-unused-vars
const isLoggedIn = computed(() => store.token !== null);
</script>
