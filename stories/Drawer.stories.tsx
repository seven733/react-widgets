import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { Drawer } from '../src'
import { DrawerProps } from '../src/Drawer'

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

const OutsideClick = (args: DrawerProps) => {
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
        {...args}
        visible={visible}
        onOutsideClick={handleOutsideClick}
      >
        <p>一些注意事项内容</p>
      </Drawer>
    </div>
  )
}

export const hideByOutsideClick = (args: DrawerProps) => <OutsideClick {...args} />

const NoTitle = (args: DrawerProps) => {
  return (
    <div>
      <Drawer
        {...args}
      >
        <p>一些注意事项内容</p>
      </Drawer>
    </div>
  )
}

export const noHeader = (args: DrawerProps) => <NoTitle {...args} />

const StyledDrawer = styled(Drawer)`
  ${props => (props.position === 'right' || props.position === 'left') && css`
    width: 400px;
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

export default {
  title: 'Drawer',
  component: Drawer,
  argTypes: {
    onClose: { action: true, control: false },
    onOutsideClick: { action: true, control: false },
  },
  args: {
    visible: false,
    title: 'title',
    closable: true,
    position: 'right',
    size: 300
  }
}
