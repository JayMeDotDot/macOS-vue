import { defineComponent } from 'vue'
import type { ExtractPropTypes, PropType, SetupContext } from 'vue'

export const avatarProps = {
  src: {
    type: String as PropType<string>,
    default: '/DOT.svg'
  }
}

export type AvatarProps = ExtractPropTypes<typeof avatarProps>

export default defineComponent({
  name: 'Avatar',
  props: avatarProps,
  setup() {

  },
  render() {
    const {
      src,
    } = this

    return (
      <div class="avatar">
        <img src={src} alt="avatar" />
      </div>
    )
  },
})