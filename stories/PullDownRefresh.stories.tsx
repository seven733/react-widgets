import React from 'react'
import { Story, Meta } from '@storybook/react/types-6-0';
import {PullDownRefresh} from '../src'
import {PullDownRefreshProps} from "../src/PullDownRefresh";

const Template: Story<PullDownRefreshProps> = (args) => {
  return (
    <PullDownRefresh {...args}>
      <h1 style={{lineHeight: 3}}>Content222</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
      <h1 style={{lineHeight: 3}}>Content</h1>
    </PullDownRefresh>
  )
}

export const RefreshDemo = Template.bind({});

RefreshDemo.args = {
  onRefresh:  async () => {
    setTimeout(() => {
      alert('refreshed')
    }, 500)
  }
};

export default {
  title: 'PullDownRefresh',
  component: PullDownRefresh,
} as Meta
