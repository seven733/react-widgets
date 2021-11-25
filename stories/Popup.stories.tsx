import { withKnobs, boolean } from '@storybook/addon-knobs'
import React from 'react'
import { Popup } from '../src'

const Sample = () => {
  const handleClose = () => {}

  return <div>
    <Popup title='sample' visible={boolean('Visible', true)} onClose={handleClose}>
      <p>popup content</p>
    </Popup>
  </div>
}

export const PopupSample = () => (
  <Sample />
)

export default { title: 'Popup', decorators: [withKnobs], component: Popup }