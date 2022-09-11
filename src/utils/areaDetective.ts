export interface areaDetectiveType {
  include: (event: MouseEvent) => boolean
  atTop: (event: MouseEvent) => boolean
  atBottom: (event: MouseEvent) => boolean
  atLeft: (event: MouseEvent) => boolean
  atRight: (event: MouseEvent) => boolean
  atTopLeft: (event: MouseEvent) => boolean
  atBottomLeft: (event: MouseEvent) => boolean
  atTopRight: (event: MouseEvent) => boolean
  atBottomRight: (event: MouseEvent) => boolean
}

export default function areaDetective(target: HTMLElement, setEdge?: number) {
  let { left, top, width, height } = target.getBoundingClientRect()

  const edge = setEdge ? Math.abs(setEdge) : 0

  let leftEdge = left + edge
  let rightEdge = left + width - edge
  let topEdge = top + edge
  let bottomEdge = top + height - edge

  function getArea() {
    ;({ left, top, width, height } = target.getBoundingClientRect())

    leftEdge = left + edge
    rightEdge = left + width - edge
    topEdge = top + edge
    bottomEdge = top + height - edge
  }

  function include(event: MouseEvent) {
    getArea()
    return (
      event.clientX > leftEdge &&
      event.clientX < rightEdge &&
      event.clientY > topEdge &&
      event.clientY < bottomEdge
    )
  }

  function atTop(event: MouseEvent) {
    getArea()
    return (
      event.clientY >= top &&
      event.clientY <= topEdge &&
      event.clientX >= leftEdge &&
      event.clientX <= rightEdge
    )
  }

  function atBottom(event: MouseEvent) {
    getArea()
    return (
      event.clientY >= bottomEdge &&
      event.clientY <= top + height &&
      event.clientX >= leftEdge &&
      event.clientX <= rightEdge
    )
  }

  function atLeft(event: MouseEvent) {
    getArea()
    return (
      event.clientX >= left &&
      event.clientX <= leftEdge &&
      event.clientY >= topEdge &&
      event.clientY <= bottomEdge
    )
  }

  function atRight(event: MouseEvent) {
    getArea()
    return (
      event.clientX >= rightEdge &&
      event.clientX <= left + width &&
      event.clientY >= topEdge &&
      event.clientY <= bottomEdge
    )
  }

  function atTopLeft(event: MouseEvent) {
    getArea()
    return (
      event.clientX >= left &&
      event.clientX <= leftEdge &&
      event.clientY >= top &&
      event.clientY <= topEdge
    )
  }

  function atBottomLeft(event: MouseEvent) {
    getArea()
    return (
      event.clientX >= left &&
      event.clientX <= leftEdge &&
      event.clientY >= bottomEdge &&
      event.clientY <= top + height
    )
  }

  function atTopRight(event: MouseEvent) {
    getArea()
    return (
      event.clientX >= rightEdge &&
      event.clientX <= left + width &&
      event.clientY >= top &&
      event.clientY <= topEdge
    )
  }

  function atBottomRight(event: MouseEvent) {
    getArea()
    return (
      event.clientX >= rightEdge &&
      event.clientX <= left + width &&
      event.clientY >= bottomEdge &&
      event.clientY <= top + height
    )
  }

  return {
    include,
    atTop,
    atBottom,
    atLeft,
    atRight,
    atTopLeft,
    atBottomLeft,
    atTopRight,
    atBottomRight
  }
}
