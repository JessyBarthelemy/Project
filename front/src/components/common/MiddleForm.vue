<template>
  <v-form :class="['d-flex align-center justify-center full-height', { ['with-background']: withBackground }]" @submit.prevent="">
    <v-container color="primary">
      <v-row justify="center">
        <v-col cols="4">
          <v-card class="mx-auto px-10 py-8" elevation="16">
            <v-card-title class="text-center text-primary">
              {{ title }}
            </v-card-title>

            <Message :type="message?.type" :text="message?.text" />

            <slot />

          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Message from '../../components/common/Message.vue';
import { Message as MessageType } from '../../types/Message';
import { PropType } from 'vue';

export default defineComponent({
  name: 'MiddleForm',
  components: { Message },
  props: {
    message: Object as PropType<MessageType>,
    title: String,
    withBackground: Boolean,
  },
  setup(props) {
    return {withBackground: props.withBackground};
  }
})
</script>