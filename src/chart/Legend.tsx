import React, { SVGAttributes, useContext, useEffect, useRef, useState, useMemo } from 'react'
import styled, { css } from 'styled-components'
import { ChartContext } from './Canvas'
import { CoordinateContext } from './Coordinate'

const Wrapper = styled.foreignObject<{ type: 'stroke' | 'block' | 'spot' }>`
  float: right;
  text-align: right;

  >div {
    line-height: 1;
    margin-bottom: 4px;
  }

  label {
    position: relative;
    display: inline-flex;
    margin: 0 0 0 8px;
    i {
      display: block;
      height: ${props => props.type === 'stroke' ? `2px` : `1em`};
      width: 1em;
      min-width: 1em;
      margin: 0 4px;
      border-radius: 2px;
      align-self: center;
      ${({ type }) => type === 'spot' && css`
        width: 0.5em;
        min-width: 0.5em;
        height: 0.5em;
        border-radius: 50%;
      `}
    }
  }
`

const Marker = styled.i<{ color: string }>`
  background: ${props => props.color};
`

export default function Legend(props: ChartLegendProps) {
  const ref = useRef<HTMLDivElement>()
  const { type = 'stroke', series, formatter, className, ...others } = props
  const [height, setHeight] = useState(20)
  const { color, data, schema, bound: [top, right, bottom, left] } = useContext(ChartContext)
  const { state: { axisBase } } = useContext(CoordinateContext)

  const values = useMemo(() => {
    if (series) return series
    return Object.values(schema).filter(v => v !== schema[axisBase])
  }, [schema, axisBase, series])

  useEffect(() => {
    setHeight(ref.current?.offsetHeight || 20)
  }, [data, top, right, bottom, left])

  return (
    <Wrapper {...others} className='bound' x={left} width={right - left - 32} height={height}
      type={type} >
      <div ref={ref} className={className}>
        {
          //@ts-ignore
          values.map((l, i) => <label key={i}><Marker color={color(l as string)} />{formatter ? formatter(l) : l}</label>)
        }
      </div>
    </Wrapper>
  )
}

type ChartLegendProps = SVGAttributes<SVGForeignObjectElement> & {
  type?: 'stroke' | 'block' | 'spot'
  series?: (number | Date | string)[]
  formatter?: (value: number | Date | string) => string
}
