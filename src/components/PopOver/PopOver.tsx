import { defineComponent } from "vue"
import type { ExtractPropTypes, PropType } from "vue"

export const popProps = {} as const

export type PopProps = ExtractPropTypes<typeof popProps>

export default defineComponent({
  name: 'PopOver',
  props: popProps,
  setup() {},
  render() {},
})