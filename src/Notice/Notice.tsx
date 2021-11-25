import anime from 'animejs'
import React, { HtmlHTMLAttributes, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { ReactComponent as Close } from '../assets/plainClose.svg'
import { ReactComponent as Warning } from '../assets/warning.svg'
import { ReactComponent as Error } from '../assets/error.svg'
import { ReactComponent as Success } from '../assets/success.svg'

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

export default (props: NoticeProps) => {
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

export interface NoticeProps extends HtmlHTMLAttributes<HTMLDivElement> {
  title?: string
  type: 'error' | 'success' | 'warning'
  noIcon?: boolean
  CustomerIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  closeable?: boolean
  CloseIcon?: React.FunctionComponent<React.SVGProps<SVGSVGElement>>
  onClose?: () => void
}