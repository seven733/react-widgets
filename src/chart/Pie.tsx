import { sum } from 'd3-array'
import { DefaultArcObject, pie } from 'd3-shape'
import React, { SVGAttributes, useContext, useEffect, useState } from 'react'
import { ChartContext, Datum } from './Canvas'
import { CoordinateContext } from './Coordinate'
import Arc from './shapes/Arc'

export default function Pie(props: PieProps) {
  const { x, y, title, ...others } = props
  const { data, schema, color, bound: [top, right, bottom, left] } = useContext(ChartContext)
  const { dispatch } = useContext(CoordinateContext)
  const [index, setIndex] = useState<number>()

  useEffect(() => {
    dispatch({ type: '', payload: { index, axisBase: x } })
  }, [dispatch, index, schema, x])

  const radius = Math.min(right - left, bottom - top) / 2
  const arcs = pie<Datum>().padAngle(0.005)
    .sort((a, b) => (b[y] as number) - (a[y] as number))
    .value(d => d[y] as number)(data)

  const total = sum(data.map(d => d[y] as number))

  return (
    <g transform={`translate(${(right + left) / 2}, ${(top + bottom) / 2})`} {...others}>
      {total !== 0
        ? arcs.map((arc, i) => {
          const params: DefaultArcObject = {
            startAngle: arc.startAngle,
            endAngle: arc.endAngle,
            innerRadius: radius * 0.5,
            outerRadius: radius - 10,
          }

          return (
            <Arc
              key={i}
              fill={color(arc.data[x].toString())}
              params={params}
              onMouseEnter={() => setIndex(i)}
              onMouseLeave={() => setIndex(undefined)} />
          )
        })
        : null}
      <text dy='0.5em' textAnchor='middle' >{total !== 0 ? title : (title || '') + '无数据'}</text>
    </g>
  )
}

type PieProps = SVGAttributes<SVGGElement> & {
  x: keyof Datum
  y: keyof Datum
  title?: string
}
