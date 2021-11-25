import React, { SVGAttributes, useContext } from 'react'
import styled from 'styled-components'
import { ChartContext, Datum } from './Canvas'
import { CoordinateContext } from './Coordinate'

const Point = styled.circle`
  fill: ${props => props.theme.colors.background};
  box-shadow: 10px 5px 5px red;
`

export default function Points(props: PointProps) {
  const { series } = props

  const { data, color, schema } = useContext(ChartContext)
  const { state: { scaleX, scaleY, axisBase, horizontal } } = useContext(CoordinateContext)

  if (!scaleX || !scaleY) return null

  return (
    <g>
      {series.map((serial: string) => data
        .map((d, i) => (
          <Point key={serial + i}
            // @ts-ignore
            cx={scaleX(d[horizontal ? serial : axisBase])}
            // @ts-ignore
            cy={scaleY(d[horizontal ? axisBase : serial])}
            r='3'
            stroke={color(schema[serial])} />)))}
    </g>
  )
}

type PointProps = SVGAttributes<SVGGElement> & {
  series: (keyof Datum)[]
}
