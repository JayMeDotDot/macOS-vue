import type { CSSProperties, StyleValue } from "vue"

export default function flip(element: HTMLElement, options: StyleValue, duration = 600) {
  const hasTransform = (options as CSSProperties).transform

  const first = element.getBoundingClientRect()

  // This function is mainly for passing type check.
  function keys<T extends HTMLElement | StyleValue>(obj: T) {
    return Object.keys(obj) as (keyof T)[]
  }
  for (const key of keys(options)) {
    element.style[key] = options[key]
  }

  const second = element.getBoundingClientRect()
  const deltaX = first.left - second.left
  const deltaY = first.top - second.top
  const scaleX = first.width / second.width
  const scaleY = first.height / second.height

  const fromOptions = hasTransform 
                        ? {
                            transformOrigin: 'center',
                            transform:'scale(1) translate(0)',
                            opacity: 1
                          } 
                        : {
                          transformOrigin: 'left top',
                          transform: `translate(${deltaX}px, ${deltaY}px) 
                                      scale(${scaleX}, ${scaleY})`,
                          }

  const toOptions = hasTransform
                      ? { transformOrigin: 'center', }
                      : { transformOrigin: 'left top' }

  if (hasTransform) {
    element.animate([
      fromOptions,
      toOptions,
    ],{
      duration: duration,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    })
  } else {
    element.animate([
      fromOptions,
      toOptions,
    ],{
      duration: duration,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    })
  }

}