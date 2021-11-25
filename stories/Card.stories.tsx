import React from 'react'
import {Card} from '../src'
import {Meta, Story} from '@storybook/react/types-6-0'



export default {
  title: 'Card',
  component: Card,
} as Meta

export const Doc: Story<{}> = () => {
  return <Card>慈善活动信息</Card>
}

