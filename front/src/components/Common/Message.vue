<template>
    <v-scroll-x-transition>
      <v-alert v-if="text !== ''" :type="type" variant="tonal">
        <div v-html="text"></div>
      </v-alert>
    </v-scroll-x-transition>
</template>

<script lang="ts">
import { computed } from 'vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Message',

  props: {
    text: String,
    type: String,
  },

  setup() {
    
    return {
    };
  }
})
</script>