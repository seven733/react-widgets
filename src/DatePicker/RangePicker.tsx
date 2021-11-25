import moment from 'moment'
import React, {
  MouseEventHandler, HtmlHTMLAttributes,
  useEffect, useMemo, useRef, useState
} from 'react'
import styled, { css } from 'styled-components'
import useClickOutSide from '../hooks/useClickOutSide'
import { CalendarWrapper, StyledCalendar, Wrapper, DoubleArrow, Arrow } from './style'
import {formatDate} from "./index"

const RangeWrapper = styled(Wrapper)`
  background: #fff;
  border: 1px solid ${({ theme }) => theme.colors.border};
  :hover {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }

  input { 
    width: 8em;
  }

  svg[hidden] {
    display: block;
  }
`

const hideArrow = ({ hidden = false }) => hidden && css`
    opacity: 0;
    pointer-events: none;
  `

const StyledArrow = styled(Arrow) <{ hidden: boolean }>`
  ${hideArrow}
`

const StyledDoubleArrow = styled(DoubleArrow) <{ hidden: boolean }>`
  ${hideArrow}
`

const Input = styled.input<{ focus: boolean }>`
  text-align: center;

  ${({ focus, theme }) => focus && css`
    ${RangeWrapper} & {
      border-bottom: 2px solid ${theme.colors.primary};
      :focus, :hover {
        border-bottom: 2px solid ${theme.colors.primary};
      }
    }
  `}
`

export default function RangePicker(props: RangePickerProps) {
  const { value, disabled, now = Date.now(), onChange, enabledDates, disabledDates, ...others } = props
  const ref = useRef<HTMLDivElement>()
  const startRef = useRef<HTMLInputElement>()
  const endRef = useRef<HTMLInputElement>()
  const [startFocus, setStartFocus] = useState(false)
  const [endFocus, setEndFocus] = useState(false)
  const [start, setStart] = useState('')
  const [end, setEnd] = useState('')
  const [hoverDate, setHoverDate] = useState<number>()
  const [startMonth, setStartMonth] = useState(now)
  const [endMonth, setEndMonth] = useState(moment(now).add(1, 'M').valueOf())

  // 两个月份之间的间隔是否是紧邻关系
  const monthAdjacent = useMemo(() => moment(endMonth).month() === moment(startMonth).add(1, 'M').month(), [startMonth, endMonth])
  const yearAdjacent = useMemo(() => endMonth <= moment(startMonth).add(1, 'y').valueOf(), [startMonth, endMonth])

  useEffect(() => {
    if (value) {
      setStart(moment(value[0]).format('YYYY-MM-DD'))
      setEnd(moment(value[1]).format('YYYY-MM-DD'))
    }
  }, [value])

  const blur = () => {
    setStartFocus(false)
    setEndFocus(false)
    setHoverDate(undefined)
  }

  // 点击外部则blur效果
  useClickOutSide(ref, blur)

  useEffect(() => {
    if (start && end) {
      if (onChange) {
        if (value && start === moment(value[0]).format('YYYY-MM-DD') && end === moment(value[1]).format('YYYY-MM-DD')) return
        onChange([moment(start).valueOf(), moment(end).valueOf()])
      }
      blur()
    }
  }, [start, end])

  const startDates = useMemo(() => {
    return [start, end].filter(d => {
      const date = moment(d).valueOf()
      const firstDay = moment(startMonth).startOf('month').valueOf()
      const endDay = moment(startMonth).endOf('month').valueOf()
      const inTheMonth = date >= firstDay && date < endDay
      return inTheMonth
    }).map(d => moment(d).date())
  }, [start, end, startMonth])

  const endDates = useMemo(() => {
    return [start, end].filter(d => {
      const date = moment(d).valueOf()
      const firstDay = moment(endMonth).startOf('month').valueOf()
      const endDay = moment(endMonth).endOf('month').valueOf()
      const inTheMonth = date >= firstDay && date < endDay
      return inTheMonth
    }).map(d => moment(d).date())
  }, [start, end, endMonth])

  const dateStartEnd = useMemo(() => {
    let startDate = start ? moment(start).valueOf() : undefined
    let endDate = end ? moment(end).valueOf() : undefined

    if (hoverDate) {
      // 没有hover date 则显示死的start end之间的range
      if (startFocus) startDate = hoverDate
      else endDate = hoverDate
    }

    return [startDate, endDate]
  }, [start, end, hoverDate, startFocus, endFocus])

  const startRange = useMemo(() => {
    const [startDate, endDate] = dateStartEnd

    if (!startDate || !endDate) return undefined

    let range = [1, moment(startMonth).daysInMonth()]
    const firstDay = moment(startMonth).startOf('month').valueOf()
    const endDay = moment(startMonth).endOf('month').valueOf()
    if (startDate > endDay) return undefined
    if (endDate < firstDay) return undefined
    if (startDate >= firstDay && startDate <= endDay) range[0] = moment(startDate).date()
    if (endDate >= firstDay && endDate <= endDay) range[1] = moment(endDate).date()
    return range
  }, [startMonth, dateStartEnd])

  const endRange = useMemo(() => {
    const [startDate, endDate] = dateStartEnd

    if (!startDate || !endDate) return undefined

    let range = [1, moment(endMonth).daysInMonth()]
    const firstDay = moment(endMonth).startOf('month').valueOf()
    const endDay = moment(endMonth).endOf('month').valueOf()
    if (startDate > endDay) return undefined
    if (endDate < firstDay) return undefined
    if (startDate >= firstDay && startDate <= endDay) range[0] = moment(startDate).date()
    if (endDate >= firstDay && endDate <= endDay) range[1] = moment(endDate).date()
    return range
  }, [endMonth, dateStartEnd])

  const handlePickDate = (date: number) => {
    // 哪个focus填写哪个的值，已经有值的情况下不能选择比开始日期前的结束日期，反之亦然
    if (startFocus) {
      if (end && moment(end).valueOf() < date) {
        return
      } else {
        setStart(moment(date).format('YYYY-MM-DD'))
        setStartMonth(date)

        if (!end) {
          setEndFocus(true)
          setStartFocus(false)
        } else if(moment(end).month() === moment(date).month()) {
          setEndMonth(moment(end).add(1, 'M').valueOf())
        } else {

        }
      }
    }
    if (endFocus) {
      if (start && moment(start).valueOf() > date) {
        return
      } else {
        setEnd(moment(date).format('YYYY-MM-DD'))
        if(moment(start).month() === moment(date).month()) {
          setEndMonth(moment(date).add(1, 'M').valueOf())
        } else {
          setEndMonth(date)
        }
        if (!start) {
          setStartFocus(true)
          setEndFocus(false)
        }
      }
    }
  }

  const handleHoverDate = (date: number) => {
    setHoverDate(date)
  }

  const handleStartFocus: MouseEventHandler<HTMLInputElement> = () => {
    setStartFocus(true)
    setEndFocus(false)
  }

  const handleEndFocus: MouseEventHandler<HTMLInputElement> = () => {
    setStartFocus(false)
    setEndFocus(true)
  }

  const handleClickStartYearPrevious: MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault()
    setStartMonth(moment(startMonth).add(-1, 'y').valueOf())
  }

  const handleClickStartMonthPrevious: MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault()
    setStartMonth(moment(startMonth).add(-1, 'M').valueOf())
  }

  const handleClickStartMonthNext: MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault()
    setStartMonth(moment(startMonth).add(1, 'M').valueOf())
  }

  const handleClickStartYearNext: MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault()
    setStartMonth(moment(startMonth).add(1, 'y').valueOf())
  }

  const handleClickEndYearPrevious: MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault()
    setEndMonth(moment(endMonth).add(-1, 'y').valueOf())
  }

  const handleClickEndMonthPrevious: MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault()
    setEndMonth(moment(endMonth).add(-1, 'M').valueOf())
  }

  const handleClickEndMonthNext: MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault()
    setEndMonth(moment(endMonth).add(1, 'M').valueOf())
  }

  const handleClickEndYearNext: MouseEventHandler<SVGSVGElement> = (e) => {
    e.preventDefault()
    setEndMonth(moment(endMonth).add(1, 'y').valueOf())
  }

  const enabledDatesData = useMemo(() => {
    return formatDate(enabledDates)
  }, [enabledDates])

  const disabledDatesData = useMemo(() => {
    return formatDate(disabledDates)
  }, [disabledDates])

  const startHeader = (
    <header>
      <DoubleArrow style={{ transform: 'rotate(180deg)', float: 'left' }} onClick={handleClickStartYearPrevious} />
      <Arrow style={{ transform: 'rotate(180deg)', float: 'left' }} onClick={handleClickStartMonthPrevious} />
      <h3>{moment(startMonth).format('YYYY年MM月')}</h3>
      <StyledArrow hidden={monthAdjacent} onClick={handleClickStartMonthNext} />
      <StyledDoubleArrow hidden={yearAdjacent} onClick={handleClickStartYearNext} />
    </header>)

  const endHeader = (
    <header>
      <StyledDoubleArrow hidden={yearAdjacent} style={{ transform: 'rotate(180deg)', float: 'left' }}
        onClick={handleClickEndYearPrevious} />
      <StyledArrow hidden={monthAdjacent} style={{ transform: 'rotate(180deg)', float: 'left' }}
        onClick={handleClickEndMonthPrevious} />
      <h3>{moment(endMonth).format('YYYY年MM月')}</h3>
      <Arrow onClick={handleClickEndMonthNext} />
      <DoubleArrow onClick={handleClickEndYearNext} />
    </header>)

  return (
    <RangeWrapper ref={ref} {...others}>
      <Input
        ref={startRef}
        placeholder='开始日期'
        value={start}
        disabled={disabled}
        focus={startFocus}
        onChange={() => { }} onClick={handleStartFocus} />
        ~
      <Input
        ref={endRef}
        placeholder='结束日期'
        value={end}
        disabled={disabled}
        focus={endFocus}
        onChange={() => { }} onClick={handleEndFocus} />
      <CalendarWrapper focus={startFocus || endFocus}>
        <StyledCalendar
          month={startMonth} activeDates={startDates} header={startHeader} range={startRange as [number, number]}
          onClickDate={handlePickDate} onHoverDate={handleHoverDate}
          enabledDates={enabledDatesData}
          disabledDates={disabledDatesData} />
        <StyledCalendar
          month={endMonth} activeDates={endDates} header={endHeader} range={endRange as [number, number]}
          onClickDate={handlePickDate} onHoverDate={handleHoverDate}
          enabledDates={enabledDatesData}
          disabledDates={disabledDatesData} />
      </CalendarWrapper>
    </RangeWrapper>)
}

interface RangePickerProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: [number, number]
  onChange?: (value: [number, number]) => void
  disabled?: boolean
  now?: number // 当天时间：毫秒数
  enabledDates?: string[] | [number, number][]  // 有效时间段  eg. ['~2021-02-02', '2021-02-01~2021-04-30',  '2021-06-06~']
  disabledDates?: string[] | [number, number][] // 无效时间段
}