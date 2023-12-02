<template>
  <header>
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/login">Connexion</router-link>
      <router-link v-if="isLoggedIn" to="/restaurants">Restaurants</router-link>
    </nav>
  </header>

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