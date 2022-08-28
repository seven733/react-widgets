import { sum } from 'd3-array'
import { scaleBand } from 'd3-scale'
import React, { SVGAttributes, useCallback, useContext, useRef } from 'react'
import { ChartContext, Datum } from './Canvas'
import { CoordinateContext } from './Coordinate'
import Rect from './shapes/Rect'

export default function Bars(props: BarsProps) {
  const ref = useRef<SVGGElement>()
  const { series, stacked, padding = 0, ...others } = props
  const { data, schema, color, bound: [, , bottom, left] } = useContext(ChartContext)
  const { state: { scaleY, scaleX, axisBase, horizontal = false }, dispatch } = useContext(CoordinateContext)

  const handleMouseEnter = useCallback((index: number) => dispatch({ type: '', payload: { index } }), [dispatch])
  const handleMouseLeave = useCallback(() => dispatch({ type: '', payload: { index: undefined } }), [dispatch])

  if (data.length === 0 || !scaleX || !scaleY) return null

  if (!stacked) {

    // @ts-ignore
    const scaleKey = scaleBand().domain(series as string[]).range([0, (horizontal ? scaleY : scaleX).bandwidth()])
      .padding(padding)

    return (
      <g ref={ref} {...others}>
        {data.map((d, index) => series.map(key => {
          // @ts-ignore
          const x = horizontal ? left : scaleX(d[axisBase]) + scaleKey(key)
          // @ts-ignore
          const y = horizontal ? (scaleY(d[axisBase]) || 0) + scaleKey(key) : scaleY(d[key])
          // @ts-ignore
          const width = horizontal ? scaleX(d[key]) : scaleKey.bandwidth()
          const height = horizontal ? scaleKey.bandwidth() : bottom - y

          return (
            <Rect key={key} fill={color(schema[key])} horizontal={horizontal}
              x={x} y={y}
              width={width} height={height}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave} />)
        }))}
      </g>)
  } else {
    return (
      <g ref={ref} {...others}>
        {data.map((d, index) => series.map((key, i) => {
          // @ts-ignore
          const x = horizontal ? scaleX(sum(series.filter((_, j) => j < i), k => d[k])) : scaleX(d[axisBase])
          // @ts-ignore
          const y = horizontal ? scaleY(d[axisBase]) : scaleY(sum(series.filter((_, j) => j <= i), k => d[k]))
          // @ts-ignore
          const width = horizontal ? scaleX(d[key]) - left : scaleX.bandwidth()
          // @ts-ignore
          const height = horizontal ? scaleY.bandwidth() : bottom - scaleY(d[key])

          return (
            <Rect key={key} fill={color(schema[key])} horizontal={horizontal}
              x={x} y={y}
              width={width} height={height}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave} />)
        }))}
      </g>)
  }
}

type BarsProps = SVGAttributes<SVGGElement> & {
  series: (keyof Datum)[]
  stacked?: boolean
  padding?: number
}

