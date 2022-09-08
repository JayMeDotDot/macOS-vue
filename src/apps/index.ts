import { defineAsyncComponent } from 'vue'
import type { Component } from 'vue'

const JAppleTV = defineAsyncComponent(() => 
  import('./AppleTV').then(({ JAppleTV }) => JAppleTV)
)

const JAppStore = defineAsyncComponent(() => 
  import('./AppStore').then(({ JAppStore }) => JAppStore)
)

const JBook = defineAsyncComponent(() => 
  import('./Book').then(({ JBook }) => JBook)
)

const JCalculator = defineAsyncComponent(() => 
  import('./Calculator').then(({ JCalculator }) => JCalculator)
)

const JFaceTime = defineAsyncComponent(() =>
  import('./FaceTime').then(({ JFaceTime }) => JFaceTime)
)

const JFinder = defineAsyncComponent(() =>
  import('./Finder').then(({ JFinder }) => JFinder)
)

const JMap = defineAsyncComponent(() =>
  import('./Map').then(({ JMap }) => JMap)
)

const JMusic = defineAsyncComponent(() =>
  import('./Music').then(({ JMusic }) => JMusic)
)

const JSafari = defineAsyncComponent(() =>
  import('./Safari').then(({ JSafari }) => JSafari)
)

const JWeather = defineAsyncComponent(() =>
  import('./Weather').then(({ JWeather }) => JWeather)
)

export default {
  JAppleTV,
  JAppStore,
  JBook,
  JCalculator,
  JFaceTime,
  JFinder,
  JMap,
  JMusic,
  JSafari,
  JWeather,
} as { [key: string]: Component }