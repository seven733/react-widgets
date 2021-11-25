import { em, lighten } from 'polished'
import React, { HtmlHTMLAttributes, MouseEventHandler, ReactNode } from "react"
import { useHistory } from 'react-router-dom'
import styled, { css } from "styled-components"
import { ReactComponent as IconRight } from './assets/right.svg'

const Wrapper = styled.dl`
  position: relative;
  padding: ${em(20)} 0;
  margin: 0 ${em(20)};
  border-bottom: 1px solid ${props => props.theme.colors.background};
  :last-of-type {
    border-bottom: none;
  }
  span{
    color:#999999;
  }
  >div {
    line-height: 1;
    display:flex;
    justify-content: space-between;
  }
  input {
    text-align: right;
    padding: 0;
  }

  dt {
    width: 46%;
    display: inline-block;
    span {
      color:#666666;
    }
  }
  dd {
    display: inline-block;
    margin-inline-start: 0;
    >span {
      :focus, :hover {
        border: none;
      }
    }
    input {
      color:#333333;
    }
    label {
      color:#999999!important;
    }
  }
`

const StyledSpan = styled.span<{ output?: boolean, icon?: ReactNode }>`
  ${props => !props.output && css`
    color: ${lighten(0.5, '#000')};
  `};
  ${props => props.icon && css`
    margin-left: 1em;
  `}
`

const Right = styled(IconRight)`
  fill: ${lighten(0.8, '#000')};
`

const StyledChildren = styled.dd`
  float: right;
  vertical-align: middle;
`


export default function Label(props: LabelProps) {
  const history = useHistory()
  const { className, to, field, children, output, icon, onClick, ...others } = props

  const handleClick: MouseEventHandler<HTMLDListElement> = (e) => {
    if (onClick) {
      return onClick(e)
    }
    if(to) {
      if(typeof to === 'function') {
        to()
      } else {
        history.push(to)
      }
    }
  }

  return (
    <Wrapper className={className} {...others} onClick={handleClick}>
      <div>
        <dt>{icon}<StyledSpan output={output} icon={icon} >{field}</StyledSpan></dt>
        <StyledChildren>{children}{to && <Right />}</StyledChildren>
      </div>
    </Wrapper>
  )
}

interface LabelProps extends HtmlHTMLAttributes<HTMLDListElement> {
  field: string
  output?: boolean // 用于展示字段值，不允许输入
  to?: string | Function // 要跳转到的页面地址或者提供外部类似跳转的功能
  icon?: ReactNode // 显示的Icon
}
