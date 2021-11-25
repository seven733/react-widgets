
import React from 'react'
import { StyledComponent, DefaultTheme } from 'styled-components'
import showComponent from '../utils/showComponent'
import Notice, { NoticeProps } from './Notice'

const notification = (props: NoticeProps & { duration?: number, content?: () => JSX.Element }) => {
  const { children, duration, content, onClose, ...restProps } = props
  const handleClose = () => {
    onClose && onClose()
  }

  showComponent(<Notice {...restProps} onClose={handleClose}>{content ? content() : children}</Notice>, duration)
}

const customNotice = (props: NoticeProps
  & {
    StyledNotice: StyledComponent<(props: NoticeProps) => JSX.Element, DefaultTheme, {}, never>,
    content?: () => JSX.Element
    duration?: number
  }) => {
  const { children, duration, onClose, StyledNotice, content, ...restProps } = props
  const handleClose = () => {
    onClose && onClose()
  }

  showComponent(<StyledNotice {...restProps} onClose={handleClose}>{content ? content() : children}</StyledNotice>, duration)
}

export { customNotice, notification }

export default Notice






