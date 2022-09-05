import { defineStore } from 'pinia'

interface Password {
  [comp: string]: string
}

export const usePassword = defineStore('password', {
  state: (): Password => {
    return {
      login: '123456',
    }
  },

  getters: {
    getLoginPassword(): string {
      return this.loginPW
    }
  },

  actions: {
    checkpassword(pw: string, name: string): boolean {
      return this[name] === pw
    },
    setpassword(pw:string, name: string): void {
      this[name] = pw
    },
  }
})