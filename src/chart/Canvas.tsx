import anime from 'animejs'
import { format, formatLocale, FormatLocaleDefinition } from 'd3-format'
import { scaleOrdinal } from 'd3-scale'
import { debounce, isEqual } from 'lodash'
import React, {
  createContext,
  Dispatch, MouseEventHandler,
  Reducer, SVGAttributes, useCallback, useEffect, useMemo,
  useReducer, useRef, useState
} from 'react'
import styled from 'styled-components'

const isWebkit = /WebKit/.test(navigator.userAgent)

export const schemeCategory10 = [
  '#12CD9F', '#4D9BFF', '#5D7092', '#FEB857', '#FF6159', '#597EF7', '#9254DE', '#FF7A45', '#73D13D', '#F759AB'
]

const StyledSVG = styled.svg`
  width: 100%;
  height: 320px;
  fill: #666;
  position: relative;
`

const axialSetReducer: Reducer<Set<string>, { type: 'ADD_AXIS', payload: { axis: string } }> = (state, action) => {
  const { payload: { axis } } = action
  return state.add(axis)
}

interface ChartContextState {
  data: Datum[]
  color: (value: string) => string
  bound: [number, number, number, number]
  schema: Record<keyof Datum, string>
  cursor?: { x: number, y: number }
  format: (specifier: string) => (n: number | { valueOf(): number }) => string
  dispatch?: Dispatch<{ type: "ADD_AXIS"; payload: { axis: string }; }>
}

const defalueContext: ChartContextState = {
  data: [], color: (value: string) => value, bound: [0, 900, 320, 0], schema: {}, format: format
}

export const ChartContext = createContext<ChartContextState>(defalueContext)

export default function Canvas(props: CanvasProps) {
  const ref = useRef<SVGSVGElement>()
  const { data, schema, colors = [], scaleColor, locale, children, ...others } = props

  const [axialSet, dispatch] = useReducer(axialSetReducer, new Set<string>())

  const f = locale
    ? formatLocale(locale).format
    : formatLocale({ decimal: '.', thousands: ',', grouping: [3], currency: ['¥', ''] }).format

  // 维护真实的宽高数据，用于边框范围和bound的计算
  const [height, setHeight] = useState(320)
  const [width, setWidth] = useState(900)
  const [cursor, setCursor] = useState<{ x: number, y: number }>()

  // 内部可用图表区域的大小，上右下左
  const [bound, setBound] = useState([0, 900, 320, 0] as [number, number, number, number])

  const color = useMemo(() => {
    return scaleColor
      ? scaleColor
      : scaleOrdinal<string>()
        .domain(Object.values(schema).filter(v => !axialSet.has(v)))
        .range(colors.length > 0 ? colors : schemeCategory10)
  }, [scaleColor, schema, colors, axialSet])

  const offset = 16

  const resize = useCallback(debounce(() => {
    setHeight(ref.current!.clientHeight)
    setWidth(ref.current!.clientWidth)
  }, 100), [ref.current])

  useEffect(() => {
    setHeight(ref.current?.clientHeight || 320)
    setWidth(ref.current?.clientWidth || 900)

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      let b = [0, width, height, 0] as [number, number, number, number]

      ref.current?.querySelectorAll<SVGGraphicsElement>('.bound').forEach(ele => {
        const { x, y, width: w, height: h } = ele.getBBox()
        const atTop = w > width / 2 && y < height / 2
        const atBottom = w > width / 2 && y < height / 2
        const atLeft = h > height / 2 && x < width / 2
        const atRight = h > height / 2 && x > width / 2
        if (atTop) b[0] = b[0] + h
        if (atBottom) b[2] = b[2] - h
        if (atLeft) b[3] = b[3] + w
        if (atRight) b[1] = b[1] - w
      })

      if (b[0] < offset) b[0] = offset
      if (b[1] > width - offset) b[1] = width - offset
      if (b[2] > height - offset) b[2] = height - offset
      if (b[3] < offset) b[3] = offset

      !isEqual(b, bound) && setBound([...b] as [number, number, number, number])
    }, 20)

    return () => {
      clearTimeout(timer)
    }
  }, [width, height, data, bound])

  useEffect(() => {
    const animation = anime({
      targets: ref.current,
      opacity: [0, 1]
    })

    return () => {
      !animation.completed && animation.seek(animation.duration)
    }
  }, [ref])

  const handleMouseMove: MouseEventHandler<SVGSVGElement> = useCallback((e) => {
    // @ts-ignore
    const { layerX, layerY, offsetX, offsetY } = e.nativeEvent
    const x = isWebkit ? offsetX : layerX
    const y = isWebkit ? offsetY : layerY
    setCursor({ x, y })
  }, [])

  const handleMouseLeave: MouseEventHandler<SVGSVGElement> = (_) => setCursor(undefined)

  return (
    <StyledSVG {...others} ref={ref} opacity={0} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <ChartContext.Provider value={{ data, bound, color, schema, cursor, format: f, dispatch }}>
        {children}
      </ChartContext.Provider>
    </StyledSVG>
  )
}

export type DatumValue = string | number | Date

export interface Datum {
  [key: string]: string | number | Date
}

export type CanvasProps = SVGAttributes<SVGSVGElement> & {
  height?: number
  data: Datum[]
  schema: Record<keyof Datum, string> // 定义每个key对应显示的label
  colors?: string[]
  scaleColor?: (value: string) => string
  locale?: FormatLocaleDefinition
}
