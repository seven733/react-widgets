import React, { MouseEvent } from 'react'
import styled from 'styled-components'
import { ReactComponent as Close } from '../assets/plainClose.svg'

interface TagProps {
  children?: React.ReactNode
  index: number
  onDelete: (index: number) => void
}

const Tag = styled.div`
  background-color: ${props => props.theme.colors.background};
  border: 1px solid ${props => props.theme.colors.shadow};
  line-height: 1.5em;
  height: 1.5em;
  padding: 0 5px;
  margin-right: 5px;
  margin-bottom: 2px;
`

const CloseIcon = styled(Close)`
  margin-left: 2px;
  width: 1em;
  height: 1em;
  fill: ${props => props.theme.colors.icon};
  display: inline-block;
  :hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

export default ({ children, index, onDelete }: TagProps) => {
  const handleDelete = (e: MouseEvent<SVGSVGElement>) => {
    e.stopPropagation()
    onDelete && onDelete(index)
  }
  return <Tag>
    {children}
    <CloseIcon onClick={e => handleDelete(e)} />
  </Tag>
}
