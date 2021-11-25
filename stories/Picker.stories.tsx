import { boolean, text, withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import { Picker } from '../src'
import { districtOptions } from './fakeData/districts.json'

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

export const PickerWrapper = () => (
  <Picker
    style={{ height: '40rem' }}
    visible={boolean('visible', true)}
    data={items}
    title={text('title', '选择器')}
    onCancel={() => { }}
    onConfirm={() => { }} />
)

export const Scrolled = () => (
  <Picker
    visible={boolean('visible', true)}
    data={items}
    title={text('title', '选择器')}
    onConfirm={() => { }}
    onCancel={() => { }} />
)

export const Columns = (props: { onConfirm?: (indices: number[]) => void, onClose?: () => void }) => {
  const { onClose, onConfirm } = props

  return (
    <Picker<PickerItem>
      visible={boolean('visible', true)}
      columns={2}
      data={numbers} contentKey='name' childrenKey='children'
      title={text('title', '选择器')}
      onConfirm={onConfirm} onClose={onClose} />
  )
}

export const EllipseContent = () => {
  return (
    <Picker title='显示省略号' visible={boolean('visible', true)}
      data={['我很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长', '我正常']}
      onConfirm={() => { }} />
  )
}

export const ConfirmEvent = () => (
  <Picker<PickerItem>
    visible={boolean('visible', true)}
    columns={2} data={numbers} contentKey='name' childrenKey='children'
    title={text('title', '选择器')}
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


export default { title: 'Picker', decorators: [withKnobs], component: Picker }

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
