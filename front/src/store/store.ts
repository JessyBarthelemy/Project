import { defineStore } from 'pinia';

export const useStore = defineStore('auth', {
    state: () => ({
        token: null as string | null,
    }),
    actions: {
        setToken(token: string) {
            this.token = token;
        },
    },
    persist: {
        // eslint-disable-next-line no-undef
        storage: sessionStorage,
    },
});