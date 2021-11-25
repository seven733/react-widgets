import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { SearchBar } from '../src'
import {SearchBarProps} from "../src/SearchBar"

const Template: Story<SearchBarProps> = (props) => {
  return (
    <SearchBar {...props} />
  )
}

export const SearchBarDemo = Template.bind({})
SearchBarDemo.args = {
  isStatic: false,
  placeholder: '请输入订单号搜索',
  defaultValue: 'jack',
  onGoSearch: () => {
    SearchBarDemo.args.isStatic = false
  },
  onChange: (val: string) => {
    console.log('searchBar change value', val)
  },
  onSubmit: (val: string) => {
    console.log('searchBar submit value', val)
  },
}

export default {
  title: 'SearchBar',
  component: SearchBar
} as Meta
