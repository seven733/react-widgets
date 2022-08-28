import React, { useState, useEffect, useContext, createContext, useRef, HtmlHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import * as R from 'ramda'
import useClickOutSide from './hooks/useClickOutSide'
import { ReactComponent as Right } from './assets/right.svg'

export const CascaderContext = createContext<any>(null)

const Width = 10
const Container = styled.div<{ disabled: boolean }>`
  position: relative;
  display: inline-block;
  border: 1px solid ${({ theme }) => theme.colors.border};
  :hover, :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    ${props => props.disabled && css`
      border: 1px solid ${({ theme }) => theme.colors.border};
    `}
  }
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

const Input = styled.input`
  cursor: pointer;
  max-width: 100%;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal;
  text-overflow: ellipsis;
`

const RightIcon = styled(Right)`
  width: 0.45rem;
  height: 0.6rem;
  color: #000000A6;
  margin-right: 0.625rem;
`

const Ul = styled.ul<{ level: number, last: boolean, first: boolean }>`
  margin: 0;
  position: absolute;
  top: calc(2.285em + 0.15em);
  left: ${ props => `${props.level * Width}rem` };
  border-right: 1px solid  ${props => props.theme.colors.border};
  width: ${Width}rem;
  height: 12.5rem;
  color: #000000A6;
  background-color: ${props => props.theme.colors.white};
  overflow-y: auto;
  z-index: 998;
  box-shadow: 0 6px 4px ${props => props.theme.colors.shadow}, 0 -2px 4px ${props => props.theme.colors.shadow};
  ${ props => props.first&& css`
    box-shadow: 0 6px 4px ${props => props.theme.colors.shadow}, -2px 0 4px ${props => props.theme.colors.shadow} 0 -2px 4px ${props => props.theme.colors.shadow};
  `}
  ${ props => props.last && css`
    box-shadow: 0 6px 4px ${props => props.theme.colors.shadow}, 3px -2px 4px ${props => props.theme.colors.shadow};
  `}
  ${ props => props.last && props.first && css`
    box-shadow: 0 6px 4px ${props => props.theme.colors.shadow}, 3px -2px 4px ${props => props.theme.colors.shadow}, -2px 0 4px ${props => props.theme.colors.shadow};
  `}

  /* 滚动槽 */
  ::-webkit-scrollbar {
    width: .4rem;
  }
  ::-webkit-scrollbar-track {
    border-radius: 0.3rem;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    background: #00000026;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`

const Option = styled.li<{ active: boolean }>`
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2rem;
  font-size: 0.875rem;
  color: #000000A6;
  background-color: ${props => props.active ? '#F2FCFAFF' : null};
  cursor: pointer;
  > span {
    margin-left: 0.75rem;
  }
  :hover {
    background-color: #F5F9FFFF;
  }
`

const CascaderItem = (props: CascaderItemProps,) => {
  const { options=[], level=0, showOptions } = props
  const { value, changeValue } = useContext(CascaderContext)

  const [showNext, setShowNext] = useState<boolean>(showOptions)
  const [nextOptions, setNextOptions] = useState<OptionItem[]>([])

  const list = useRef<HTMLUListElement>()

  useEffect(() => {
    const els = list.current?.children as HTMLCollection
    if (showOptions && !R.isNil(els)) {
      let index: number = -1
      const val = value[level]  ? value[level].toString() : ''
      for (let i = 0; i < els.length; i++) {
        if (val === els.item(i).getAttribute('value') && index === -1) {
          index = i
        }
      }
      const height: number = index === -1 ? 0 : els.item(index).getBoundingClientRect().height * index
      list.current?.scrollBy(0, height)
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, level, showOptions])

  useEffect(() => {
    if (level >= value.length && showNext) {
      setShowNext(false)
    }
    if (level < value.length) {
      setShowNext(true)
      // @ts-ignore
      const newNextOptions: OptionItem[] = R.compose<OptionItem>(R.prop('children'), R.find(R.propEq('value', value[level])))(options)
      setNextOptions(newNextOptions)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, level, options])

  const handleOptionClick = (data: OptionItem) => {
    if (data.value !== value[level]) {
      changeValue(level, data, R.isNil(data.children) || R.isEmpty(data.children))
      if (data.children && data.children.length > 0) {
        setShowNext(true)
        setNextOptions(data.children)
      }
    }
  }

  if (!showOptions || options.length === 0) return null
  return <div>
    <Ul level={level} first={level === 0} last={level === value.length - 1} ref={list}>
      {
        options && options.map((item, index) => {
          return <Option
              value={item.value}
              key={`${item.value}-${index}`}
              onClick={() => handleOptionClick(item)}
              active={item.value === value[level]}
            >
              <span>{item.label}</span>
              {item.children && item.children.length > 0 && <RightIcon />}
            </Option>
        })
      }
    </Ul>
    {
      showOptions && <CascaderItem level={level + 1} options={nextOptions} showOptions={showNext} />
    }
  </div>
}

const getValue = (defaultValue: CascaderValue, options: OptionItem[]):OptionItem[] => {
  let data: OptionItem[] = []
  let found: boolean = false
  const find = (ops: OptionItem[], acc: OptionItem[]=[], level=0) => {
    if (!found) {
      ops.forEach(item => {
        acc = R.take(level)(acc)
        if (item.value !== defaultValue) {
          if (item.children && !R.isEmpty(item.children)) {
            acc.push(item)
            find(item.children, acc, level + 1)
          }
        } else {
          acc.push(item)
          data = acc
          found = true
        }
      })
    }
  }

  find(options, [])
  return found ? data : []
}

const Cascader = (props: CascaderProps) => {
  const { options, defaultValue=[], onChange, disabled=false, single=false, ...others } = props
  const [showOptions, setShowOptions] = useState(false)
  // value保存选中数据的value值
  const [value, setValue] = useState<CascaderValue[]>([])
  // data用于保存所选中的完整数据
  const [data, setData] = useState<OptionItem[]>([])

  const ref = useRef<HTMLDivElement>()

  useEffect(() => {
    // 当存在默认值并且默认值是非空数组时
    if (defaultValue && Array.isArray(defaultValue) && !R.isEmpty(defaultValue)) {
      let tempOptions: OptionItem[] = options
      const newData = defaultValue.reduce((a, c) => {
        const matchedVal = R.find<OptionItem>(R.propEq('value', c))(tempOptions)
        if (matchedVal) {
          tempOptions = matchedVal.children ? matchedVal.children : []
          a.push(matchedVal)
        }
        return a
      }, [])

      setValue(defaultValue)
      setData(newData)
    }

    // 默认值存在且非数组时
    if (defaultValue && !Array.isArray(defaultValue) ) {
      const newData = getValue(defaultValue, options)
      setValue(R.pluck('value', newData))
      setData(newData)
    }
  }, [defaultValue, options])

  const changeValue = (level: number, val: OptionItem, isLast: boolean) => {
    // gtLevel 判断当前value数组长度是否大于level值
    const gtLevel = (x: OptionItem[]) => R.gt(R.length(x), level)
    // 替换掉value数组中所有索引大于level的数据
    const replaceTail = (arr: OptionItem[]) => R.compose(R.concat(R.__, [val]), R.take(level))(arr)
    // @ts-ignore
    const newValue: OptionItem[] = R.ifElse(
      gtLevel,
      replaceTail,
      R.concat(R.__, [val])
    )(data)

    setData(newValue)
    setValue(R.pluck('value', newValue))
    if (isLast) {
      onChange(single ? R.prop('value', R.last(newValue)) : R.pluck('value', newValue))
      setShowOptions(false)
    }
  }

  const handleInputClick= () => setShowOptions(!showOptions)

  useClickOutSide(ref, () => {
    setShowOptions(false)
    if (showOptions) {
      onChange(single ? R.last(value) : value)
    }
  })

  return <Container ref={ref} disabled={disabled} >
    <CascaderContext.Provider value={{ value, changeValue }}>
      <Input
        onClick={handleInputClick} {...others}
        value={R.pluck('label', data).join(' / ')}
        onChange={() => {}}
        disabled={disabled}
      />
      <CascaderItem options={options} showOptions={showOptions} />
    </CascaderContext.Provider>
  </Container>
}


interface CascaderItemProps extends HtmlHTMLAttributes<HTMLDivElement> {
  showOptions: boolean
  level?: number
  options: OptionItem[]
}

export interface CascaderProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange'> {
  /** 选项 */
  options: OptionItem[]
  /** 默认值，数组则需传入每层对应的值，否则只需要传入最后一个层级的数值 */
  defaultValue?: CascaderValue[] | CascaderValue
  /** 选中项改变事件 */
  onChange: Function
  /** 是否禁用，默认false */
  disabled?: boolean
  /** 默认false，返回数据为数组，设置true后返回数组的最后一个值 */
  single?: boolean
}

type CascaderValue = number | string

export interface OptionItem {
  label: string
  value: CascaderValue
  children?: OptionItem[]
  disabled?: boolean
}

export default Cascader