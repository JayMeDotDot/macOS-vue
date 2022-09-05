import { defineComponent, onMounted, onUnmounted, ref } from "vue"

export default defineComponent({
  name: 'Update',
  setup() {
    const time = ref(16)
    let intervalID: number

    onMounted(() => {
      time.value = 10 + Math.floor(Math.random() * 20)
      intervalID = setInterval(() => {
        time.value = 10 + Math.floor(Math.random() * 20)
      }, 60000)
    })

    onUnmounted(() => {
      clearInterval(intervalID)
    })

    return { time }
  },
  render() {
    const { time } = this
    return (
      <div class="w-100vw h-100vh bg-black flex flex-col items-center justify-center">
        <div class="i-ic-baseline-apple text-white text-24"></div>
        <div class="mt-20 mb-5 w-13vw h-5px border-1 border-gray-800 rounded overflow-hidden">
          <div class="w-13vw h-5px bg-white translate-x--50% "></div>
        </div>
        <div class="text-white text-0.8 font-bold">剩余大约 {time} 分钟</div>
      </div>
    )
  },
})