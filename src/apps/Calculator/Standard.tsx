import { computed, defineComponent, ref } from "vue"
import type { Ref } from 'vue'

export default defineComponent({
  name: "JStandard",
  setup() {
    const initVal = ref('0')
    const initFlag = ref(true)
    const stack: Ref<string[]> = ref([])
    const StdOp = ['/', '*', '-', '+']
    const keyNum = ['0', '1', '2' ,'3', '4', '5', '6', '7', '8', '9']

    const ACOrC = computed(() => {
      return initFlag.value && initVal.value === '0' ? 'AC' : 'C'
    })

    function standardCal(event: MouseEvent) {
        const key = event.target as HTMLButtonElement
        if (!key.value) return 
        if (key.value === '%') {
          initVal.value = '' + parseFloat(initVal.value) / 100
          initFlag.value = false
          return
        }
        if (key.value === '+/-') {
          const num = parseFloat(initVal.value)
          num >= 0
            ? initVal.value = '-' + num
            : initVal.value = '' + (-num)
          initFlag.value = false
          return
        }
        if (key.value === '.') {
          initVal.value = initVal.value + key.value
          initFlag.value = false
          return 
        }
        if (keyNum.includes(key.value)) {
          initFlag.value || initVal.value === '0'
            ? initVal.value = key.value
            : initVal.value = initVal.value + key.value
          initFlag.value = false
          return 
        }

        if (key.value === 'AC') {
          initVal.value = '0'
          stack.value.length = 0
        }
        if (key.value === 'C') {
          initVal.value = '0'
        }
        if (key.value === '=') {
          initFlag.value ? initVal.value = '0' : stack.value.push(initVal.value)
          const result = calResult([...stack.value])
          initVal.value = result
          stack.value.length = 0
        }
        if (StdOp.includes(key.value)) {
          stack.value.push(initVal.value)
          stack.value.push(key.value)
        }

        initFlag.value = true
    }

    function calResult(arr: Array<string>): string {
      const result = []
      let op = '+'

      for (const a of arr) {
        if (a === '+') { op = '+'; continue }
        if (a === '-') { op = '-'; continue }
        if (a === '*') { op = '*'; continue }
        if (a === '/') { op = '/'; continue }
        
        if (op === '+') { result.push(parseFloat(a)) }
        if (op === '-') { result.push(-parseFloat(a)) }
        if (op === '*') {
          let tmp = result.pop() as number
          tmp = result.push(tmp * parseFloat(a))
        }
        if (op === '/') {
          let tmp = result.pop() as number
          tmp = result.push(tmp / parseFloat(a))
        }
      }

      if (!result.length) return '0'
      return Number(result.reduce((a,b) => a + b)).toString()
    }

    return {
      ACOrC,
      initVal,
      standardCal,
    }
  },
  render() {
    const {
      ACOrC,
      initVal,
      standardCal,
    } = this

    const CalUI = {
      standard: ['AC', '+/-', '%', '/', 7, 8, 9, '*', 4, 5, 6, '-', 1, 2, 3, '+', 0, '.', '='],
      scientific: [],
      coder: [],
    }

    return (
      <div class='calculator'>
        <div class="calculator-result">{initVal}</div>
        <div class='calculator-keys' onClick={standardCal} >
        {CalUI.standard.map((item) => {
          if (item === 0) {
            return <button
            class="calculator-key dark:calculator-key-dark active:calculator-key-active active:dark:calculator-key-dark-active w-auto col-span-2" value={item}
            >{item}</button>
          }
          if (item === 'AC' ) {
            return <button
            class="calculator-key dark:calculator-key-dark active:calculator-key-active active:dark:calculator-key-dark-active " value={ACOrC}
            >{ACOrC}</button>
            
          }
          return <button
            class="calculator-key dark:calculator-key-dark active:calculator-key-active active:dark:calculator-key-dark-active " value={item}
            >{item}</button>
        })}
      </div>
    </div>
    )
  },
})