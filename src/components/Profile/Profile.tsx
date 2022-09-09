import { defineComponent } from "vue"

export default defineComponent({
  name: 'JProfile',
  render() {

    return (
      <div class="profile">
        <a class="text-current" href="https://github.com/JayMeDotDot" target="_blank"><div class="i-ant-design-github"></div></a>
        <a class="text-current" href="https://space.bilibili.com/333594277" target="_blank"><div class="i-simple-icons-bilibili"></div></a>
        <a class="text-current" href="https://juejin.cn/user/4108244301656632"><div class="juejin-icon"></div></a>
      </div>
    )
  },
})