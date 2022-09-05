import { defineComponent,  nextTick,  onMounted,  onUnmounted, ref } from "vue"
import router from '@/router'
import 'animate.css'

import { usePassword } from "@/store/password"
import { useSysState } from "@/store/sysState"

import { JAvatar } from "@/components/Avatar"
import { JButton } from "@/components/Button"

import { formatDay } from '@/utils'

export default defineComponent({
  name: 'Login',
  setup() {
    const currentTime = ref(formatDay())
    const systemState = [
      'i-ic-outline-keyboard',
      'i-ic-outline-battery-charging-90 rotate-90',
      'i-ic-baseline-wifi',
    ]
    const showCover = ref(false)
    const showInput = ref(false)
    const password = usePassword()
    const sysState = useSysState()

    const intervalID = setInterval(() => {
      currentTime.value = formatDay()
    }, 60000)

    function handleClick() {
      showInput.value = true
    }

    function handleCancel(e: MouseEvent) {
      showCover.value = !showCover.value
      showInput.value = false
      e.preventDefault()
      e.stopPropagation()
    }

    function handleInput(target?: HTMLInputElement) {
      const input = target ? target : document.querySelector('#password') as HTMLInputElement
      if (password.checkpassword(input.value, 'login')) {
        sysState.login()
        router.push({path: '/'})
      }
      input.select()
      input.parentElement!.classList.add('animate__animated', 'animate__shakeX', 'animate__fast')
      input.parentElement!.addEventListener('animationend', () => { input.parentElement?.classList.remove('animate__shakeX')})
    }

    function handleInputBlur(e: FocusEvent) {
      ;(e.target as HTMLInputElement).select()
    }

    async function handleKeyPressed(e: KeyboardEvent) {
      if (showCover.value) {
        showCover.value = !showCover.value
        showInput.value = false
        e.preventDefault()
        ;(e.target as HTMLElement).blur()
        return
      }
      showInput.value = true
      await nextTick()
      const input = document.querySelector('#password') as HTMLInputElement
      input.focus()
    }

    function handleSubmit(e: Event) {
      const element = (e.target as HTMLElement).children[0] as HTMLInputElement
      handleInput(element)
      e.preventDefault()
    }

    onMounted(() => {
      window.addEventListener('keypress', handleKeyPressed)
    })

    onUnmounted(() => {
      clearInterval(intervalID)
      window.removeEventListener('keypress', handleKeyPressed)
    })

    return {
      currentTime,
      showCover,
      showInput,
      systemState,
      handleCancel,
      handleClick,
      handleInputBlur,
      handleSubmit,
    }
  },
  render() {
    const {
      currentTime,
      showCover,
      showInput,
      systemState,
      handleCancel,
      handleClick,
      handleInputBlur,
      handleSubmit,
    } = this

    function renderInput() {
        if (showInput) {
        return (
          <form onSubmit={handleSubmit} class='border-none bg-light-50/50 rounded-20px flex pl-20px'>
            <input 
              id="password"
              class="bg-transparent color-light-50 border-none placeholder-light-50/50 focus:outline-none focus:color-light-50"
              autocomplete="off"
              type="password" 
              placeholder="输入密码"
              onBlur={handleInputBlur}
            />
            <JButton
              circle
              icon="i-ic-outline-arrow-circle-right"
              class="color-light-50"
              type="submit"
            ></JButton>
          </form>
        )}
    }

    function renderCover() {
      if (showCover) {
        return (
          <div 
            class="w-100vw h-100vh bg-black absolute left-0 top-0"
            onClick={handleCancel}
          ></div>
        )
      }
    }

    return (
      <div 
        class="w-100vw h-100vh" 
        onClick={handleClick}
      >
        <div>
          <div class="menu-subbar justify-end text-size-3.5 color-warmgray-200">
            {systemState.map((item) => {
              return (
                <div class={item + " menu-subbar-item"}></div>
              )
            })}
            <div
              class="menu-subbar-item"
            >{currentTime}</div>
          </div>

        </div>

        <div class="h-100% flex flex-col justify-center items-center text-white">
          <div class="flex flex-col justify-center items-center">
            <JAvatar class="m-5"></JAvatar>
            <div class="m-3 text-size-4.5 font-bold">JayMe DotDot</div>
            <div class="m-3 h-28px">
              {renderInput()}
            </div>
            <div class="m-3 text-size-3">使用触控 ID 或输入密码</div>
          </div>
          <div class="absolute bottom-10 flex flex-col justify-center items-center text-white">
            <JButton
              circle 
              icon="i-ic-outline-cancel"
              class="color-light-50/50"
              onClick={handleCancel}
            ></JButton>
            <div class="m-2 text-size-3">取消</div>
          </div>
        </div>

        {renderCover()}
      </div>
    )
  },
})