import React from 'react'
import { Popup } from '../src'
import { PopUpProps } from '../src/Popup'

export const Sample = (args: PopUpProps) => {
  return <div>
    <Popup title='sample' {...args}>
      <p>popup content</p>
    </Popup>
  </div>
}

export default {
  title: 'Popup',
  component: Popup,
  argTypes: {
    onClose: { action: true },
  },
  args: {
    visible: false,
  }
}