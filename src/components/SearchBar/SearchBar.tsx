import {
  onMounted,
  defineComponent,
  onUnmounted,
} from 'vue'

import drag from '../../utils/drag'

import type { PropType } from 'vue'

export const searchBarTypes = {
  placeholder: {
    type: String as PropType<string>,
    default: '搜索',
  },
  targetItem: {
    type: String as PropType<string>,
    default: '',
  }
} as const

export type SearchBarTypes = typeof searchBarTypes

export default defineComponent({
  name: 'SearchBar',
  props: searchBarTypes,
  setup(props) {
    let searchBar : HTMLElement | null

    onMounted(() => {
      searchBar = document.querySelector('#search-bar') as HTMLElement
      searchBar ? drag(searchBar).install() : null
    })

    onUnmounted(() => {
      searchBar ? drag(searchBar).uninstall() : null
    })
  },
  render() {
    const {
      placeholder,
      targetItem,
    } = this

    return (
      <div id="search-bar" class="search-bar-container item-center dark:search-bar-container-dark global-transition" draggable>
        <div class='i-ic-search'></div>
        <input class="search-bar dark:search-bar-dark focus:outline-none"
               type="text"
               placeholder={placeholder}
        />
      </div>
    )
  },
})