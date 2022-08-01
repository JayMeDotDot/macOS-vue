export default function drag(target: HTMLElement) {

  const state = {
    moving: false,
    left: target.offsetLeft,
    top: target.offsetTop,
    startX: target.offsetLeft,
    startY: target.offsetTop,
  }

  function setPosition(event: MouseEvent) {
    if (state.moving) {
      event.preventDefault()
      let driftX = event.clientX - state.startX
      let driftY = event.clientY - state.startY
      let left = state.left + driftX
      let top = state.top + driftY

      if (left < 0) {
        left = 0
      } else if (left > window.innerWidth - target.offsetWidth) {
        left = window.innerWidth - target.offsetWidth
      }

      if (top < 0) {
        top = 0
      } else if (top > window.innerHeight - target.offsetHeight) {
        top = window.innerHeight - target.offsetHeight
      }

      target.style.left = left + 'px'
      target.style.top = top + 'px'
    }
  }

  function setTrue() { state.moving = true }
  function setFalse() { state.moving = false }

  function install() {
    target.addEventListener('mousedown', setTrue )
  
    document.addEventListener('mouseup', setFalse )
  
    document.addEventListener('mousemove', setPosition)
  }

  function uninstall() {
    target.removeEventListener('mousedown', setTrue )
  
    target.removeEventListener('mouseup', setFalse )
  
    document.removeEventListener('mousemove', setPosition)
  }

  return {
    install,
    uninstall,
  }
}