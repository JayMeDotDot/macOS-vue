import areaDetective from "./areaDetective"

export interface resizeType {
  install: () => void
  uninstall: () => void
}

export default function resize(target: HTMLElement): resizeType {

  let resize = false
  let position = ''
  // const left = target.offsetLeft
  // const top = target.offsetTop
  // let startX = target.offsetLeft
  let startY = target.offsetTop
  // const width = target.offsetWidth
  const height = target.offsetHeight

  const targetDetective = areaDetective(target, 4)

  function changeMouseStyle(event: MouseEvent) {
    if (targetDetective.atTop(event)) {
      target.style.cursor = 'ns-resize'
      position = 'top'
    }
    if (targetDetective.atBottom(event)) {
      target.style.cursor = 'ns-resize'
      position = 'bottom'
    }
    if (targetDetective.atLeft(event)) {
      target.style.cursor = 'ew-resize'
      position = 'left'
    }
    if (targetDetective.atRight(event)) {
      target.style.cursor = 'ew-resize'
      position = 'right'
    }
    if (targetDetective.atTopLeft(event)) {
      target.style.cursor = 'nwse-resize'
      position = 'topleft'
    }
    if (targetDetective.atBottomRight(event)) {
      target.style.cursor = 'nwse-resize'
      position = 'bottomright'
    }
    if (targetDetective.atTopRight(event)) {
      target.style.cursor = 'nesw-resize'
      position = 'topright'
    }
    if (targetDetective.atBottomLeft(event)) {
      target.style.cursor = 'nesw-resize'
      position = 'bottomleft'
    }
  }

  function resizeTarget(event: MouseEvent) {
    console.log(resize)
    if (resize) {
      //event.preventDefault()

      // const driftX = event.clientX - startX
      const driftY = event.clientY - startY
      
      if (position === 'top') {
        // remain to refactor
        target.style.height = height + driftY + 'px'
      }
      if (position === 'bottom') {
        target.style.height = height + driftY + 'px'
      }
    }
  }

  function setTrue(event: MouseEvent) {
    resize = true
    // startX = event.clientX
    startY = event.clientY
  }

  function setFalse() {
    resize = false
    position = ''
  }

  function install() {
    target.addEventListener('mousemove', changeMouseStyle)
    target.addEventListener('mousedown', setTrue)
    target.addEventListener('mouseup', setFalse)
    target.addEventListener('mousemove', resizeTarget)
  }

  function uninstall() {
    target.removeEventListener('mousemove', changeMouseStyle)
    target.removeEventListener('mousedown', setTrue)
    target.removeEventListener('mouseup', setFalse)
    target.removeEventListener('mousemove', resizeTarget)
  }

  return {
    install,
    uninstall,
  }
}