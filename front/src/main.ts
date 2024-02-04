import { createApp } from 'vue';
// Vuetify
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.min.css';
import 'vuetify/dist/vuetify.min.css';

import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import router from './router';
import App from './App.vue';
import store from './store/store';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        primary: '#6200EE',
        colors: {
          background: '#EAEAEA',
          // surface: '#FFFFFF',
          // primary: '#6200EE',
          // 'primary-darken-1': '#3700B3',
          // secondary: '#03DAC6',
          // 'secondary-darken-1': '#018786',
          // error: '#B00020',
          // info: '#2196F3',
          // success: '#4CAF50',
          // warning: '#FB8C00',
        },
      },
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(vuetify);


app.use(store);
app.mount('#app');
