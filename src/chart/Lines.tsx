import anime from 'animejs'
import { curveMonotoneX, line, curveMonotoneY } from 'd3-shape'
// @ts-ignore
import { minIndex } from 'd3-array'
import React, { useContext, useEffect, SVGAttributes, useRef, useMemo } from 'react'
import { ChartContext, Datum } from './Canvas'
import { CoordinateContext } from './Coordinate'

export default function LineChart(props: LineChartProps) {
  const ref = useRef<SVGGElement>()
  const { series, straight, ...others } = props

  const { data, color, schema, cursor } = useContext(ChartContext)
  const { state: { scaleX, scaleY, axisBase, horizontal }, dispatch } = useContext(CoordinateContext)

  const index = useMemo(() => {
    if (!cursor) return undefined
    return horizontal
      // @ts-ignore
      ? minIndex(data, (d: Datum) => Math.abs(cursor.y - scaleY(d[axisBase])))
      // @ts-ignore
      : minIndex(data, (d: Datum) => Math.abs(cursor.x - scaleX(d[axisBase])))
  }, [cursor, horizontal, data, scaleY, axisBase, scaleX])

  useEffect(() => {
    dispatch({ type: '', payload: { index } })
  }, [dispatch, index])

  useEffect(() => {
    if (!scaleX || !scaleY) return
    const animation = anime({
      targets: ref.current.querySelectorAll('path'),
      opacity: [0, 1],
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'linear',
      duration: 1000,
      autoplay: false,
    })
    animation.play()

    return () => {
      !animation.completed && animation.seek(animation.duration)
    }
  }, [scaleX, scaleY])

  if (!scaleX || !scaleY) return <g></g>

  return (
    <g ref={ref} {...others} >
      {series.map(serial => {
        const generator = line<Datum>()
          .defined(d => !isNaN(d[serial] as number))
          // @ts-ignore
          .x(d => horizontal ? scaleX(d[serial] as number) : scaleX(d[axisBase]))
          // @ts-ignore
          .y(d => horizontal ? scaleY(d[axisBase]) : scaleY(d[serial] as number))

        let d = !straight ? generator.curve(horizontal ? curveMonotoneY : curveMonotoneX)(data) : generator(data)

        return (
          <path key={serial} d={d} fill='none' stroke={color(schema[serial])} strokeWidth='1.5' />
        )
      })}
    </g>
  )
}

type LineChartProps = SVGAttributes<SVGGElement> & {
  series: (keyof Datum)[]
  straight?: boolean
}
