import React, { useState, useEffect, ChangeEvent, MouseEvent, InputHTMLAttributes }  from 'react'
import styled, { css } from 'styled-components'
import * as R from 'ramda'
import { ReactComponent as Down } from './assets/down.svg'
import { ReactComponent as Up } from './assets/up.svg'
import Addon from './common/Addon'

const Container = styled.div<{focus: boolean, disabled: boolean}>`
  display: table;
  ${props => props.focus && css`
    border: 1px solid ${props => props.theme.colors.primary};
  `};
  border: 1px solid ${({ theme }) => theme.colors.border};
  :hover, :focus {
    ${props => !props.disabled && css`
      border: 1px solid ${props => props.theme.colors.primary};
    `}
  }
  min-width: 8em;
  input {
    width: 100%;
    border: none;
    :hover, :focus, :invalid {
      border: none;
    }
  }
`

const DownIcon = styled(Down)`
  fill: #00000073;
  width: 6px;
  height: 4px;
`

const UpIcon = styled(Up)`
  fill: #00000073;
  width: 6px;
  height: 4px;
`

const ButtonGroup = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 2rem;
  display: grid;
  grid-template-rows: 50% 50%;

  span:last-child {
    border-top: 1px solid #D9D9D9FF;
  }
`
const Btn = styled.span<{ disabled: boolean }>`
  font-size: .5rem;
  text-align: center;
  border-left: 1px solid #D9D9D9FF;
  height: 100%;
  cursor: pointer;
  :hover {
    ${props => !props.disabled && css`
      background-color: #0000000A;
    `};
  }
`

const Number = styled.input`
  width: 100%;
`

/**
 * 当不存在min和max值时返回当前值
 * 当只存在最小值的时候返回最小值和当前值中的大值
 * 当只存在最大值的时候返回最大值和当前值中的小值
 * 当同时存在max和min值时，若当前值小于最小值则返回最小值，当前值大于最大值则返回最大值，否则返回本身
 *
 * @param {number} val 当前数值
 * @param {(number | undefined)} min 最小值
 * @param {(number | undefined)} max 最大值
 * @returns
 */
const getVal = (val: number, min: number | undefined, max: number | undefined): number => {
  if (!R.isNil(min) && !R.isNil(max)) {
    if (val > max) {
      return max
    }

    if (val < min) {
      return min
    }
    return val
  }
  if (!R.isNil(min)) {
    return R.max(val, min)
  }
  if (!R.isNil(max)) {
    return R.min(val, max)
  }
  return val
}

export default (props: InputNumberProps) => {
  const {
    min, max, step=1, onChange,
    disabled=false, defaultValue,
    style, prefix, suffix, ...others
  } = props

  const [focus, setFocus] = useState<boolean>(false)

  const [value, setValue] = useState<string>('')
  const [num, setNum] = useState<number | undefined>()

  useEffect(() => {
    if (typeof defaultValue === 'number') {
      const val = defaultValue.toString()
      setValue(val)
      setNum(defaultValue)
    }
  }, [defaultValue])

  // 处理输入框事件，当输入的内容是数字时才真正的赋值
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let curVal = e.currentTarget.value.replace(/^0+\./g, '0.')
    let newNum = 0

    if (/^(\-|\+)?\d+(\.\d+)?$/.test(curVal)) {
      if (typeof max === 'number' || typeof min === 'number') {
        newNum = getVal(curVal === '' ? 0 : parseFloat(curVal), min, max)
        curVal = newNum.toString()
      } else {
        newNum = parseFloat(curVal)
        curVal = newNum.toString()
      }
    }
    setValue(curVal)
    if (!R.isNil(curVal)) {
      onChange(newNum)
    }
  }

  const subtract = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    if (!disabled) {
      const curNum = num || 0
      const newNum = getVal(curNum - step, min, max)
      setNum(newNum)
      setValue(newNum.toString())
      onChange(newNum)
    }
  }

  const add = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault()
    if (!disabled) {
      const curNum = num || 0
      const newNum = getVal(curNum + step, min, max)
      setNum(newNum)
      setValue(newNum.toString())
      onChange(newNum)
    }
  }

  return <Container style={style} focus={focus} disabled={disabled}>
    {prefix && <Addon head>{prefix}</Addon>}
    <div style={{ display: 'inline-block', width: '100%', position: 'relative' }}>
      <Number type='number' min={min} max={max} step={step} value={value}
        onChange={handleChange} disabled={disabled}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        onMouseEnter={() => setFocus(true)}
        onMouseLeave={() => setFocus(false)}
        { ...others }
      />
      {
        focus && !disabled && <ButtonGroup onMouseEnter={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
          <Btn onMouseDown={add} disabled={disabled}><UpIcon /></Btn>
          <Btn onMouseDown={subtract} disabled={disabled}><DownIcon /></Btn>
        </ButtonGroup>
      }
    </div>
    {suffix && <Addon tail>{suffix}</Addon>}
  </Container>
}

interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'prefix' > {
  min?: number
  max?: number
  step?: number
  stepStrictly?: boolean
  disabled?: boolean
  onChange: (val: number) => void
  defaultValue?: number
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}