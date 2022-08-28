import moment from 'moment'
import { lighten } from 'polished'
import React, { HtmlHTMLAttributes, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import Card from './Card'
import { theme } from './utils/config'

const backgroundColor = lighten(0.5, theme.colors.primary)

export interface CalendarProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /** 该月份的毫秒数 */
  month?: number
  /** 今天的毫秒数 */
  today?: number
  /** 需要高亮的日期1...31 */
  activeDates?: number[]
  /** 需要渲染背景色的开始和结束日期, 如[5, 25] */
  range?: [number, number]
  /** 悬停在哪个日期 */
  onHoverDate?: (date: number) => void
  /** 日期点击事件 */
  onClickDate?: (date: number) => void
  /** 头部 */
  header?: ReactNode
  /** 可选择的时间范围 */
  enabledDates?: {start: number, end: number}[]
  /** 不可选择的时间范围 */
  disabledDates?: {start: number, end: number}[]
}

interface DateProps {
  index: number
  start: number
  end: number
  today: boolean
  past: boolean
  beyond: boolean
  disabled: boolean
}


const Wrapper = styled(Card)`
  text-align: center;
  max-width: 768px;
  margin: 8px;
  padding: 0;
  header {
    height: 2.5em;
    margin-bottom: 1em;
    padding: 0 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    svg { 
      font-size: 0.5rem;
      margin: 0 1em;
      cursor: pointer;
      :hover {
        stroke: ${({ theme }) => theme.colors.primary};
      }
    }

    h3 {
      display: inline-block;
      font-weight: 500;
      font-size: 1.125rem;
      color: ${lighten(0.2, '#000')};
      margin: 0 auto;
    }
  }

  @media (min-width: 768px) {
    border-radius: 2px;
    width: 280px;
    header {
      border-bottom: 1px solid ${props => props.theme.colors.border};
    }
  }
`

const Grid = styled.section`
  padding: 0 1em 1em 1em;
  position: relative;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 10px;
`

export const DateElement = styled.div<DateProps>`
  cursor: pointer;

  ${({ index, start, end, beyond, theme, today }) => {
    // let background = !past && !beyond ? backgroundColor : theme.colors.background
    let background = backgroundColor

    if (beyond) return css`
        opacity: 0.25;
        //cursor: not-allowed;
      `

    if ((index === start && index % 7 === 6) || (index === end && index % 7 === 0)) {
      // 既是开头又是周六，或者既是结尾又是周日的日期
      return css`
        background: transparent;
        >div {
          background: ${background};
        }
      `
    }

    if ((index % 7 === 0 || index === start) && index >= start && index <= end) {
      // 开头日期，周日，则渲染一半的背景色
      return css`
        background: linear-gradient(to right, transparent, transparent 50%, ${background}, ${background} 50%) !important;
        >div {
          background: ${background};
        }
      `
    }

    if ((index % 7 === 6 || index === end) && index >= start && index <= end) {
      // 结束日期，周六，则渲染右侧一半的背景色
      return css`
        background: linear-gradient(to left, transparent, transparent 50%, ${background}, ${background} 50%) !important;
        >div {
          background: ${background};
        }
      `
    }

    if (index > start && index < end) {
      // start end范围内渲染背景色
      if (today) {
        const grey = theme.colors.background

        return css`
          background: linear-gradient(to right, ${grey}, ${grey} 50%, ${background}, ${background} 50%);
        `
      }
      return css`
        background: ${background} !important;
      `
    }
  }}

  ${({ beyond, theme, disabled }) => {
    if (beyond || disabled) return

    return css`
      :hover {
        >div {
          color: ${theme.colors.primary};
        }
      }
    `
  }}
  
  ${({ disabled }) => {
    if(disabled) return css`
      background-color: ${theme.colors.background};
      opacity: 1;
      cursor: not-allowed;
      color: rgba(51,51,51,0.25);
      :hover {
        >div {
          border: none;
        }
      }
    `
  }}
  
  >div {
    width: 2em;
    height: 2em;
    margin: auto auto;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    @media (min-width: 768px) {
      border-radius: 2px;
    }
  }

  >div.active {
    background: ${theme.colors.primary};
    color: #fff;
  }

  >div.today {
    color: ${theme.colors.primary};
    background: ${backgroundColor};
    border: 1px solid ${theme.colors.primary};
    @media (min-width: 768px) {
      background: #fff;
    }
  }
`

const DayElement = styled.div<{ index: number }>`
  font-weight: 500;
`

const days = ['日', '一', '二', '三', '四', '五', '六']

export default function Calendar(props: CalendarProps) {
  const now = Date.now()
  console.log('now', now)
  const {
    month: propsMonth = now,
    activeDates = [],
    range: [start, end] = [0, 0],
    today = now,
    children,
    header,
    onClickDate,
    onHoverDate,
    enabledDates,
    disabledDates,
    ...others
  } = props
  const month = moment(propsMonth).startOf('month')

  const firstDay = month.weekday()
  const daysInMonth = month.daysInMonth()
  const daysInLastMonth = month.clone().add(-1, 'm').daysInMonth()
  const isTheMonth = today > month.valueOf() && today < month.clone().add(1, 'M').valueOf()

  let items = new Array<number>(42).fill(0).map((_, i) => {
    if (firstDay > i) {
      return daysInLastMonth - firstDay + i + 1
    } else if (i >= firstDay + daysInMonth) {
      return i - firstDay - daysInMonth + 1
    } else {
      return i - firstDay + 1
    }
  })

  const handleClickDate = (d: number, monthDiff: number) => {
    onClickDate && onClickDate(month.clone().add(monthDiff, 'M').add(d - 1, 'd').valueOf())
  }

  const handleMouseEnter = (d: number) => {
    onHoverDate && onHoverDate(month.clone().add(d - 1, 'd').valueOf())
  }

  const checkDisabled = (d: number, monthDiff: number) => {
    const time = month.clone().add(monthDiff, 'M').add(d - 1, 'd').valueOf()
    let result = disabledDates && disabledDates.some(r => time >= r.start && time <= r.end)
    if(!result) {
      result = enabledDates && enabledDates.length && !enabledDates.some(r => time >= r.start && time <= r.end)
    }
    return result
  }

  return (
    <Wrapper {...others}>
      {header || <header><h3>{month.format('YYYY年MM月')}</h3></header>}
      <Grid>
        {days.map((d, i) => <DayElement key={d} index={i}>{d}</DayElement>)}
        {items.map((d, i) => {
          const inTheMonth = i >= firstDay && i < firstDay + daysInMonth
          const isToday = inTheMonth && isTheMonth && moment(today).date() === d
          const childClass = []
          isToday && childClass.push('today')
          inTheMonth && activeDates.includes(d) && childClass.push('active')
          const monthDiff = i < firstDay ? -1 : (i >= firstDay + daysInMonth ? 1 : 0)
          const isDisabled = checkDisabled(d, monthDiff)

          return (
            <DateElement
              key={i} index={i}
              beyond={!inTheMonth}
              start={start + firstDay - 1} end={end + firstDay - 1}
              today={isToday}
              past={month.clone().add(d, 'd').valueOf() < today}
              disabled={isDisabled}
              onClick={e => {
                e.preventDefault()
                !isDisabled && handleClickDate(d, monthDiff)
              }}
              onMouseEnter={() => inTheMonth && !isDisabled && handleMouseEnter(d)}>
              <div className={childClass.join(' ')}>{d >= 10 ? d : `0${d}`}</div>
            </DateElement>)
        })}
      </Grid>
      {children}
    </Wrapper>
  )
}
