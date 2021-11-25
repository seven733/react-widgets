
import anime from 'animejs'
import styled, { css } from 'styled-components'
import React, { useEffect, useRef, useState, HtmlHTMLAttributes } from 'react'
import { ANIME } from './utils/config'
import { ReactComponent as CloseIcon } from './assets/close_no_circle.svg'
import useClickOutSide from './hooks/useClickOutSide'
import CompMask from './Mask'

const Mask = styled(CompMask)`
  display: block;
  padding: 0;
`

const Container = styled.section<{ vertical: boolean, placement: 'top' | 'bottom' | 'left' | 'right' }>`
  position: absolute;
  background-color: ${props => props.theme.colors.white};
  ${props => props.vertical
    ? css`
    width: 100%;
    height: 17.143em;
    top: ${props.placement === 'top' ? '0' : 'none'};
    bottom: ${props.placement === 'bottom' ? '0' : 'none'};
  `
    : css`
    width: 17.143em;
    height: 100%;
    left: ${props.placement === 'left' ? '0' : 'none'};
    right: ${props.placement === 'right' ? '0' : 'none'};
  `}
  &>header {
    font-size: 1rem;
    height: 1.714em;
    line-height: 1.714em;
    padding: 1.143em 1.714em;
    border-bottom: 1px solid ${props => props.theme.colors.border};
    display: flex;
    justify-content: space-between;
    &> h3 {
      font-size: 1rem;
      margin: 0;
      padding: 0;
    }
    &> svg {
      font-size: 1.6em;
      width: 1em;
	    height: 1em;
      fill: rgba(0, 0, 0, 0.45);
      cursor: pointer;
      :hover {
        opacity: 1;
      }
    }
  }
`

export default (props: ModalProps) => {
  const { visible, title, position = 'right', closable = true, children, onClose, onOutsideClick, ...rest
  } = props
  const ref = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const [vertical, setVertical] = useState<boolean>(false)

  useEffect(() => {
    const _vertical = (position === 'right' || position === 'left') ? false : true
    setVertical(_vertical)
    const card = ref.current?.querySelector('section')
    const wrapperWidth = ref.current?.clientWidth
    const wrapperHeight = ref.current?.clientHeight
    visible && !_vertical && anime({
      targets: card,
      translateX: [position === 'left' ? -wrapperWidth : wrapperWidth, 0],
      easing: ANIME.spring.stiff,
    })
    visible && _vertical && anime({
      targets: card,
      translateY: [position === 'top' ? -wrapperHeight : wrapperHeight, 0],
      easing: ANIME.spring.stiff,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])

  useClickOutSide(drawerRef, () => {
    onOutsideClick && onOutsideClick()
  })

  const handleClose = () => {
    onClose && onClose()
  }

  return visible ? (
    <Mask ref={ref}>
      <Container vertical={vertical} placement={position} ref={drawerRef} {...rest}>
        {title && (
          <header>
            <h3>{title}</h3>
            {closable && <CloseIcon onClick={handleClose} />}
          </header>
        )}
        {children}
      </Container>
    </Mask>
  ) : null
}

export interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  visible: boolean
  title?: string
  closable?: boolean
  position?: 'top' | 'bottom' | 'left' | 'right'
  onClose?: () => void
  onOutsideClick?: () => void
}
