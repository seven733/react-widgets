import { lighten } from 'polished'
import { animated, useTransition } from 'react-spring'
import React, { useEffect, useState, HtmlHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import { ReactComponent as CloseIcon } from './assets/close.svg'
import Card from './Card'
import Mask from './Mask'

const Icon = styled(CloseIcon)`
  font-size: 1.6em;
  width: 1em;
	height: 1em;
  fill: ${props => props.theme.colors.danger};
  cursor: pointer;
  :hover {
    opacity: 1;
  }
`

const StyledModal = styled(animated.div)`
  text-align: center;
`

const StyledCard = styled(Card) <{ padding?: string, needConfirm: boolean }>`
  padding: ${props => props.padding ? props.padding : '2em 2em'};
  text-align: center;
  position: relative;
  overflow: visible;
  ${props => props.needConfirm && css`
    width: 80%;
    padding-bottom: 5em;
  `}

  @media (min-width: 768px) {
    border-radius: 2px;
    width: 35em;
  }
`

const CancelConfirm = styled.div`
  height: 3em;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  ::before{
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    background: ${lighten(0.8, '#000')};
    position: absolute;
    top: 0;
    left: 0;
    @media (max-width: 768px) {
      transform: scaleX(0.98);
    }
  }
  ::after {
    content: '';
    display: block;
    width: 1px;
    height: 100%;
    background: ${lighten(0.8, '#000')};
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-0.5px);
    @media (min-width: 768px) {
      display: none;
    }
  }
  button {
    border: none;
    background: transparent;
    width: 50%;
    color: ${lighten(0.6, '#000')};
    border-radius: 0;
    height: 100%;
  }
  button:last-child {
    color: ${props => props.theme.colors.primary};
  }

  @media (min-width: 768px) {
    height: 3.7em;
    text-align: right;
    line-height: 3.7em;
    padding: 0 1.4em;
    button {
      width: auto;
      height: auto;
      margin: 4px;
      padding: 0.5em 1em;
      border: 1px solid ${({ theme }) => theme.colors.border};
      letter-spacing: 0.5em;
      border-radius: 2px;
      :last-child {
        color: #fff;
        background: ${({ theme }) => theme.colors.primary};
        border-color: ${({ theme }) => theme.colors.primary};
      }
    }
  }
`
const Modal = (props: ModalProps) => {
  const {
    visible, onClose, padding, children, closable, submitting=false, hasFooter=true,
    onConfirm, onCancel, okText='确定', cancelText='取消', ...others } = props
  const [shown, setShown] = useState(visible)

  useEffect(() => {
    setShown(visible)
  }, [visible])

  const transitions = useTransition(shown, {
    from: {
      opacity: 0,
      transform: 'scale(0, 0)'
    },
    enter: {
      opacity: 1,
      transform: 'scale(1, 1)'
    },
    leave: {
      opacity: 0,
      transform: 'scale(0, 0)'
    }
  })

  const handleClose = () => {
    setShown(false)
    onClose && onClose()
  }

  const handleCancel = () => {
    onCancel && onCancel()
  }

  const handleConfirm = () => {
    onConfirm && onConfirm()
  }

  return <React.Fragment>
    {
      transitions((prop, item) => item && <Mask>
        <StyledModal style={prop}>
          <StyledCard {...others} padding={padding} needConfirm={hasFooter}>
            {children}
            {hasFooter && (
              <CancelConfirm>
                <button onClick={handleCancel} disabled={submitting}>{cancelText}</button>
                <button onClick={handleConfirm} disabled={submitting}>{okText}</button>
              </CancelConfirm>)}
          </StyledCard>
          {
            closable && <Icon onClick={handleClose} />
          }
        </StyledModal>
      </Mask>)
    }
  </React.Fragment>
}

export interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /** 是否可关闭 */
  closable?: boolean
  /** 内边距 */
  padding?: string
  /** 动画 */
  animeRange?: AnimeRange
  /** 是否可见 */
  visible: boolean
  /** 关闭事件 */
  onClose?: () => void
  /** 确认事件 */
  onConfirm?: () => void
  /** 取消事件  */
  onCancel?: () => void
  /** 确认按钮文案  */
  okText?: string
  /** 取消按钮文案 */
  cancelText?: string
  /** 是否处于提交中的状态 */
  submitting?: boolean
  /** 是否需要底部 */
  hasFooter?: boolean
}

interface AnimeRange {
  start: string
  end: string
}

export default Modal