import moment from 'moment'
import React, { useState } from 'react'
import styled from 'styled-components'
import { DatePicker, RangePicker } from '../src'

const Label = styled.label`
  display: inline-block;
`

export function Demo() {
  return (
    <Label>日期选择器：<DatePicker now={moment('2020-05-20').valueOf()} /></Label>)
}

export function disabled() {
  return (
    <Label>日期选择器：<DatePicker now={moment('2020-05-20').valueOf()} disabled /></Label>)
}

function SetProps() {
  const [value, setValue] = useState(moment('2020-05-20').valueOf())

  const handleChange = (value: number) => {
    const d = 1
    setValue(moment(value).add(d, 'd').valueOf())
  }

  return (
    <Label>日期选择器：<DatePicker now={moment('2020-05-20').valueOf()} value={value} onChange={handleChange} /></Label>)
}

export function SetPropsDemo() {
  return <SetProps />
}

export function RangePickerDemo() {
  return (
    <Label>日期选择器：<RangePicker now={moment('2020-05-20').valueOf()} /></Label>)
}

function RangePickerWithProps() {
  const [value, setValue] = useState<[number, number]>()

  const handleChange = (value: [number, number]) => {
    const [d1, d2] = [-1, 1]
    const start = moment(value[0]).add(d1, 'd').valueOf()
    const end = moment(value[1]).add(d2, 'd').valueOf()
    setValue([start, end])
  }

  return (
    <Label>日期选择器：<RangePicker now={moment('2020-05-20').valueOf()} value={value} onChange={handleChange} /></Label>)
}

export function RangePickerWithPropsDemo() {
  return <RangePickerWithProps />
}

export function DisabledDate() {
  return (
    <div>
      <div>
        <Label>日期选择器(指定有效范围2.5-2.18, 3.2-3.20)：
          <DatePicker
            now={moment('2021-04-27').valueOf()}
            enabledDates={[[1612454400000, 1613577600000], [1614614400000, 1616169600000]]}
          />
        </Label>
      </div>
      <div>
        <Label>日期选择器(指定disable范围4.28-5.28, 2.28-3.28)：
          <DatePicker
            now={moment('2021-04-27').valueOf()}
            disabledDates={[[1619539200000, 1622131200000], [1614441600000, 1616860800000]]}
          />
        </Label>
      </div>
      <div>
        <Label>日期选择器(同时指定)：
          <DatePicker
            now={moment('2021-04-27').valueOf()}
            enabledDates={['2021-01-03~2021-02-09', '2021-05-01~2021-06-30']}
            disabledDates={['~2020-12-22', '2021-03-20~2021-04-03',  '2021-07-07~']}
          />
        </Label>
      </div>
      <div>
        <Label>日期范围选择器(指定disable范围)：
          <RangePicker
            now={moment('2021-04-27').valueOf()}
            disabledDates={['~2021-02-02', '2021-04-05~2021-04-20',  '2021-06-06~']}
          />
        </Label>
      </div>
    </div>
  )
}

export default { title: 'DatePicker', component: DatePicker }