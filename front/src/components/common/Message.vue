<template>
    <v-scroll-x-transition>
      <v-alert v-if="text !== ''" :type="type" variant="tonal">
        <div v-html="text"></div>
      </v-alert>
    </v-scroll-x-transition>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { computed } from 'vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Message',

  props: {
    text: String as PropType<string>,
    type: String as PropType<string>,
  },

  setup() {
    
    return {
    };
  }
})
</script>