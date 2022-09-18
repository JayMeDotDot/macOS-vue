import { defineComponent, computed } from 'vue'

import { useBattery } from '@vueuse/core'

export default defineComponent({
  name: 'JBattery',
  setup() {
    const batteryState: Record<string, Record<string, string>> = {
      charging: {
        '0': 'i-ic-outline-battery-charging-20',
        '1': 'i-ic-outline-battery-charging-30',
        '2': 'i-ic-outline-battery-charging-50',
        '3': 'i-ic-outline-battery-charging-60',
        '4': 'i-ic-outline-battery-charging-80',
        '5': 'i-ic-outline-battery-charging-90',
        '6': 'i-ic-outline-battery-charging-full'
      },
      uncharged: {
        '0': 'i-ic-outline-battery-1-bar',
        '1': 'i-ic-outline-battery-2-bar',
        '2': 'i-ic-outline-battery-3-bar',
        '3': 'i-ic-outline-battery-4-bar',
        '4': 'i-ic-outline-battery-5-bar',
        '5': 'i-ic-outline-battery-6-bar',
        '6': 'i-ic-outline-battery-full'
      }
    }

    const { charging, level } = useBattery()

    const batteryIcon = computed(() => {
      const isCharging = charging.value
        ? batteryState.charging
        : batteryState.uncharged
      const batteryLevel = Math.floor(level.value * 6) + ''
      return isCharging[batteryLevel] + ' rotate-90'
    })

    return { batteryIcon }
  },
  render() {
    const { batteryIcon } = this

    return <div class={batteryIcon}></div>
  }
})
