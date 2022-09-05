import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'

const JAppleTV = defineAsyncComponent(() => 
  import('./AppleTV').then(({ JAppleTV }) => JAppleTV)
)

const JAppStore = defineAsyncComponent(() => 
  import('./AppStore').then(({ JAppStore }) => JAppStore)
)



const JCalculator = defineAsyncComponent(() => 
  import('./Calculator').then(({ JCalculator }) => JCalculator)
)

const JFinder = defineAsyncComponent(() =>
  import('./Finder').then(({ JFinder }) => JFinder)
)


export default {
  JAppleTV,
  JAppStore,
  JCalculator,
  JFinder,
} as { [key: string]: Component }