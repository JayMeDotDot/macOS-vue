import areaDetective from './areaDetective'

export interface dragType {
  install: () => void
  uninstall: () => void
}

export default function drag(
  target: HTMLElement,
  exclude?: HTMLElement[]
): dragType {
  const state = {
    moving: false,
    left: 0,
    top: 0,
    startX: 0,
    startY: 0,
    width: 0,
    height: 0
  }

  const targetDetective = areaDetective(target, 4)
  const excludeList = exclude ? exclude.map(e => areaDetective(e)) : []

  function setPosition(event: MouseEvent) {
    if (state.moving) {
      const driftX = event.clientX - state.startX
      const driftY = event.clientY - state.startY
      const left = state.left + driftX
      const top = state.top + driftY

      target.style.left = left + 'px'
      target.style.top = top + 'px'
    }
  }

  function setTrue(event: MouseEvent) {
    if (excludeList.length && excludeList.some(e => e.include(event))) {
      return
    }
    if (targetDetective.include(event)) {
      state.moving = true
      state.startX = event.clientX
      state.startY = event.clientY
      state.left = target.offsetLeft
      state.top = target.offsetTop
      state.height = target.offsetHeight
      state.width = target.offsetWidth
    }
  }

  function setFalse() {
    state.moving = false
    state.left = target.offsetLeft
    state.top = target.offsetTop
  }

  function install() {
    target.addEventListener('mousedown', setTrue)
    document.addEventListener('mouseup', setFalse)
    document.addEventListener('mousemove', setPosition)
  }

  function uninstall() {
    target.removeEventListener('mousedown', setTrue)
    document.removeEventListener('mouseup', setFalse)
    document.removeEventListener('mousemove', setPosition)
  }

  return {
    install,
    uninstall
  }
}
