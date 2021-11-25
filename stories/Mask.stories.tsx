import { number } from '@storybook/addon-knobs'
import { transparentize } from 'polished'
import React from 'react'
import styled from 'styled-components'
import { Mask } from '../src'

const Opacity = styled(Mask) <MaskStyleProps>`
  background: ${props => transparentize(1 - props.opacity, '#000')};
`

const BottomContent = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const OpacityCheck = () => (
  <>
    <BottomContent>测试透明度</BottomContent>
    <Opacity opacity={number('opacity', 0.6, {
      range: true,
      min: 0,
      max: 1,
      step: 0.1
    }, 'opacity')} />
  </>
)

export default { title: 'Mask', component: Mask }

interface MaskStyleProps {
  opacity: number
}