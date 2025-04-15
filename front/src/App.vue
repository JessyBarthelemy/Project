<template>
  <RouterView />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { computed } from 'vue';
import './styles/global.scss';
import { useStore } from './store/store';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    return {
      isLoggedIn: computed(() => store.token !== null),
    }
  }
})
</script>