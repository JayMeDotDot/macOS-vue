export default function drag(target: HTMLElement) {

  const state = {
    moving: false,
    left: target.offsetLeft,
    top: target.offsetTop,
    startX: target.offsetLeft,
    startY: target.offsetTop,
    width: target.offsetWidth,
    height: target.offsetHeight,
  }

  function setPosition(event: MouseEvent) {
    if (state.moving) {
      event.preventDefault()

      let driftX = event.clientX - state.startX
      let driftY = event.clientY - state.startY
      let left = state.left + driftX
      let top = state.top + driftY

      if (left < state.width / 2) {
        left = state.width / 2
      } else if (left > window.innerWidth - target.offsetWidth + state.width / 2) {
        left = window.innerWidth - target.offsetWidth + state.width / 2
      }

      if (top < state.height / 2) {
        top = state.height / 2
      } else if (top > window.innerHeight - target.offsetHeight + state.height / 2) {
        top = window.innerHeight - target.offsetHeight + state.height / 2
      }

      target.style.left = left + 'px'
      target.style.top = top + 'px'
    }
  }

  function setTrue(event: MouseEvent) {
    state.moving = true
    state.startX = event.clientX
    state.startY = event.clientY
  }
  function setFalse() { 
    state.moving = false
    state.left = target.offsetLeft
    state.top = target.offsetTop
  }

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