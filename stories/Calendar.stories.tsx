import moment from 'moment'
import React, { useState } from 'react'
import { Calendar } from "../src"
import { CalendarProps } from '../src/Calendar'
import { ReactComponent as DoubleArrow } from '../src/assets/doubleright.svg'
import { ReactComponent as Arrow } from '../src/assets/right.svg'

export function Demo(args: CalendarProps) {
  return <Calendar {...args} />
}

function CustomizeHeader(args: CalendarProps) {
  const [month, setMonth] = useState(moment('2020-05-20').valueOf())

  const handleClickYearPrevious = () => {
    setMonth(moment(month).add(-1, 'y').valueOf())
  }

  const handleClickMonthPrevious = () => {
    const d = -1
    setMonth(moment(month).add(d, 'M').valueOf())
  }

  const handleClickMonthNext = () => {
    const d = 1
    setMonth(moment(month).add(d, 'M').valueOf())
  }

  const handleClickYearNext = () => {
    const d = 1
    setMonth(moment(month).add(d, 'y').valueOf())
  }

  const header = (
    <header>
      <DoubleArrow style={{ transform: 'rotate(180deg)', float: 'left' }} onClick={handleClickYearPrevious} />
      <Arrow style={{ transform: 'rotate(180deg)', float: 'left' }} onClick={handleClickMonthPrevious} />
      <h3>{moment(month).format('YYYY年MM月')}</h3>
      <Arrow onClick={handleClickMonthNext} />
      <DoubleArrow onClick={handleClickYearNext} />
    </header>)

  return (
    <Calendar {...args} month={month} today={moment('2020-05-20').valueOf()} header={header} />)
}

export function CustomizeHeaderDemo(args: CalendarProps) {
  return <CustomizeHeader {...args} />
}

export default {
  title: 'Calendar',
  component: Calendar,
  argTypes: {
    onHoverDate: { action: true, control: false },
    onClickDate: { action: true, control: false },
    month: { control: 'date' },
    today: { control: 'date' },
    header: { control: false }
  },
  args: {
    activeDates: [8, 15, 16, 21, 26],
    range: [1, 3],
  }
}
