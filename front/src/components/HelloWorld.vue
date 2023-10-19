<template>
  <ul v-for="title in titles" :key="title.title">
    <li>{{ title.title }}</li>
  </ul>
  <v-btn @click="handleUpdateRef"> Button </v-btn>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'HelloWorld',
  setup() {
    const titles = ref([{ title: '1' }, { title: '2' }, { title: '3' }, { title: '4' }])

    const handleUpdateRef = () => {
      titles.value.push({
        title: `${titles.value.length}`
      })
    }

    return { titles, handleUpdateRef }
  }
})
</script>
