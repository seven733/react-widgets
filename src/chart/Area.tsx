import anime from 'animejs'
import { Area as A, area, curveMonotoneX } from 'd3-shape'
import React, { SVGAttributes, useCallback, useRef, useContext, useEffect } from 'react'
import { ChartContext, Datum } from './Canvas'
import { CoordinateContext } from './Coordinate'

export default function Area(props: AreaProps) {
  const ref = useRef<SVGGElement>()
  const { y0, y1, ...others } = props

  const { data, schema, color } = useContext(ChartContext)
  const { state: { scaleX, scaleY, axisBase: serialX } } = useContext(CoordinateContext)

  const a = useCallback(scaleX ? area<Datum>().curve(curveMonotoneX)
    // @ts-ignore
    .x(d => scaleX(d[serialX])).y0(d => scaleY(d[y0] as number)).y1(d => scaleY(d[y1] as number)) : () => { },
    [serialX, scaleX, scaleY])

  useEffect(() => {
    if (!scaleX || !scaleY) return
    const animation = anime({
      targets: ref.current?.querySelectorAll('path'),
      opacity: [0, 1],
      easing: 'linear',
      duration: 1000,
      autoplay: false,
      delay: 1000,
    })
    animation.play()

    return () => {
      !animation.completed && animation.seek(animation.duration)
    }
  }, [scaleX, scaleY])

  if (!scaleX || !scaleY) return null

  return (
    <g ref={ref} {...others}>
      <path d={(a as A<Datum>)(data)} style={{ fill: color(schema[y1]) }} />
    </g>
  )
}

type AreaProps = SVGAttributes<SVGGElement> & {
  y0: keyof Datum
  y1: keyof Datum
}
