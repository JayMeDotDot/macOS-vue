import { onMounted, defineComponent, onUnmounted, ref, computed } from 'vue'
import type { ExtractPropTypes, PropType } from 'vue'

import { drag } from '../../utils'
import type { dragType } from '../../utils'

export const searchBarProps = {
  placeholder: {
    type: String as PropType<string>,
    default: '搜索'
  }
} as const

export type SearchBarProps = ExtractPropTypes<typeof searchBarProps>

export default defineComponent({
  name: 'JSearchBar',
  props: searchBarProps,
  setup(props) {
    let searchBar: HTMLElement
    let inputEL: HTMLElement
    let dragSbar: dragType

    const inputVal = ref('')
    const inputLen = computed(() => {
      const len = inputVal.value
        ? inputVal.value.length
        : props.placeholder.length
      return `width: ${len}em`
    })
    function handleInput(e: Event) {
      inputVal.value = (e.target as HTMLInputElement).value
    }

    onMounted(() => {
      searchBar = document.querySelector('#search-bar') as HTMLElement
      inputEL = document.querySelector('#search-bar input') as HTMLElement
      dragSbar = drag(searchBar, [inputEL])
      dragSbar.install()
    })

    onUnmounted(() => {
      dragSbar.uninstall()
    })

    return {
      inputLen,
      handleInput
    }
  },
  render() {
    const { placeholder, inputLen, handleInput } = this

    return (
      <div
        id="search-bar"
        class="search-bar-container item-center dark:search-bar-container-dark theme-transition search-bar-shadow"
      >
        <div class="i-ic-search"></div>
        <input
          class="search-bar dark:search-bar-dark focus:outline-none"
          type="text"
          placeholder={placeholder}
          autofocus
          style={inputLen}
          onInput={handleInput}
        />
      </div>
    )
  }
})
