export default function gSC(target: HTMLElement) {
  function searchApp(e: KeyboardEvent): void {
    if (e.shiftKey) {
      if (e.key === 'F') {
        target.dispatchEvent(new CustomEvent('search-bar-toggle'))
      }
    }
  }

  function lockScreen(e: KeyboardEvent): void {
    if (e.shiftKey) {
      if (e.key === 'L') {
        target.dispatchEvent(new CustomEvent('lock-screen-toggle'))
      }
    }
  }

  const scList = [searchApp, lockScreen]

  return {
    install: (): void => {
      scList.forEach(fn => {
        window.addEventListener('keydown', fn)
      })
    },
    uninstall: (): void => {
      scList.forEach(fn => {
        window.removeEventListener('keydown', fn)
      })
    }
  }
}

export type gSCTypes = ReturnType<typeof gSC>
