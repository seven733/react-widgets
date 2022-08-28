import React, { ChangeEventHandler, InputHTMLAttributes, ReactNode, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import useClickOutSide from "./hooks/useClickOutSide"
import Addon from './common/Addon'

const InputWrapper = styled.span<{ valid: boolean, focus: boolean, disabled: boolean }>`
  width: 100%;
  display: table;
  border: 1px solid ${({ theme }) => theme.colors.border};
  @media (min-width: 768px) {
    border-radius: 2px;
  }
  :hover, :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    ${props => props.disabled && css`
      border: 1px solid ${({ theme }) => theme.colors.border};
    `}
  }
  ${({ focus, theme }) => focus && css`
    border: 1px solid ${theme.colors.primary};
  `}
  ${({ valid, theme }) => !valid && css`
    border: 1px solid ${theme.colors.danger};
  `}
  input {
    width: 100%;
    border: none;
    :hover, :focus, :invalid {
      border: none;
    }
    :disabled {
      :hover {
        border: none;
      }
    }
  }
`

const Input = (props: InputProps) => {
  const ref = useRef<HTMLInputElement>()
  const wrapper = useRef<HTMLDivElement>()
  const [valid, setValid] = useState(true)
  const [focus, setFocus] = useState(false)
  const {
    prefix, suffix, value, type, list, className, pattern, example, onChange,
    style, ...others
  } = props

  useClickOutSide(wrapper, () => setFocus(false))

  // 某些类型屏蔽掉list使用
  const canUseList = () => {
    switch (type) {
      case 'number': return false
      default: return true
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    // @ts-ignore
    const character = e.nativeEvent.data
    // @ts-ignore 确定是完整输入的状态
    if (/insert/.test(e.nativeEvent.inputType) && !e.nativeEvent.isComposing) {
      if (example) {
        let fallback = e.target.value.replace(new RegExp(`${character}$`), '')
        let re = new RegExp(`^.{${e.target.value.length}}`)
        let expect = example.replace(re, e.target.value)

        // 屏蔽非法输入
        if (!pattern.test(expect)) {
          e.target.value = fallback
        }
      }

      // 当为手机号和数字输入是，屏幕非法输入
      if (type === 'number' && !/^[0-9.]$/.test(character)) {
        e.target.value = e.target.value.replace(character, '')
      }
      if (type === 'tel' && !/^[0-9-+]$/.test(character)) {
        e.target.value = e.target.value.replace(character, '')
      }
    }

    setValid(ref.current.checkValidity())

    onChange && onChange(e)
  }

  return (
    <InputWrapper
      ref={wrapper}
      className={className}
      style={style}
      focus={focus}
      valid={valid}
      disabled={!!others.disabled}
      onClick={() => setFocus(true)}>
      {prefix && <Addon head>{prefix}</Addon>}
      <input
        ref={ref}
        type={type}
        value={value}
        list={canUseList() ? list : undefined}
        pattern={pattern?.source}
        onChange={handleChange}
        {...others}
      />
      {suffix && <Addon tail>{suffix}</Addon>}
    </InputWrapper>
  )
}

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'prefix' | 'pattern'> {
  type?: 'text' | 'tel' | 'email' | 'url' | 'password' | 'search' | 'number'
  value?: string
  prefix?: ReactNode // input前缀组件
  suffix?: ReactNode // input后缀组件
  pattern?: RegExp // pattern直接使用正则表达式而不是字符串
  example?: string // 传该值时可以输入跟随动态屏蔽与pattern不符的非法输入
}

export default Input
