import type { StyleValue } from "vue"

export default function flip(element: HTMLElement, options: StyleValue) {
  const first = element.getBoundingClientRect()

  // This function is mainly for passing type check.
  function keys<T extends HTMLElement | StyleValue>(obj: T) {
    return Object.keys(obj) as (keyof T)[]
  }

  for (let key of keys(options)) {
    element.style[key] = options[key]
  }

  const second = element.getBoundingClientRect()

  const deltaX = first.left - second.left
  const deltaY = first.top - second.top
  const scaleX = first.width / second.width
  const scaleY = first.height / second.height

  element.animate([
    {
      transformOrigin: 'left top',
      transform: `translate(${deltaX}px, ${deltaY}px) scale(${scaleX}, ${scaleY})`,
    },
    {
      transformOrigin: 'left top',
    },
  ],{
    duration: 300,
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
  })
}