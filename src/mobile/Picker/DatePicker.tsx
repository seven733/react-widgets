import React, {useMemo} from 'react'
import {default as BasicPicker, PickerItem} from './Picker'

export interface DatePickerProps {
  onConfirm: (year: number, month: number, day?: number) => void // 月、日均从1开始
  title?: string
  precision?: 'day' | 'month'
  startYear?: number // 起始年份
  yearRange?: number // 年份总数
  visible?: boolean // 是否默认显示
  onClose?: () => void
}

interface DateItem extends PickerItem<DateItem> {
  num: number
}

const DatePicker: React.FC<DatePickerProps> = (props) => {
  const {startYear = new Date().getFullYear(), yearRange = 5, precision = 'day', title = '选择日期', visible = false} = props
  const data = useMemo<DateItem[]>(() => {
    return Array.from({length: yearRange}, (_v, index) => {
      const year = index + startYear
      const months = Array.from({length: 12}, (_v, index) => {
        const month = index + 1
        if (precision !== 'day') {
          return {num: month, value: month + '月'}
        }
        const dayCount = [1, 3, 5, 7, 8, 10, 12].indexOf(month) >= 0 ? 31 :
          (month !== 2 ? 30 :
              (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0) ? 29 : 28)
          )
        return {
          num: month,
          value: month + '月',
          children: Array.from({length: dayCount}, (_v, i) => ({num: i + 1, value: i + 1 + '日'}))
        }
      })

      return {
        num: year,
        value: year + '年',
        children: months
      }
    })
  }, [startYear, yearRange, precision])

  return <BasicPicker<DateItem>
    visible={visible}
    data={[data]}
    title={title}
    columns={precision === 'day' ? 3 : 2}
    onConfirm={(items) => {
      props.onConfirm(items[0].num, items[1].num, items[2]?.num)
    }}
    onClose={props.onClose}
  />
}

export default DatePicker