<template>
  <main>
    <v-container>
      <h1>Restaurants</h1>
      <v-row>
        <v-col cols="2">
          <RestaurantCard title="ok" address="adresse du restaurant 51100"/>
        </v-col>
        <v-col cols="2">
          <RestaurantCard title="test 2" address="adresse du restaurant 51100"/>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import RestaurantCard from '../../components/restaurant/RestaurantCard.vue';

export default defineComponent({
  name: 'RestaurantList',
  components: { RestaurantCard },
  setup() {
    return {}
  },
})
</script>

