import { transparentize } from 'polished'
import { useTransition } from 'react-spring'
import * as R from 'ramda'
import React, { ChangeEventHandler, HtmlHTMLAttributes, useEffect, useRef, useState } from 'react'
import { ReactComponent as Empty } from '../assets/empty.svg'
import Addon from '../common/Addon'
import useClickOutSide from '../hooks/useClickOutSide'
import { isActive } from './common'
import Tag from './Tag'
import { Container, ClearIcon, DownIcon, MtSelect, Input, SelectContainer, Options, SelectIcon, ExtraOption, NoData } from './style'

function getValues<T>(values: SelectValue<T>[]): string {
  return values.map(o => o.label).join('/')
}

const isBool = (val: any) => typeof val === "boolean"

const getMinimum = (data: number[]) => {
  return data.reduce((a, c) => {
    return a < c ? a : c
  }, data[0])
}

const Select = function <T>(props: SelectProps<T>): React.ReactElement {
  const { children, onChange, defaultValue, placeholder,
    allowClear = false, multiple = false, bordered = true, onClear,
    disabled = false, suffix, prefix, addible, optionsPosition = 'bottom',
    filterOption = false, ...rest } = props
  const [optionsVisible, setOptionsVisible] = useState(false)
  const [activeValues, setActiveValues] = useState<SelectValue<T>[]>([])
  const [value, setValue] = useState('')
  // temp做为临时值，所有的交互围绕value值进行变动，交互完成后若无选中事件将值填回value
  const [temp, setTemp] = useState('')
  const [defaultIndexes, setDefaultIndexes] = useState<number[]>([])

  const ref = useRef<HTMLDivElement>(null)
  const list = useRef<HTMLUListElement>(null)

  useClickOutSide(ref, () => {
    setValue(temp)
    setOptionsVisible(false)
  })

  useClickOutSide(list, () => {
    // 当展板打开并且是多选的模式下触发onChange事件
    if (optionsVisible && multiple) {
      onChange(activeValues)
    }
  })

  // TODO: check default value 是否会scrollIntoView()
  useEffect(() => {
    const els = list.current?.children as HTMLCollection
    if (optionsVisible && !R.isEmpty(defaultIndexes) && !R.isNil(els)) {
      const index = getMinimum(defaultIndexes)
      const height: number = index && els.item(index) ? els.item(index).getBoundingClientRect().height : 0
      list.current?.scrollBy(0, height * index!)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionsVisible])


  useEffect(() => {
    if (R.isNil(children) || R.isEmpty(children)) {
      setValue('')
      setTemp('')
      setDefaultIndexes([])
      return
    }
    let values: SelectValue<T>[] = []
    let indexes: number[] = []
    children.forEach((o, idx) => {
      if (isActive(o.props.value, defaultValue)) {
        values.push(o.props)
        indexes.push(idx)
      }
    })
    const newValue = getValues(values)
    setValue(newValue)
    setTemp(newValue)
    setActiveValues(values)
    setDefaultIndexes(indexes)
  }, [children, defaultValue])

  function handleSelect(data: SelectValue<T>, index: number) {
    if (multiple) {
      const existsValues = activeValues.map(o => o.value)
      // @ts-ignore
      if (isActive(data.value, existsValues)) {
        const newData = activeValues.filter(o => !R.equals(o.value, data.value))
        const newValue = getValues(newData)
        setValue(newValue)
        setTemp(newValue)
        setActiveValues(newData)
        setDefaultIndexes(defaultIndexes.filter(o => o !== index))
        // onChange(newData)
      } else {
        const newData = activeValues.concat(data)
        const newValue = getValues(newData)
        setValue(newValue)
        setTemp(newValue)
        setActiveValues(newData)
        setDefaultIndexes(defaultIndexes.concat(index))
        // onChange(newData)
      }

    } else {
      const newValues: SelectValue<T>[] = [data]
      const newValue = getValues(newValues)
      setValue(newValue)
      setTemp(newValue)
      setActiveValues(newValues)
      setDefaultIndexes([index])
      onChange(data)
      setOptionsVisible(false)
    }
  }

  const handleClear = () => {
    setActiveValues([])
    setDefaultIndexes([])
    setValue('')
    setTemp('')
    onClear && onClear()
  }

  const inputRef = useRef<HTMLInputElement>(null)
  const handleInputClick = () => {
    // 当存在过滤条件时并且当前值的存在的情况下，将当前设置为空, 否则将缓存值设置为
    if (filterOption && !R.isEmpty(value)) {
      setValue('')
    } else {
      setValue(temp)
    }
    if (!disabled) {
      setOptionsVisible(!optionsVisible)
    }
    if (!!filterOption) {
      if (inputRef && inputRef.current) {
        inputRef.current.focus()
      }
    }
  }

  const handleInput: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.currentTarget.value)
  }

  const getElement = (ch: React.ReactElement, index: number) => React.cloneElement(ch, {
    defaultIndexes,
    handleSelect,
    index,
  })

  const handleDelete = (index: number) => {
    const newValue = getValues(R.remove(index, 1, activeValues))
    setValue(newValue)
    setTemp(newValue)
    const newActiveValues = R.remove(index, 1, activeValues)
    setActiveValues(newActiveValues)
    setDefaultIndexes(R.remove(index, 1, defaultIndexes))
    onChange(newActiveValues)
  }

  const transitions = useTransition(optionsVisible, {
    from: {
      opacity: 0,
      overflow: 'hidden',
      maxHeight: '0em'
    },
    enter: {
      opacity: 1,
      display: 'block',
      maxHeight: '12.5em'
    },
    leave: {
      opacity: 0,
      maxHeight: '0em'
    }
  })


  return (
    <Container ref={ref} bordered={bordered} disabled={disabled} {...rest}>
      {prefix && <Addon head>{prefix}</Addon>}
      <div style={{ width: '100%' }}>
        <MtSelect
          bordered={bordered}
          onClick={handleInputClick}
          disabled={disabled}
          suppressContentEditableWarning={true}
        >
          {multiple
            ? R.isEmpty(activeValues)
              ? <span style={{ color: transparentize(0.75, '#000'), fontSize: '0.875rem'}}>{placeholder}</span>
              : activeValues.map((o, idx) =>
                <Tag index={idx} key={idx} onDelete={handleDelete}>{o.label}</Tag> )
            : <React.Fragment>
              <Input ref={inputRef} value={value} onChange={handleInput} type="text" readOnly={!filterOption} placeholder={placeholder} />
              <SelectIcon bordered={bordered}>
                {allowClear ? <ClearIcon onClick={handleClear} /> : <DownIcon />}
              </SelectIcon>
            </React.Fragment>}
          {/* 使用options class设置下拉框的位置 */}
          {
            transitions((prop, item) => item && <SelectContainer className='options' ref={list} style={Object.assign(prop, {
              top: optionsPosition === 'top' ? 'auto' : 'calc(100% + 0.15em)',
              bottom: optionsPosition === 'top' ? 'calc(100% + 0.5em)' : 'auto'
            })}>
              {
                <Options visible={optionsVisible}>
                  {children && children.length > 0
                    ? React.Children.map(children, (child, index) => {
                      // 如果需要过滤
                      if (!!filterOption) {
                        // 如果是默认的
                        if (isBool(filterOption)) {
                          return new RegExp(value).test(child.props.label) ? getElement(child, index) : null
                        } else {
                          // @ts-ignore
                          return filterOption(value, child.props) ? getElement(child, index) : null
                        }
                      }
                      return getElement(child, index)
                    })
                    : <NoData>
                      <Empty />
                    </NoData>}
                </Options>
              }
              {optionsVisible && addible && <ExtraOption onClick={e => e.stopPropagation()}>{addible}</ExtraOption>}
            </SelectContainer>)
          }
        </MtSelect>
      </div>
      {suffix && <Addon tail>{suffix}</Addon>}
    </Container>
  )
}

export default Select

interface SelectProps<T> extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'prefix'> {
  defaultValue?: T | T[]
  children: React.ReactElement[]
  onChange: (data: SelectValue<T> | SelectValue<T>[]) => void
  onClear?: () => void
  placeholder?: string
  allowClear?: boolean
  multiple?: boolean
  bordered?: boolean
  filterOption?: boolean | Function // 过滤选项，默认false, 暂未支持多选
  disabled?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  addible?: React.ReactNode
  optionsPosition?: 'top' | 'bottom'
}

interface SelectValue<T> {
  label: string
  value: T
}