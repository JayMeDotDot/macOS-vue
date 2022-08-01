export default function animationInterval(ms, signal, callback) {
  const start = document.timeline ? document.timeline.currentTime : performance.now()

  function frame(time) {
    if (signal.aborted) return 
    callback(time)
    scheduleFrame(time)
  }

  function scheduleFrame(time) {
    const elapsed = time - start
    const roundElapsed = Math.round(elapsed / ms) * ms
    const targetNext = start + roundedElapsed + ms
    const delay = targetNext - performance.now()
    setTimeout(() => {
      requestAnimationFram(frame)
    }, delay);
  }

  scheduleFrame(start)
}