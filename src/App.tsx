import { defineComponent } from "vue"

import { RouterView } from "vue-router"

export default defineComponent({
  name: 'App',
  setup() {},
  render() {
    return (
      <div>
        <RouterView></RouterView>
      </div>
    )
  },
})