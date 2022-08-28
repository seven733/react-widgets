import React from 'react'
import { Picker } from '../src'
import { districtOptions } from './fakeData/districts.json'

import { PickerProps } from '../src/Picker'

const items = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']

const numbers = [
  {
    id: 1, name: 1, children: [
      { id: 11, name: 11 },
      { id: 12, name: 12 },
      { id: 13, name: 13 },
      { id: 14, name: 14 },
      { id: 15, name: 15 },
      { id: 16, name: 16 },
      { id: 17, name: 17 },
      { id: 18, name: 18 },
      { id: 19, name: 19 },
    ]
  },
  {
    id: 2, name: 2, children: [
      { id: 21, name: 21 },
      { id: 22, name: 22 },
    ]
  }
]

const handleConfirm = (res: (string | number)[]) => {
  alert(`res: ${res}`)
}

export const PickerWrapper = (args: PickerProps) => (
  <Picker
    style={{ height: '20rem' }}
    data={items}
    {...args}
  />
)

export const Scrolled = (args: PickerProps) => (
  <Picker
    data={items}
    {...args}
  />
)

export const EllipseContent = () => {
  return (
    <Picker title='显示省略号' visible={true}
      data={['我很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长', '我正常']}
      onConfirm={() => { }} />
  )
}

export const ConfirmEvent = () => (
  <Picker<PickerItem>
    visible={true}
    columns={2} data={numbers} contentKey='name' childrenKey='children'
    title='选择器'
    onConfirm={handleConfirm} />
)

const handlePickDistricts = (indices: number[]) => {
  console.log('indices: ', indices)
}

export const DistrictsPicker = () => (
  <Picker<DistrictOptions>
    visible={true}
    columns={3} data={districtOptions} contentKey='value' childrenKey='children'
    title={'地址选择器'}
    onConfirm={handlePickDistricts} />)


export default {
  title: 'Picker',
  component: Picker,
  argTypes: {
    onClose: { action: true },
    onConfirm: { action: true },
    onCancel: { action: true },
  },
  args: {
    visible: true,
    title: 'test title',
    columns: 2,
  }
}

interface PickerItem {
  id: number
  name: number
  children?: PickerItem[]
}

interface DistrictOptions {
  identity: string
  value: string
  children: DistrictOptions[]
}
