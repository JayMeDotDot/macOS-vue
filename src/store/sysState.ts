import { defineStore } from 'pinia'

export const useSysState = defineStore('sysState', {
  state: () => {
    return {
      logged: false
    }
  },

  getters: {
    isLogged(): boolean {
      return this.logged
    }
  },

  actions: {
    login(): void {
      this.logged = true
    },
    logout(): void {
      this.logged = false
    }
  }
})
