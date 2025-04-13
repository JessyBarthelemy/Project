<template>
  <RouterView />
</template>

<script lang="ts">
import { RouterView } from 'vue-router';
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { computed } from 'vue';
import './styles/global.scss';

export default defineComponent({
  name: 'App',
  setup() {
    const store = useStore();
    return {
      isLoggedIn: computed(() => store.state.token !== null),
    }
  }
})
</script>