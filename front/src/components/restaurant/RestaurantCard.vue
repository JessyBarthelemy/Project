<template>
    <main>
        <v-card class="mx-auto">
            
          <v-img
                class="align-end text-white"
                height="200"
                src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                cover
            >
                <v-card-title>{{title}}</v-card-title>
            </v-img>
            
            <v-card-text>
                <div>{{address}}</div>
                <div>51100 REIMS</div>
            </v-card-text>
        </v-card>
    </main>
  </template>
  
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'RestaurantCard',
    props: {
        title: String,
        address: String,
    },
    setup() {
    },
  })
  </script>
  
  