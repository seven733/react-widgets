import React, { HTMLAttributes, MouseEvent } from 'react'
import styled from 'styled-components'

import { isActive } from './common'

const Li = styled.li<LiProps>`
  font-size: 0.875rem;
  color: ${props => props.disabled ? props.theme.colors.assist : '#000000A6' };
  background-color: ${props => isActive(props.value, props.defaultIndexes) ? '#F2FCFAFF' : props.theme.colors.white};
  padding: 0 0.625em;
  text-align: left;
  width: 100%;
  list-style-type: none;
  height: 2.285em;
  line-height: 2.285em;
  border: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  :hover {
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    background-color: #F5F9FFFF;
  }
`

const Option = function <T>(props: OptionProps<T>) {
  const { value, label, handleSelect, defaultIndexes, index, disabled=false, children, ...others } = props
  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    e.stopPropagation()
    if (!disabled) {
      handleSelect && handleSelect({label, value}, index)
    }
  }
  return (
    <Li
      contentEditable={false}
      { ...others }
      disabled={disabled}
      value={index}
      index={index}
      defaultIndexes={defaultIndexes}
      onClick={e => handleClick(e)}
    >
      {
        children ? React.Children.map(children, child => React.cloneElement(child)) : label
      }
    </Li>
  )
}

export default Option

interface OptionProps<T> extends Omit<HTMLAttributes<HTMLLIElement>, 'value'> {
  label: string
  handleSelect?: Function
  disabled?: boolean
  children?: React.ReactElement[]
  value: T
  index?: number
  defaultIndexes?: number[]
}

interface LiProps {
  disabled?: boolean
  value: any
  defaultIndexes?: number[]
  index: number
}
