import React, { HtmlHTMLAttributes, useState } from 'react'
import styled from 'styled-components'
import { theme } from './utils/config'
import { ReactComponent as Close } from './assets/plainClose.svg'

const Dark = 'dark'
const Plain = 'plain'

const typeMap = new Map([
  ["warning", theme.colors.warning],
  ["info", theme.colors.info],
  ["danger", theme.colors.danger],
  ["success", theme.colors.primary],
])

const Tag = styled.div<TagStyleProps>`
  margin-right: 1rem;
  margin-bottom: 1rem;
  padding: 0 .5rem;
  border: 1px solid #ccc;
  line-height: 2rem;
  display: inline-block;
  cursor: default;
  border-radius: .2rem;
  background-color: ${props => props.effect === Dark
    ? props.type
      ? typeMap.get(props.type)
      : props.theme.colors.background
    : props.theme.colors.white
  };
  border: 1px solid ${props => props.effect === Plain
    ? props.type
      ? typeMap.get(props.type)
      : 'none'
    : props.theme.colors.border
  };

  color: ${props => props.effect === Dark
    ? props.theme.colors.strong
    : props.type
      ? typeMap.get(props.type)
      : props.theme.colors.strong
  };
  > svg {
    padding-left: .5rem;
  };
`

const CloseIcon = styled(Close) <{ type?: Types }>`
  width: 1.5rem;
  height: 1.5rem;
  fill: ${props => props.type ? typeMap.get(props.type) : props.theme.colors.icon};
  :hover {
    cursor: pointer;
  }
`


export default (props: TagProps) => {
  const { type, closeable, children = '', effect = Dark } = props
  const [closed, setClosed] = useState<boolean>(false)

  const handleClose = () => {
    setClosed(true)
  }
  return !closed ? <Tag type={type} effect={effect}>
    {children}
    {closeable && <CloseIcon onClick={handleClose} type={type} />}
  </Tag> : null
}


type Types = 'warning' | 'info' | 'danger' | 'success'
type Effects = 'dark' | 'plain'

interface TagProps extends HtmlHTMLAttributes<HTMLSpanElement> {
  type?: Types
  closeable?: boolean
  children: React.ReactText
  effect?: Effects
}

interface TagStyleProps {
  type?: Types
  closeable?: boolean
  effect?: Effects
}
