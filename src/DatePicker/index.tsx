import moment from 'moment'
import React, {
  HtmlHTMLAttributes,
  useEffect, useMemo, useRef, useState
} from 'react'
import useClickOutSide from '../hooks/useClickOutSide'
import { CalendarWrapper, StyledCalendar, Wrapper, DoubleArrow, Arrow, IconCalendar } from './style'
import RangePicker from './RangePicker'

export const formatDate = (data: any[]) => {
  if(!data) return []
  return data.map(d => {
    if(typeof d === 'string') {
      const list = d.split('~')
      return {
        start: list[0] ? moment(list[0]).valueOf() : Number.NEGATIVE_INFINITY,
        end: list[1] ? moment(list[1]).valueOf() : Number.POSITIVE_INFINITY,
      }
    } else {
      return {
        start: moment(d[0]).set({hour: 0, minute: 0, second: 0, millisecond: 0}).valueOf(),
        end: moment(d[1]).set({hour: 23, minute: 59, second: 59, millisecond: 999}).valueOf(),
      }
    }
  })
}

export default function DatePicker(props: DatePickerProps) {
  const ref = useRef<HTMLDivElement>()
  const inputRef = useRef<HTMLInputElement>()
  const { value: propsValue, now = Date.now(), disabled=false, onChange, enabledDates, disabledDates, ...others } = props
  const [focus, setFocus] = useState(false)
  const [value, setValue] = useState('')
  const [month, setMonth] = useState(now)

  useEffect(() => {
    setValue(moment(propsValue || now).format('YYYY-MM-DD'))
  }, [propsValue])

  const activeDates = useMemo(() => {
    const date = moment(value).valueOf()
    const firstDay = moment(month).startOf('month').valueOf()
    const inTheMonth = date >= firstDay && date <= moment(firstDay).add(1, 'M').valueOf()
    return value && inTheMonth ? [moment(value).date()] : undefined
  }, [value, month])

  const enabledDatesData = useMemo(() => {
    return formatDate(enabledDates)
  }, [enabledDates])

  const disabledDatesData = useMemo(() => {
    return formatDate(disabledDates)
  }, [disabledDates])

  useClickOutSide(ref, () => {
    setFocus(false)
  })

  const handlePickDate = (date: number) => {
    setFocus(false)
    setValue(moment(date).format('YYYY-MM-DD'))
    onChange && onChange(date)
    setMonth(date)
  }

  const handleClickYearPrevious = () => {
    setMonth(moment(month).add(-1, 'y').valueOf())
  }

  const handleClickMonthPrevious = () => {
    setMonth(moment(month).add(-1, 'M').valueOf())
  }

  const handleClickMonthNext = () => {
    setMonth(moment(month).add(1, 'M').valueOf())
  }

  const handleClickYearNext = () => {
    setMonth(moment(month).add(1, 'y').valueOf())
  }

  const header = (
    <header>
      <DoubleArrow style={{ transform: 'rotate(180deg)' }} onClick={handleClickYearPrevious} />
      <Arrow style={{ transform: 'rotate(180deg)' }} onClick={handleClickMonthPrevious} />
      <h3>{moment(month).format('YYYY年MM月')}</h3>
      <Arrow onClick={handleClickMonthNext} />
      <DoubleArrow onClick={handleClickYearNext} />
    </header>)

  return (
    <Wrapper ref={ref} focus={focus} disabled={disabled} {...others}>
      <input
        ref={inputRef}
        value={value}
        onFocus={() => setFocus(true)}
        disabled={disabled}
        onChange={() => { }} />
      <IconCalendar />
      {<CalendarWrapper focus={focus}>
        <StyledCalendar
          month={month}
          activeDates={activeDates}
          header={header}
          onClickDate={handlePickDate}
          enabledDates={enabledDatesData}
          disabledDates={disabledDatesData}
        />
      </CalendarWrapper>}
    </Wrapper>)
}

interface DatePickerProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: number
  onChange?: (value: number) => void
  disabled?: boolean
  now?: number // 当天时间：毫秒数
  enabledDates?: string[] | [number, number][]  // 有效时间段  eg. ['~2021-02-02', '2021-02-01~2021-04-30',  '2021-06-06~']
  disabledDates?: string[] | [number, number][] // 无效时间段
}

export { RangePicker }