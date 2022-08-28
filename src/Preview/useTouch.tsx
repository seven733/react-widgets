import React, { useEffect } from 'react'

import { throttle, getTouchEvent, addEventListener, getZoomInfo } from './util'

const useTouch = (target: React.MutableRefObject<HTMLElement>, setInfo: TSetInfo) => {
  const event = getTouchEvent()
  const isTouch = event.start.includes('touch')
  
  useEffect(
    () => {
      const elem = target.current
      if (!elem) { return }

      const startCancel = isTouch
        ? addEventListener(elem, event.start, e => handleTouchMobile(setInfo)(e as TouchEvent, event))
        : addEventListener(elem, event.start, e => handleTouchPc(setInfo)(e as TTouchPc, event))

      return () => startCancel()
    },
    []
  )

  return isTouch
}

export default useTouch

type THandleTouch<T> = (event: T) => void
const handleTouch = <T extends Event>(onStart: THandleTouch<T>, onMove: THandleTouch<T>, onEnd: THandleTouch<T>) => {
  let doing = false

  return (e: T, touchEvent: Preview.TTouchEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (doing) { return }
    doing = true
  
    onStart(e)

    const target = e.currentTarget as HTMLElement
    const moveCancel = addEventListener(target, touchEvent.move, throttle(
      (e: T) => {
        e.preventDefault()
        e.stopPropagation()

        if (!doing) { return }
  
        onMove(e)
      }
    ))
    const endCancel = addEventListener(target, touchEvent.end,
      (e: T) => {
        e.preventDefault()
        e.stopPropagation()

        if (!doing) { return }

        onEnd(e)

        doing = false
        moveCancel()
        endCancel()
      }
    )
  }
}

type TTouchPc = PointerEvent | MouseEvent
type TSetInfo = React.Dispatch<React.SetStateAction<Preview.IImageInfo>>
const handleTouchPc = (setInfo: TSetInfo) => {
  let start: Preview.IMovePosition, isTransition: boolean

  return handleTouch<TTouchPc>(
    e => { start = getPosition(e) },
    e => {
      const end: Preview.IMovePosition = getPosition(e)

      if (end.id === start.id) {
        const move = getMovePosition(start, end)
        move && setInfo(prev => {
          isTransition === void 0 && (isTransition = prev.isTransition)
          return { ...prev, offsetX: prev.offsetX + move.x, offsetY: prev.offsetY + move.y, isTransition: false }
        })

        start = { ...end }
      }
    },
    () => { setInfo(prev => isTransition === void 0 ? prev : ({ ...prev, isTransition })); isTransition = start = void 0 }
  )
}

const handleTouchMobile = (setInfo: TSetInfo) => {
  let isMove = false, isScale = false, now = 0, start: Preview.IMovePositions, isTransition: boolean

  return handleTouch<TouchEvent>(
    e => {
      const length = e.touches?.length ?? 0

      if (length) {
        start = getPositions(e)

        if (length >= 2) {
          isScale = true
        } else {
          const curr = Date.now()
          if (now && curr - now <= 250) {
            // todo 双击
          } else {
            isMove = true
          }
          now = curr
        }
      }
    },
    e => {
      const length = e.touches?.length ?? 0

      if (length) {
        const end = getPositions(e)

        if (length >= 2) {
          if (isScale) {
            const pos: [Preview.IMovePosition, Preview.IMovePosition][] = []
            Object.keys(end).forEach(k => {
              const s = start[k]
              const e = end[k]

              s && e && pos.push([s, e])
            })

            if (pos.length > 1) {
              const scale = 1 - getDistance(pos[0][0], pos[1][0]) / getDistance(pos[0][1], pos[1][1])
              const center = getCenterPosition(pos[0][0], pos[1][0])
              !isNaN(scale) && center && setInfo(prev => getZoomInfo(scale, prev, { clientX: center.x, clientY: center.y }))
            }
          }
        } else {
          if (isMove) {
            const curr = Object.keys(end).find(key => !!start[key])
            
            if (curr !== undefined) {
              const move = getMovePosition(start[curr], end[curr])
              move && setInfo(prev => {
                isTransition === void 0 && (isTransition = prev.isTransition)
                return { ...prev, offsetX: prev.offsetX + move.x, offsetY: prev.offsetY + move.y, isTransition: false }
              })

              start = { ...end }
            }
          }
        }
      }
    },
    () => {
      setInfo(prev => isTransition === void 0 ? prev : ({ ...prev, isTransition }));
      isTransition = start = void 0; now = 0; isMove = isScale = false }
  )
}

const getPosition = (e: PointerEvent | MouseEvent): Preview.IMovePosition => (
  { id: (e instanceof PointerEvent) ? e.pointerId : 0, x: e.clientX, y: e.clientY }
)

const getPositions = (e: TouchEvent): Preview.IMovePositions => Array.prototype.slice.call(e.touches).reduce(
  (prev: Preview.IMovePositions, curr: Touch) => {
    const key = curr.identifier ?? 0
    return { ...prev, [key]: { id: key, x: curr.clientX, y: curr.clientY } }
  },
  {}
)

const getMovePosition = (start: Preview.IMovePosition, end: Preview.IMovePosition) => {
  const x = end.x - start.x
  const y = end.y - start.y

  return (isNaN(x) || isNaN(y)) ? void 0 : { x, y }
}

const getDistance = (start: Preview.IMovePosition, end: Preview.IMovePosition) => {
  const x = Math.abs(start.x - end.x)
  const y = Math.abs(start.y - end.y)
  const z = Math.sqrt((x * x) + (y * y))

  return z
}

const getCenterPosition = (start: Preview.IMovePosition, end: Preview.IMovePosition) => {
  const x = start.x + end.x
  const y = start.y + end.y

  return (isNaN(x) || isNaN(y)) ? void 0 : { x: x / 2, y: y / 2 }
}
