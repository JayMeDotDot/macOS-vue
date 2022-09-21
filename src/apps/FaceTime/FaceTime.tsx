import { 
  computed,
  defineComponent, 
  inject, 
  onMounted, 
  onUnmounted, 
  ref,
} from 'vue'
import type { 
  ExtractPropTypes,
  Ref, 
} from 'vue'

import mRecorder from '@/utils/mRecorder'
import type { MRecorderType } from '@/utils/mRecorder'

import { JButton } from '@/components/Button'
import type { AppMenu } from '@/components/Menu'
import type { CompStateProvideType } from '@/pages/Home'

import { useAppStore } from '@/store/appStore'

export const faceTimeProps = {}

export type FaceTimeProps = ExtractPropTypes<typeof faceTimeProps>

export default defineComponent({
  name: 'JFaceTime',
  props: faceTimeProps,
  setup() {
    const { centerWin } = inject('winState') as { [key: string]: () => void }
    const { handleCloseWin } = inject('compState') as CompStateProvideType

    const mennuList: AppMenu[] = [
      {
        title: 'FaceTime',
        options: [
          { title: '关于FaceTime' },
          { title: '退出FaceTime', fn: () => handleCloseWin('FaceTime')}
        ]
      },
      {
        title: '编辑',
        options: [
          { title: '开始' },
          { title: '停止' },
          { title: '虚化背景' }
        ]
      },
    ]
    const appStore = useAppStore()
    appStore.mountApp('FaceTime', mennuList)

    const video: Ref<HTMLVideoElement | null> = ref(null)
    const blur = ref(false)
    const recording = ref(false)

    const blurIcon = computed(
      () => blur.value ? 'i-ic-baseline-blur-on color-green' : 'i-ic-baseline-blur-off'
      )
    const recordIcon = computed(
      () => recording.value ? 'i-ic-outline-stop-circle color-red' : 'i-ic-outline-play-circle'
    )

    function handleRecord() {
      recording.value ? obj.stop() : obj.start()
      recording.value = !recording.value
    }

    function handleBlur() {
      console.log('背景虚化功能暂未实现！')
      blur.value = !blur.value
    }

    const contraints = { 
        audio: false, 
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: "user"
        } 
      }
    const obj: MRecorderType = mRecorder()
    obj.run(contraints)
        .then(result => {
        video.value = document.querySelector('#video') as HTMLVideoElement
        if (!video.value) return 
        video.value.srcObject = result
        video.value.onloadedmetadata = () => video.value?.play()
    })

    onMounted(() => {
      centerWin()
    })

    onUnmounted(() => {
      appStore.unmountApp()
      obj.exit()
    })

    return {
      blurIcon,
      recordIcon,
      handleRecord,
      handleBlur,
    }
  },
  render() {
    const {
      blurIcon,
      recordIcon,
      handleBlur,
      handleRecord,
    } = this

    return (
      <div class="facetime">
        <video id="video" class="w-100%"></video>
        <audio id="audio"></audio>
        <div class='w-100% flex justify-around'>
          <JButton icon='i-ic-outline-photo-camera' circle></JButton>
          <JButton icon={blurIcon} circle onClick={handleBlur}></JButton>
          <JButton icon={recordIcon} circle onClick={handleRecord}></JButton>
          <JButton icon='i-ic-round-pause-circle-outline' circle></JButton>
          <JButton 
            icon='i-ic-round-cameraswitch' 
            circle
            class="dark:bg-opacity-0 dark:color-warmgray-200"
          ></JButton>
        </div>
      </div>
    )
  }
})
