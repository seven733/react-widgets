export function debounce<T>(fn: Preview.TFun<T>, delay = 300) {
  let timer: null | number = null

  const nfn = function(...args: T[]) {
    nfn.cancel()

    timer = setTimeout(
      () => fn.apply(this, args),
      delay
    )
  }
  nfn.cancel = () => clearTimeout(timer)

  return nfn
}

export function throttle<T>(fn: Preview.TFun<T>, delay = 10) {
  let timer: null | number = null

  return function(...args: T[]) {
    if (timer !== null) { return }

    timer = setTimeout(
      () => (timer = null, fn.apply(this, args)),
      delay
    )
  }
}

export function withClick<T>(double: Preview.TFun<T>, click?: Preview.TFun<T>) {
  let count = 0

  const nclick = debounce<T>((...args) => (count = 0, click && click(...args)))

  return (...args: T[]) => {
    count += 1
    nclick(...args)

    // 双击
    if (count >= 2) {
      count = 0
      nclick.cancel()
      double(...args)
    }
  }
}

// 全屏
export const fullscreen = {
  request() {
    const element = document.documentElement
    const request = ['requestFullscreen', 'webkitRequestFullscreen', 'mozRequestFullScreen', 'msRequestFullscreen'].find(
      key => (key in element)
    )
    // @ts-ignore
    request && element[request]()
  },
  exit() {
    const exit = ['exitFullscreen', 'webkitExitFullscreen', 'mozCancelFullScreen', 'msExitFullscreen'].find(
      key => (key in document)
    )
    // @ts-ignore
    exit && document[exit]()
  },
  isFull() {
    // @ts-ignore
    return !!(document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement)
  }
}

export const addEventListener = (
  target: HTMLElement | Document | Window,
  type: string,
  listener: EventListenerOrEventListenerObject,
  options?: boolean | AddEventListenerOptions
) => {
  const cancels: Function[] = []

  type.trim().split(/\s\s*/).forEach(t => {
    target.addEventListener(t, listener, options)
    cancels.push(() => target.removeEventListener(t, listener, options))
  })

  return () => cancels.forEach(cancel => cancel())
}

// 获取touch事件
export const getTouchEvent = (): Preview.TTouchEvent => {
  const isTouchEvent = 'ontouchstart' in (window?.document?.documentElement || {})
  if (isTouchEvent) {
    return { start: 'touchstart', move: 'touchmove', end: 'touchend touchcancel' }
  }

  const isPointerEvent = 'PointerEvent' in window
  if (isPointerEvent) {
    return { start: 'pointerdown', move: 'pointermove', end: 'pointerup pointercancel' }
  }

  return { start: 'mousedown', move: 'mousemove', end: 'mouseup' }
}

// 获取 image 名称
export const getImageNameFromURL = (url: string) => {
  return decodeURIComponent(url.replace(/^.*\//, '').replace(/[?&#].*$/, '')) || ''
}

// 获取图片尺寸
export const getImageSize = (
  container: HTMLElement,
  naturalWidth: number,
  naturalHeight: number,
  offsetX = 0,
  offsetY = 0
) => {
  const pWidth = container.offsetWidth - offsetX
  const pHeight = container.offsetHeight - offsetY

  const percent = naturalWidth / naturalHeight
  const rWidth = percent * pHeight
  const rHeight = pWidth / percent

  // 处理图片过小
  // const pMWidth = pWidth / 2
  // const pMHeight = pHeight / 2
  // if (naturalWidth < pMWidth) {
  //   naturalWidth = pMWidth
  //   naturalHeight = pMWidth / percent
  // }
  // if (naturalHeight < pMHeight) {
  //   naturalHeight = pMHeight
  //   naturalWidth = pMHeight * percent
  // }

  let width, height
  if (naturalWidth > pWidth) {
    width = pWidth
    height = rHeight
  } else {
    width = naturalWidth
    height = naturalHeight
  }
  if (height > pHeight) {
    width = rWidth
    height = pHeight
  }

  return { width, height, naturalWidth, naturalHeight, pWidth, pHeight }
}

export const getImageStyle = (info: Preview.IImageInfo): React.CSSProperties => {
  const { width, height, rotate, offsetX, offsetY, turnX, turnY, isTransition } = info

  let transform = ''
  rotate && (transform += `rotate(${rotate}deg)`)
  turnX && (transform += ` scaleX(${turnX})`)
  turnY && (transform += ` scaleY(${turnY})`)

  const isInit = width === 1 || height === 1

  return {
    transform,
    width,
    height,
    msTransform: transform,
    WebkitTransform: transform,
    OTransform: transform,
    top: isInit ? '50%' : offsetY,
    left: isInit ? '50%' : offsetX,
    transition: isTransition ? 'all 0.15s' : ''
  }
}

export const getImageCenterOffset = (state: Preview.IImageInfo): Preview.IPosition => {
  const { pHeight, pWidth, width, height } = state

  return { offsetX: (pWidth - width) / 2, offsetY: (pHeight - height) / 2 }
}

export const getImageScale = (state: Preview.IImageInfo) => {
  const { width, naturalWidth } = state

  return +(width / naturalWidth).toFixed(2)
}

export const getZoomInfo = (to: number, imageInfo: Preview.IImageInfo, event?: any): Preview.IImageInfo => {
  const { zoomRatio } = imageInfo
  const nscale = getImageScale(imageInfo) * (1 + zoomRatio * to)
  return getScaleInfo(nscale, imageInfo, event)
}

export const getScaleInfo = (scale: number, imageInfo: Preview.IImageInfo, event?: any): Preview.IImageInfo => {
  const { width, height, offsetX, offsetY, minScale, maxScale, naturalWidth, naturalHeight } = imageInfo
  const nscale = Math.min(Math.max(minScale, scale), maxScale)
 
  const nwidth = nscale * naturalWidth
  const nheight = nscale * naturalHeight

  let noffsetX, noffsetY
  const ox = nwidth - width
  const oy = nheight - height
  if (!event) {
    noffsetX = offsetX - ox / 2
    noffsetY = offsetY - oy / 2
  } else {
    noffsetX = offsetX - ox * (event.clientX - offsetX) / width
    noffsetY = offsetY - oy * (event.clientY - offsetY) / height
  }

  return { ...imageInfo, offsetX: noffsetX, offsetY: noffsetY, width: nwidth, height: nheight }
}

export const getCurrent = (index: number, images: string[]) => {
  const max = images.length - 1
  index > max && (index = 0)
  index < 0 && (index = max)

  return index
}