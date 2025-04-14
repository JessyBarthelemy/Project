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
import GoogleLogin from 'vue3-google-login';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    themes: {
      light: {
        primary: '#6200EE',
        colors: {
          background: '#EAEAEA',
        },
      },
    },
  },
});

const app = createApp(App);

app.use(router);
app.use(vuetify);

app.use(GoogleLogin, { clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID, });

app.use(store);
app.mount('#app');
