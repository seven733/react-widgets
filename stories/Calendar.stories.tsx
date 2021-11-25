import moment from 'moment'
import React, { useState } from 'react'
import { Calendar } from "../src"
import { ReactComponent as DoubleArrow } from '../src/assets/doubleright.svg'
import { ReactComponent as Arrow } from '../src/assets/right.svg'

export function Demo() {
  return <Calendar month={moment('2020-05-20').valueOf()} />
}

export function CurrentMonth() {
  return (
    <Calendar
      month={+moment(moment('2020-05-20', 'YYYY-MM-DD').format('YYYY-MM'))}
      today={new Date('2020-05-20').getTime()}
      activeDates={[8, 15, 15, 21, 26]}
      range={[8, 26]} />)
}

export function PastMonth() {
  const d = -40

  return (
    <Calendar
      month={+moment(moment('2020-05-20', 'YYYY-MM-DD').add(d, 'd').format('YYYY-MM'))}
      today={new Date('2020-05-20').getTime()}
      activeDates={[11, 15, 15, 20, 26]}
      range={[11, 26]} />)
}

export function FutureMonth() {
  const d = 40

  return (
    <Calendar
      month={+moment(moment('2020-05-20', 'YYYY-MM-DD').add(d, 'd').format('YYYY-MM'))}
      today={new Date('2020-05-20').getTime()}
      activeDates={[11, 15, 15, 20, 26]}
      range={[11, 26]} />)
}

function CustomizeHeader() {
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
    <Calendar month={month} today={moment('2020-05-20').valueOf()} header={header} />)
}

export function CustomizeHeaderDemo() {
  return <CustomizeHeader />
}

export default { title: 'Calendar', component: Calendar }
