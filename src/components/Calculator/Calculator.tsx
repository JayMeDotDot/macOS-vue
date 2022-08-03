import {
  defineComponent,
} from 'vue'

import type { PropType } from 'vue'

export const calculatorTypes = {
  type: {
    type: String as PropType<'standard' | 'scientific' | 'coder'>,
    default: 'standard',
  }
}

export default defineComponent({
  name: 'Calculator',
  props: calculatorTypes,
  setup() {

  },
  render() {
    const { type } = this

    const CalUI = {
      standard: ['AC', '+/-', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='],
      scientific: [],
      coder: [],
    }

    function standardCal() {
      return <div>等待实现中，欢迎 PR！</div>
    }

    function scientificCal() {
      return <div>等待实现中，欢迎 PR！</div>
    }

    function coderCal() {
      return <div>等待实现中，欢迎 PR！</div>
    }
    
    return (
      <div class="calculator">
        Calculator
      </div>
    )
  },
})