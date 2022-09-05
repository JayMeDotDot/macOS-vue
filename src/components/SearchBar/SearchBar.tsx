import { onMounted, defineComponent, onUnmounted } from 'vue'
import type { ExtractPropTypes, PropType } from 'vue'

import { drag } from '../../utils'
import type { dragType } from '../../utils'

export const searchBarProps = {
  placeholder: {
    type: String as PropType<string>,
    default: '搜索',
  },
  targetItem: {
    type: String as PropType<string>,
    default: '',
  }
} as const

export type SearchBarProps = ExtractPropTypes<typeof searchBarProps>

export default defineComponent({
  name: 'SearchBar',
  props: searchBarProps,
  setup(props) {
    let searchBar : HTMLElement
    let inputEL : HTMLElement
    let dragSbar : dragType

    onMounted(() => {
      searchBar = document.querySelector('#search-bar') as HTMLElement
      inputEL = document.querySelector('#search-bar input') as HTMLElement
      console.log(inputEL)
      dragSbar = drag(searchBar, [inputEL])
      dragSbar.install()
    })

    onUnmounted(() => {
      dragSbar.uninstall()
    })
  },
  render() {
    const {
      placeholder,
      targetItem,
    } = this

    return (
      <div id="search-bar" class="search-bar-container item-center dark:search-bar-container-dark theme-transition search-bar-shadow">
        <div class='i-ic-search'></div>
        <input class="search-bar dark:search-bar-dark focus:outline-none"
               type="text"
               placeholder={placeholder}
               autofocus
        />
      </div>
    )
  },
})