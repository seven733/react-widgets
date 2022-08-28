import { useSpring, animated } from 'react-spring'
// import useMeasure from 'react-use-measure'
import styled, { css } from 'styled-components'
import React, { useEffect, useRef, useState, HtmlHTMLAttributes } from 'react'
import { ReactComponent as CloseIcon } from './assets/close_no_circle.svg'
import useClickOutSide from './hooks/useClickOutSide'
import CompMask from './Mask'

export interface DrawerProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /** 是否可见 */
  visible: boolean
  /** 大小, 默认300px */
  size?: number
  /** 标题 */
  title?: string
  /** 是否可关闭，默认true */
  closable?: boolean
  /** 展示位置，默认right */
  position?: 'top' | 'bottom' | 'left' | 'right'
  /** 关闭事件 */
  onClose?: () => void
  /** 点击外部事件 */
  onOutsideClick?: () => void
}


const Mask = styled(CompMask)`
  display: block;
  padding: 0;
`

const Container = styled(animated.div)<{ vertical: boolean, placement: 'top' | 'bottom' | 'left' | 'right' }>`
  position: absolute;
  background-color: ${props => props.theme.colors.white};
  ${props => props.vertical
    ? css`
    width: 100%;
    top: ${props.placement === 'top' ? '0' : 'none'};
    bottom: ${props.placement === 'bottom' ? '0' : 'none'};
  `
    : css`
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

const Drawer = (props: DrawerProps) => {
  const {
    visible,
    title,
    position = 'right',
    closable = true,
    children,
    size=300,
    onClose,
    onOutsideClick,
    ...rest
  } = props

  const ref = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const [ vertical, setVertical ] = useState<boolean>(false)

  const hAnimeProps = useSpring({ width: visible ? size : 0 })
  const vAnimeProps = useSpring({ height: visible ? size : 0 })

  useEffect(() => {
    const _vertical = (position === 'right' || position === 'left') ? false : true
    setVertical(_vertical)
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
      <Container placement={position} ref={drawerRef} {...rest} style={vertical ? vAnimeProps : hAnimeProps}  vertical={vertical} >
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

export default Drawer