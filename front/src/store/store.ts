import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

interface TokenPayload {
    token: string,
}

interface AppState {
    token: string,
}

const store = new Vuex.Store({
    state: {
        token: null,
    },
    mutations: {
        setToken(state: AppState, payload: TokenPayload) {
        state.token = payload.token;
        },
    },
    plugins: [
        createPersistedState({ storage: window.sessionStorage })
      ]
});

export default store;