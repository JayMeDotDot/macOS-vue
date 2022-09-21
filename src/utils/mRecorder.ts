export interface MRecorderType {
  exit: () => void
  run: (constraints: MediaStreamConstraints) => Promise<MediaStream>
  snapShot: () => void
  start: () => void
  stop: () => void
}

export default function mRecorder(): MRecorderType {
  let mediaStream: MediaStream
  let mediaRecorder: MediaRecorder
  const chunks: Blob[] = []

  // get the stream
  async function run(constraints: MediaStreamConstraints) {
    mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
    mediaRecorder = new MediaRecorder(mediaStream)
    init()
    return mediaStream
  }

  function downLoad(url: string) {
    const el = document.createElement('a')
    el.href = url
    el.download = String(Math.floor(Math.random() * 10000))
    el.click()
  }

  function init() {
    mediaRecorder.ondataavailable = e => {
      chunks.push(e.data)
    }

    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks, { type: 'video/mp4' })
      chunks.length = 0
      const videoURL = URL.createObjectURL(blob)
      downLoad(videoURL)
    }
  }

  function start(timeslice?: number) {
    if (!mediaRecorder) return
    mediaRecorder.start(timeslice)
    console.log('start recording')
  }

  function pause() {
    if (!mediaRecorder) return
    console.log('pause recording')
  }

  function stop() {
    if (!mediaRecorder) return
    mediaRecorder.stop()
    console.log('end recording')
  }

  function exit() {
    if (!mediaStream) return
    mediaStream?.getTracks().forEach(track => track.stop())
  }

  function snapShot() {
    console.log('snapShot')
  }

  function switchCamera() {
    console.log('switchCamera')
  }

  return {
    exit,
    run,
    snapShot,
    start,
    stop
  }
}
