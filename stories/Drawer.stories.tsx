import React, {useState} from 'react'
import styled, {css} from 'styled-components'
import {Drawer} from '../src'
import {Meta, Story} from '@storybook/react/types-6-0'
import {ModalProps} from '../src/Drawer'


export default {
  title: 'Drawer',
  component: Drawer,

} as Meta

export const Doc: Story<ModalProps> = (args) => {
  return (
      <Drawer {...args} >
        <p>一些注意事项内容</p>
      </Drawer>
  )
}

export const directionSimple = () => {
  const [visible, setVisible] = useState<boolean>(false)
  const [direction, setDirection] = useState<'top' | 'bottom' | 'left' | 'right'>()

  const handleClick = (dir: 'top' | 'bottom' | 'left' | 'right') => {
    setDirection(dir)
    setVisible(true)
  }

  const handleClose = () => {
    setVisible(false)
  }

  return (
    <div>
      <button onClick={() => {
        handleClick('right')
      }}>right
      </button>
      <button onClick={() => {
        handleClick('left')
      }}>left
      </button>
      <button onClick={() => {
        handleClick('top')
      }}>top
      </button>
      <button onClick={() => {
        handleClick('bottom')
      }}>bottom
      </button>
      <Drawer
        visible={visible}
        title='注意事项'
        onClose={handleClose}
        position={direction}
      >
        <p>一些注意事项内容</p>
      </Drawer>
    </div>
  )
}

const OutsideClick = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleClick = () => {
    setVisible(true)
  }

  const handleOutsideClick = () => {
    setVisible(false)
  }

  return (
    <div>
      <button onClick={handleClick}>footerDrawer</button>
      <Drawer
        visible={visible}
        title='注意事项'
        onOutsideClick={handleOutsideClick}
        closable={false}
        position='right'
      >
        <p>一些注意事项内容</p>
      </Drawer>
    </div>
  )
}

export const hideByOutsideClick = () => <OutsideClick/>

const NoTitle = () => {
  const [visible, setVisible] = useState<boolean>(false)

  const handleClick = () => {
    setVisible(true)
  }

  const handleOutsideClick = () => {
    setVisible(false)
  }

  return (
    <div>
      <button onClick={handleClick}>footerDrawer</button>
      <Drawer
        visible={visible}
        onOutsideClick={handleOutsideClick}
        position='right'
      >
        <p>一些注意事项内容</p>
      </Drawer>
    </div>
  )
}

export const noHeader = () => <NoTitle/>

const StyledDrawer = styled(Drawer)`
  ${props => (props.position === 'right' || props.position === 'left') && css`
    width: 40em;
  `}
`

export const styledDrawer = () => {
  const [visible, setVisible] = useState<boolean>(false)
  return (
    <div>
      <button onClick={() => setVisible(true)}>footerDrawer</button>
      <StyledDrawer
        title="标题"
        visible={visible}
        onOutsideClick={() => setVisible(false)}
        position='right'
      >
        <p>一些注意事项内容</p>
      </StyledDrawer>
    </div>
  )
}


