import React, {useMemo} from 'react'
import {BasicPicker} from './index'
import {PickerItem} from './Picker'

interface TimePickerProps {
  onConfirm: (h: number, m: number, s?: number) => void
  visible?: boolean
  title?: string
  precision?: 'minute' | 'second'
  onClose?: () => void
}

interface TimeItem extends PickerItem<TimeItem> {
  num: number
}

const TimePicker: React.FC<TimePickerProps> = (props) => {
  const {visible = false, title = '选择时间', precision, onConfirm, onClose} = props
  const data = useMemo<TimeItem[][]>(() => {
    const hours = Array.from({length: 24}, (_v, k) => ({num: k + 1, value: k + 1 + '时'}))
    const minutes = Array.from({length: 60}, (_v, k) => ({num: k + 1, value: k + 1 + '分'}))
    const seconds = Array.from({length: 60}, (_v, k) => ({num: k + 1, value: k + 1 + '秒'}))
    return [hours, minutes, seconds]
  }, [])
  return <BasicPicker columns={precision === 'second' ? 3 : 2} data={data} visible={visible} title={title}
                      onConfirm={items => {
                        onConfirm(items[0].num, items[1].num, items[2]?.num)
                      }} onClose={onClose}/>
}

export default TimePicker