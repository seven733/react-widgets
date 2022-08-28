
import React, { HtmlHTMLAttributes, useEffect, useRef } from 'react'
import styled, { StyledComponent, DefaultTheme } from 'styled-components'
import showComponent from './utils/showComponent'
import anime from 'animejs'
import { ReactComponent as Close } from './assets/plainClose.svg'
import { ReactComponent as Warning } from './assets/warning.svg'
import { ReactComponent as Error } from './assets/error.svg'
import { ReactComponent as Success } from './assets/success.svg'

const Item = styled.div<{ hasTitle?: boolean }>`
    display: flex;
    background-color: white;
    min-width: 20em;
    border-radius: .25em;
    box-shadow: 0 .25em 1.75em .625em rgba(0, 0, 0, 0.12);
    padding: 1.5em 1em;
    margin: .625em;
    z-index: 1000;
    &>svg {
        height: 1.875em;
        width: 2.5em;
    }
    &>div {
        width: 100%;
        margin: ${props => props.hasTitle ? '0 0 0 .625em' : '0'};
        &>h2 { 
        line-height: 1.875em;
        font-size: 1rem;
        display: flex;
        align-items: center;
        margin: 0;
        padding: 0;
        span { 
            width: 80%;
        }
    }
    }
`

const Notice = (props: NoticeProps) => {
  const { title, type, children, CustomerIcon,
    closeable = false, CloseIcon,
    onClose, className, noIcon } = props

  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const animation = anime({
      targets: ref.current!,
      translateX: [240, 0],
      duration: 1000,
      autoplay: false,
    })
    animation.play()
  }, [])

  const IconNode = () => {
    switch (type) {
      case 'success': return <Success />
      case 'error': return <Error />
      case 'warning': return <Warning />
    }
  }

  const handleClose = () => {
    onClose && onClose()
  }

  return (
    <Item
      ref={ref}
      className={className}
      hasTitle={!!title}
    >
      {!noIcon && (CustomerIcon ? <CustomerIcon /> : IconNode())}
      <div>
        {title ? (
          <h2>
            <span>{title}</span>
            {closeable &&
              (CloseIcon
                ? <CloseIcon id='delete' style={{ cursor: 'pointer' }} width="40" onClick={handleClose} />
                : <Close id='delete' style={{ cursor: 'pointer' }} width="40" onClick={handleClose} />)}
          </h2>
        ) : null}
        {children}
      </div>
    </Item>
  )
}



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


export interface NoticeProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /** 标题 */
  title?: string
  /** 类型 */
  type: 'error' | 'success' | 'warning'
  /** 是否需要标题前的Icon */
  noIcon?: boolean
  /** 自定义标题前的icon */
  CustomerIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  /** 是否展示关闭按钮  */
  closeable?: boolean
  /** 自定义关闭按钮 */
  CloseIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  /** 关闭事件 */
  onClose?: () => void
}