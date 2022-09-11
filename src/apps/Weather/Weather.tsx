import { defineComponent, inject, onMounted } from 'vue'
import type { ExtractPropTypes } from 'vue'

// import type { AppMenu } from '@/components/Menu'
import { JProfile } from '@/components/Profile'

// import { useAppStore } from '@/store/appStore'

export const weatherProps = {}

export type WeatherProps = ExtractPropTypes<typeof weatherProps>

export default defineComponent({
  name: 'JWeather',
  props: weatherProps,
  setup() {
    const { centerWin } = inject('winState') as { [key: string]: () => void }

    onMounted(() => {
      centerWin()
    })
  },
  render() {
    return (
      <div class="weather">
        <div class="m-6">我还没想好这里面放些啥东西</div>
        <JProfile></JProfile>
      </div>
    )
  }
})
