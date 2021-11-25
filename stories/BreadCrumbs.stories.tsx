import React from 'react'
import { Meta } from '@storybook/react/types-6-0'
import { BreadCrumbs } from '../src'

const Template = (props: { onChange?: () => void, parentPage: string, currentPage: string }) => {
  const { onChange, parentPage, currentPage } = props

  return (
    <BreadCrumbs
      data={[{ label: parentPage, path: '/' }, { label: currentPage, path: '/audit' }]}
      onChange={onChange} />
  )
}

export const Demo = Template.bind({})
Demo.args = { parentPage: '首页', currentPage: '审核概况' }
Demo.argTypes = {
  parentPage: { description: '仅用于该story, 非组件参数' },
  currentPage: { description: '仅用于该story, 非组件参数' },
}

export default {
  title: 'BreadCrumbs',
  component: BreadCrumbs,
  argTypes: {
    data: { type: { name: 'array' }, control: null },
    onChange: { action: 'change', description: '点击某一路径触发的事件', type: { required: true }, control: null }
  }
} as Meta
