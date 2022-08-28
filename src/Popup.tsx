import { cover } from 'polished'
import { animated, useTransition } from 'react-spring'
import * as R from 'ramda'
import React, { BaseHTMLAttributes, MouseEventHandler, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import Mask from './Mask'


const StyledCard = styled(animated.div)`
  ${cover()}
  position: fixed;
  background: white;
  overflow: hidden;
  top: auto;
  bottom: 0;
  height: 20rem;
  border-radius: 1.5rem 1.5rem 0 0;
  z-index: 999;
`

const Children = styled.div<{ title?: string }>`
  padding: 2rem 1.5rem;
  ${props => props.title && css`
    padding-top: 5.4rem;
  `}
`

const Title = styled.h2`
  ${cover()}
  bottom: auto;
  font-weight: normal;
  text-align: center;
  margin: 0;
  height: 3.4rem;
  line-height: 3.4rem;
  background: ${props => props.theme.colors.background};
`

export default function Popup(props: PopUpProps) {
  const { visible, onClose, confirmed, title, ...others } = props

  const [ maskVisible, setMaskVisible ] = useState(true)

  const transitions = useTransition(maskVisible, {
    from: {
      opacity: 0,
      height: '0rem'
    },
    enter: {
      opacity: 1,
      height: others && others.style && others.style.height ? others.style.height  : '30rem'
    },
    leave: {
      opacity: 0,
      height: '0rem'
    },
    onDestroyed: () => onClose && !maskVisible && onClose()
  })


  useEffect(() => {
    if (R.not(R.isNil(visible))) {
      setMaskVisible(visible)
    }
  }, [visible])

  useEffect(() => {
    if (confirmed) {
      setMaskVisible(false)
    }
   // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [confirmed])

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation()
    setMaskVisible(false)
  }

  return  <>
    {maskVisible && <Mask onClick={handleClick} />}
    {
      transitions((prop, item) => item && <StyledCard onClick={e => e.preventDefault()} style={prop}>
        {title && <Title>{title}</Title>}
        <Children title={title} className={props.className} style={props.style} >
          {props.children}
        </Children>
      </StyledCard>)
    }
  </>
}

export interface PopUpProps extends BaseHTMLAttributes<HTMLDivElement> {
  visible?: boolean
  confirmed?: boolean
  title?: string
  onClose(): void
}
