import moment from 'moment'
import { transparentize } from 'polished'
import React, { SVGAttributes, useContext, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { ChartContext, Datum } from './Canvas'
import { CoordinateContext } from './Coordinate'

const TooltipWrapper = styled.g`
  pointer-events: none;
  >path {
    fill: none;
    stroke-width: 0.2;
    stroke: #000;
    opacity: 0.5;
  }
`

const Tips = styled.foreignObject`
  padding: 5px;
  position: relative;

  >div {
    background: ${transparentize(0.2, '#fff')};
    display: inline-block;
    padding: 8px;
    backdrop-filter: blur(5px);
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 8px 0px;
    max-width: max-content;
  }

  dl {
    margin-block-start: 0;
    margin-block-end: 0;
  }

  dt{
    display: inline;
    ::after {
      content: ':'
    }
  }

  dd {
    display: inline;
    margin-inline-start: 0.5em;
  }
`

export default function Tooltip(props: TooltipProps) {
  const ref = useRef<HTMLDivElement>()
  const { series, children, formatX, formY = [], colored = true, ...others } = props
  const { data, schema, bound: [top, right, bottom, left], cursor, color, format } = useContext(ChartContext)
  const { state: { axisBase, scaleX, scaleY, index, horizontal } } = useContext(CoordinateContext)
  const [height, setHeight] = useState(400)
  const [width, setWidth] = useState(300)

  // 是否是时间相关的横坐标
  const isDate = useMemo(() => {
    if (index === undefined) return false
    return data[index][axisBase] instanceof Date
  }, [data, index, axisBase])

  const d = useMemo(() => {
    if (cursor && index !== undefined && typeof data[0][axisBase] !== 'string') {
      return horizontal
        // @ts-ignore
        ? `M ${left}, ${scaleY(data[index][axisBase])} h ${right - left - 10}`
        // @ts-ignore
        : `M ${scaleX(data[index][axisBase])}, ${bottom} v ${top - bottom - 10}`
    }
    return ''
  }, [cursor, index, data, axisBase, horizontal, scaleY, left, right, scaleX, bottom, top])

  useEffect(() => {
    // TODO: 待优化，防止统一tip随定位变化
    if (cursor && index !== undefined) {
      const { width, height } = ref.current.getBoundingClientRect()
      const w = Math.min(Math.ceil(width) + 15, right - left)
      setHeight(Math.ceil(height) + 15)
      setWidth(w)
    }
  }, [cursor, index, right, left])

  const x = useMemo(() => {
    if (!cursor || index === undefined) return 0

    // tooltip是在太长，则横向居中显示
    if (width > (right - left) * 0.55) {
      return (right + left - width) / 2
    }

    let x = cursor.x + 4

    // 左侧溢出，则将x显示在右侧，右侧溢出则显示在左侧
    if (x < left) x = cursor.x + 4
    if (x + width > right) x = cursor.x - width - 4
    return x
  }, [cursor, index, left, right, width])

  const y = useMemo(() => {
    if (!cursor || index === undefined) return 0
    return cursor.y + height > bottom ? cursor.y - height : cursor.y
  }, [bottom, cursor, height, index])

  return (
    <TooltipWrapper {...others}>
      {cursor && index !== undefined && (
        <>
          <path d={d} />
          <Tips x={x} y={y} width={width} height={height}>
            <div ref={ref}>
              {children || <>
                <dl>
                  <dt>{schema[axisBase]}</dt>
                  <dd>
                    {formatX
                      ? formatX(data[index][axisBase] as number)
                      : `${isDate ? moment(data[index][axisBase]).format('YY-MM-DD') : data[index][axisBase]}`}
                  </dd>
                </dl>
                {series.map((serial, i) => data[index][serial] !== undefined && (
                  <dl key={serial}>
                    <dt style={{ color: colored ? color(schema[serial]) : undefined }}>{schema[serial]}</dt>
                    <dd>
                      {formY.length > i && formY[i]
                        ? format(formY[i])(data[index][serial] as number) : data[index][serial]}
                    </dd>
                  </dl>
                ))}
              </>}
            </div>
          </Tips>
        </>
      )}
    </TooltipWrapper>
  )
}

type TooltipProps = SVGAttributes<SVGGElement> & {
  title?: string
  series: (keyof Datum)[]
  formatX?: (value: number) => string
  formY?: string[]
  colored?: boolean
}
