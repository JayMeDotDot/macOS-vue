import { defineStore } from "pinia"

import type { AppMenu } from "@/components/Menu"
import type { AppProps } from "@/components/AppBar"

export interface AppMenus {
  [comp: string]: AppMenu[]
}

export interface AppStore {
  appMenus: AppMenus
  appBar: AppProps[],
  activeComp: string,
}

export const useAppStore = defineStore('appStore', {
  state: (): AppStore => {
    return {
      appMenus: {
        desktop: [
          { title: '访达', disabled: false, },
          { title: '文件', disabled: false, }, 
          { title: '编辑', disabled: false, }, 
          { title: '显示', disabled: false, }, 
          { title: '前往', disabled: false, }, 
          { title: '窗口', disabled: false, }, 
          { title: '帮助', disabled: false, },
        ]
      },
      appBar: [
        { name: '访达', iconLocation: 'Finder.webp', comp: 'Finder' },
        { name: 'FaceTime', iconLocation: 'FaceTime.webp', comp: 'FaceTime' },
        { name: '音乐', iconLocation: 'Music.webp', comp: 'Music' },
        { name: 'AppleTV', iconLocation: 'AppTV.webp', comp: 'AppleTV' },
        { name: 'Safari', iconLocation: 'Safari.webp', comp: 'Safari'},
        { name: 'AppStore', iconLocation: 'AppStore.webp', comp: 'AppleStore' },
        { name: '地图', iconLocation: 'Map.webp', comp: 'Map' },
        { name: '计算机', iconLocation: 'Calculator.webp', comp: 'Calculator'},
      ],
      activeComp: 'desktop',
    }
  },

  getters: {
    getAppBar(): AppProps[] {
      return this.appBar
    },
    getActiveAppMenu(): AppMenu[] {
      return this.appMenus[this.activeComp]
    },
    getActiveComp(): string {
      return this.activeComp
    },

  },

  actions: {
    setActiveComp(comp: string) {
      this.activeComp = comp
    },

    mountApp(comp: string, appmenu: AppMenu[]) {
      this.appMenus[comp] = appmenu
      this.activeComp = comp
    },
    unmountApp() {
      this.activeComp = 'desktop'
    },

    mountAppBar(applist: AppProps[]) {
      this.appBar.push(...applist)
    },

  },
})