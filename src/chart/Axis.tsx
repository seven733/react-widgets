import { max, min, sum } from 'd3-array'
import { ScaleBand, scaleLinear, ScaleLinear, ScaleTime, scaleTime, scaleBand } from 'd3-scale'
import { timeDay, timeMonth } from 'd3-time'
import { timeFormat } from 'd3-time-format'
import moment from 'moment'
import React, { SVGAttributes, useContext, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import { getMagnitude, Magnitudes } from '../utils/config'
import { ChartContext, Datum, DatumValue } from './Canvas'
import { CoordinateContext } from './Coordinate'

const AxisWithTick = styled.g`
  path {
    stroke: #eee;
    stroke-width: 2px;
  }
`

const Dashs = styled.g`
  path {
    stroke: #eee;
    stroke-dasharray: 4;
  }
`

const Unit = styled.foreignObject`
  font-size: 0.8em;
  position: relative;
  overflow: visible;
  >label {
    position: absolute;
    margin: 0;
  }
`

export default function Axis(props: AxisElementProps) {
  const ref = useRef<SVGGElement>()
  const {
    series, tickCount = 5, showTicks, position = 'bottom', showDashs, form, unit, visible = true,
    stacked, barPadding = 0.6, outerPadding = 0.4, min: minimum, max: maximum, className, ...others
  } = props
  const [fontSize, setFontSize] = useState<number>(16)
  const { data, bound, format, schema, dispatch: axisDispatch } = useContext(ChartContext)
  const { dispatch, state: { scaleX, scaleY, horizontal } } = useContext(CoordinateContext)

  useEffect(() => {
    if (data.length > 0 && ref.current) {
      setFontSize(parseInt(getComputedStyle(ref.current).fontSize.replace('px', '')))
    }
  }, [data, scaleX])

  const isString = useMemo(() => data.length > 0 && typeof data[0][series[0]] === 'string', [data, series])
  const isDate = useMemo(() => data.length > 0 && data[0][series[0]] instanceof Date, [data, series])
  const extent = useMemo(() => {
    const minimumValue = minimum !== undefined
      ? minimum
      : stacked
        ? min(data, d => sum(series, key => d[key] as number))
        : min(data, d => min(series, key => d[key] as number | Date))
    const maximumValue = maximum !== undefined
      ? maximum
      : stacked
        ? max(data, d => sum(series, key => d[key] as number))
        : max(data, d => max(series, key => d[key] as number | Date))
    return [minimumValue, maximumValue]
  }, [data, maximum, minimum, series, stacked])

  const magitude = useMemo(() => getMagnitude(max(data, d => max(series, key => d[key] as number)))
    , [data, series])

  useEffect(() => {
    // 计算scale并同步到context中
    const [top, right, bottom, left] = bound

    let scale = undefined
    if (isDate) {
      // Date类型使用scaleTime映射
      scale = scaleTime()
        .domain(extent).range(position === 'bottom' ? [left, right] : [bottom, top])
    } else if (isString) {
      // string类型使用scaleBand映射
      scale = scaleBand<DatumValue>()
        .domain(data.map(d => d[series[0]]))
        .range(position === 'bottom' ? [left, right] : [bottom, top])
        .padding(barPadding).paddingOuter(outerPadding)
    } else {
      // 其他类型使用scaleLinear映射
      scale = scaleLinear().domain(extent)
        .rangeRound(position === 'bottom' ? [left, right] : [bottom, top])
    }

    if (position === 'bottom') {
      if (horizontal) {
        dispatch({ type: '', payload: { scaleX: scale } })
      } else {
        dispatch({ type: '', payload: { scaleX: scale, axisBase: series[0] } })
        axisDispatch({ type: 'ADD_AXIS', payload: { axis: schema[series[0]] } })
      }
    } else {
      if (horizontal) {
        dispatch({ type: '', payload: { scaleY: scale, axisBase: series[0] } })
        axisDispatch({ type: 'ADD_AXIS', payload: { axis: schema[series[0]] } })
      } else {
        dispatch({ type: '', payload: { scaleY: scale } })
      }
    }

  }, [
    axisDispatch, barPadding, bound, data, dispatch, extent, horizontal,
    isDate, isString, outerPadding, position, schema, series
  ])

  const scale = useMemo(() => {
    if (!scaleX || !scaleY) return undefined
    return position === 'bottom' ? scaleX : scaleY
  }, [position, scaleX, scaleY])

  const ticks = useMemo(() => {
    if (!scale) return []
    else if (isString) {
      return data.map(d => d[series[0]])
    } else if (isDate) {
      // 横坐标为时间时，评估其时间跨度，14天以上按周显示，10周以上按月显示
      let interval = timeDay.every(1)
      const [start, end] = extent

      const needMonthStep = moment(end).diff(start, 'days') > 14
      if (needMonthStep) interval = timeMonth.every(1)
      const ticks = (scale as ScaleTime<number, number>).ticks(interval) || []
      ticks.length > 0 && moment(ticks[0]).diff(start, 'd') > 28 && ticks.unshift(start as Date)

      return ticks
    } else {
      return (scale as ScaleLinear<number, number>).ticks(tickCount) || []
    }

  }, [data, extent, isDate, isString, scale, series, tickCount])

  const scaledTicks = useMemo(() => {
    // @ts-ignore
    return ticks.map(t => scale ? (scale(t) || 0) : 0)
  }, [scale, ticks])

  const d = useMemo(() => {
    const [top, right, bottom, left] = bound

    let _d = ''
    if (position === 'bottom') {
      _d = `M ${left}, ${bottom} h ${right - left}`
      if (showTicks) {
        _d = `${_d} ${scaledTicks.map((t, index) => index ? `M ${t}, ${bottom} v 10 ` : '').join('')}`
      }
    }

    if (position === 'left') {
      _d = `M ${left}, ${bottom} v ${top - bottom}`
      if (showTicks) {
        _d = `M ${_d} ${scaledTicks.map((t, index) => index ? `M ${left}, ${t} h -5 ` : '').join('')}`
      }
    }

    if (position === 'right') {
      _d = `M ${right}, ${bottom} v ${top - bottom}`
      if (showTicks) {
        _d = `M ${_d} ${scaledTicks.map((t, index) => index ? `M ${right}, ${t} h -5 ` : '').join('')}`
      }
    }

    return _d
  }, [bound, position, showTicks, scaledTicks])

  const gridD = useMemo(() => {
    const [top, right, bottom, left] = bound
    if (position === 'bottom') {
      return `${scaledTicks.map((t, index) => index ? `M ${t}, ${bottom} v ${top - bottom} ` : '').join('')}`
    } else {
      return `${scaledTicks.map((t, index) => index ? `M ${left}, ${t} h ${right - left} ` : '').join('')}`
    }
  }, [bound, position, scaledTicks])

  const defautFormatter = useMemo(() => {
    let defautFormatter: (value: number | Date) => string = Magnitudes.get(magitude)

    if (isDate) {
      defautFormatter = timeFormat('%y-%m-%d')
    }
    return defautFormatter

  }, [isDate, magitude])

  const [top, right, bottom, left] = bound

  const available: number = useMemo(() => isString && scale ? (scale as ScaleBand<DatumValue>).step() : 0
    , [isString, scale])
  const reg = useMemo(() => new RegExp(`(^.{${Math.floor(available / fontSize - 1)}}).*$`)
    , [available, fontSize])

  if (!scale) return null

  const unitText = magitude + (unit ? `(${unit})` : '')

  const temp = top - 1.5 * fontSize

  return (
    <g>
      {!isDate && !isString && (
        position === 'bottom'
          ? (
            <Unit className='bound'
              x={right} y={top} width={`${unitText.length + 1}em`} height={bottom - top}>
              <label style={{ bottom: 0, transform: 'translate(0.5em, 1em)' }}>{unitText}</label>
            </Unit>)
          : (
            <Unit className="bound"
              x={0} y={temp < 0 ? 0 : temp} width='100%' height='1.5em'>
              <label style={position === 'left' ? { left: 0 } : { right: 0 }}>{unitText}</label>
            </Unit>))}
      {visible && (
        <AxisWithTick className={`bound ${className}`} {...others} ref={ref}>
          <path fill='none' d={d} />
          {isString && !horizontal && (ticks as string[]).map((tick, index) => {
            const label = tick.length * fontSize > available ? tick.replace(reg, '$1...') : tick

            return (
              <text key={index.toString()}
                // @ts-ignore
                x={scaledTicks[index] + (scale?.bandwidth() || 0) / 2}
                y={bottom + fontSize + (showTicks ? 4 : 0)}
                textAnchor='middle'>
                {label}
              </text>)
          })}
          {position === 'bottom' && !isString && ticks.map((tick, index) => {
            let align = 'middle'
            if (index === 0) align = 'start'
            if (index === ticks.length - 1) align = 'end'

            return (
              <text key={index.toString()}
                x={scaledTicks[index]}
                y={bottom + fontSize + (showTicks ? 4 : 0)}
                textAnchor={align}>
                {form ? (isDate
                  ? timeFormat(form)(tick as Date) : format(form)(tick as number))
                  : defautFormatter(tick as number)}
              </text>)
          })}
          {position === 'left' && ticks.map((tick, index) => (
            <text key={index.toString()}
              x={left - (showTicks ? 14 : 4)}
              // @ts-ignore
              y={scaledTicks[index] + fontSize / 2 - 4 + (horizontal && isString ? (scale?.bandwidth() / 2) : 0)}
              textAnchor='end'>
              {form ? format(form)(tick as number) : defautFormatter(tick as number)}
            </text>))}
          {position === 'right' && ticks.map((tick, index) => (
            <text key={index.toString()}
              x={right + (showTicks ? 14 : 4)}
              // @ts-ignore
              y={scaledTicks[index] + fontSize / 2 - 4 + (horizontal && isString ? (scale?.bandwidth() / 2) : 0)}
              textAnchor='start'>
              {form ? format(form)(tick as number) : defautFormatter(tick as number)}
            </text>))}
        </AxisWithTick>)}
      {showDashs && (<Dashs><path fill='none' d={gridD} /></Dashs>)}
    </g>
  )
}

type AxisElementProps = SVGAttributes<SVGGElement> & {
  series: (keyof Datum)[]
  tickCount?: number
  showTicks?: boolean
  showDashs?: boolean
  form?: string
  position?: 'left' | 'right' | 'bottom'
  unit?: string
  visible?: boolean
  stacked?: boolean
  barPadding?: number
  outerPadding?: number
  min?: number
  max?: number
}

