import { computed, defineComponent } from 'vue'
import type { ExtractPropTypes, PropType } from 'vue'

export const inputProps = {
  autofocus: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  placeholder: {
    type: String as PropType<string>,
    default: '',
  },
  round : {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  size: {
    type: Number as PropType<number>,
    default: 16
  },
  type: {
    type: String as PropType<string>,
    default: 'text',
  },
}

export type InputProps = ExtractPropTypes<typeof inputProps>

export default defineComponent({
  name: 'Input',
  props: inputProps,
  setup(props) {
    const {
      autofocus,
      placeholder,
      round,
      size,
      type,
    } = props

    console.log( autofocus, placeholder, round, size, type)

    const wrapStyle = computed(() => {
      const rounded = props.round ? `rounded-${size}` : ''
      return `border-1px bg-white bg-opacity-50 ${rounded}`
    })

    const inputStyle = computed(() => {
      let style = `text-${size}px`
      return `bg-transparent color-light-50 focus:outline-none focus:color-light-50 border-none placeholder-light-50/50 ${style}`
    })

    return {
      inputStyle,
      wrapStyle,
    }
  },
  render() {
    const {
      autofocus,
      inputStyle,
      placeholder,
      type,
      wrapStyle,
    } = this

    return (
      <div class={wrapStyle}>
        <input 
          class={inputStyle}
          autofocus={autofocus}
          type={type} 
          placeholder={placeholder} 
        />
      </div>
    )
  },
})