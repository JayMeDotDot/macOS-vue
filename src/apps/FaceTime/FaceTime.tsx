import { defineComponent, inject, onMounted, } from 'vue'
import type { ExtractPropTypes, } from 'vue'

// import type { AppMenu } from '@/components/Menu'
import { JProfile } from '@/components/Profile'

// import { useAppStore } from '@/store/appStore'

export const faceTimeProps = {}

export type FaceTimeProps = ExtractPropTypes<typeof faceTimeProps>

export default defineComponent({
  name: 'JAppStore',
  props: faceTimeProps,
  setup() {
    const { centerWin } = inject('winState') as { [key: string]: () => void }

    onMounted(() => {
      centerWin()
    })
  },
  render() {

    return (
      <div class="facetime">
        <div class="m-6">我还没想好这里面放些啥东西</div>
        <JProfile></JProfile>
      </div>
    )
  },
})