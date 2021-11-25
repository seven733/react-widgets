import React, { ChangeEvent, HtmlHTMLAttributes, useEffect,
  useState, CompositionEvent, useRef, KeyboardEventHandler } from 'react'
import styled from 'styled-components'
import { ReactComponent as SearchIcon } from "./assets/search.svg"
import { ReactComponent as CloseIcon } from "./assets/close_circel_active.svg"

const Wrap = styled.div<{fixed?: boolean}>`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  background-color: white;
  border-top: 0.1rem solid rgba(0, 0, 0, 0.06);
  border-bottom: 0.1rem solid rgba(0, 0, 0, 0.06);
  position: ${({fixed}) => fixed ? 'fixed' : 'relative'};
  z-index: 10;
  left: 0;
  right: 0;

  .cancel {
    font-size: 1.4rem;
    color: rgba(0, 0, 0, 0.65);
    padding: 0 0.6rem 0 1.2rem;
  }
`
const InputWrap = styled.form`
  display: flex;
  align-items: center;
  flex-grow: 1;
  background: #F5F5F5;
  height: 3.2rem;
  border-radius: 1.6rem;

  .search-icon {
    margin: 0 0.8rem 0 1.2rem;
    font-size: 1.8rem;
    cursor: pointer;
  }
  input {
    flex-grow: 1;
    background-color: transparent;
    padding: 0;
    font-size: 1.4rem;
    border: none;
    border-radius: 0;
    &:focus, &:hover {
      border: none;
    }
  }
  .close-icon {
    padding: 0 1rem;
    width: 1.5rem;
    height: 1.5rem;
  }
  .placeholder,
  input::placeholder {
    font-size: 1.4rem;
    color: #999;
  }
`

interface StaticSearchBarProps extends HtmlHTMLAttributes<HTMLInputElement>{
  onGoSearch?: () => void
  placeholder?: string
  fixed?: boolean
}

const StaticSearchBar = (props: StaticSearchBarProps) => {
  const {onGoSearch, placeholder, fixed, style} = props

  return (
    <Wrap fixed={fixed} style={{...style}}>
      <InputWrap onClick={() => onGoSearch && onGoSearch()}>
        <SearchIcon className="search-icon" fill="#CCCCCC" />
        <span className="placeholder">{placeholder}</span>
      </InputWrap>
    </Wrap>
  )
}

export interface SearchBarProps extends Omit<HtmlHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'onSubmit'> {
  /**
   * 是否纯展示
   * */
  isStatic?: boolean
  /**
   * 是否fixed定位
   * */
  fixed?: boolean
  placeholder?: string
  /**
   * 配合isStatic使用，点击组件后的回调函数
   * */
  onGoSearch?: () => void
  /**
   * 默认值
   * */
  defaultValue?: string
  /**
   * 输入框内容变化后的回调，对中文输入做了优化
   * */
  onChange?: (value: string) => void
  /**
   * 取消按钮的回调
   * */
  onCancel?: () => void
  /**
   * 提交，按enter键后的回调
   * */
  onSubmit?: (value: string) => void
  /**
   * 最大长度
   * */
  max?: number
}

/**
 * <h5>搜索组件</h5>
 * 通过isStatic的值来判断搜索框是否纯展示。当isStatic为true时配合onGoSearch, 点击搜索框后跳转页面。
 * */
function SearchBar({
   defaultValue='',
   onCancel,
   onChange,
   placeholder='请输入内容搜索',
   isStatic=false,
   onGoSearch,
   fixed=false,
   className,
   style,
   onSubmit,
   max=100000
 }: SearchBarProps) {
  const [value, setValue] = useState('')
  const [compositing, setCompositing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setValue(defaultValue)
    inputRef.current?.focus()
  }, [defaultValue])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if(compositing) {
      setValue(e.target.value)
      return
    }

    const val = max ? e.target.value.slice(0, max) : e.target.value
    setValue(val)
    onChange && onChange(val)
  }

  const handleCancel = () => {
    onCancel && onCancel()
  }

  const handleClear = () => {
    setValue('')
    onChange && onChange('')
  }

  const handleCompositionStart = () => {
    setCompositing(true)
  }
  const handleCompositionEnd = (e: CompositionEvent<HTMLInputElement>) => {
    setCompositing(false)
    // 防止change事件在此之前触发
    // @ts-ignore
    const val = max ? e.target.value.slice(0, max) : e.target.value
    setValue(val)
    onChange && onChange(val)
  }

  const handleKeyPress: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      onSubmit && onSubmit(value)
    }
  }

  if(isStatic) {
    return <StaticSearchBar className={className} fixed={fixed} placeholder={placeholder}
                            onGoSearch={onGoSearch} style={{...style}} />
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <Wrap fixed={fixed} className={className} style={{...style}}>
      <InputWrap action="" onSubmit={handleSubmit}>
        <SearchIcon className="search-icon" fill="#CCCCCC" />
        <input ref={inputRef} value={value} type="search" placeholder={placeholder} onChange={handleChange}
               onCompositionStart={handleCompositionStart} onCompositionEnd={handleCompositionEnd}
               onKeyPress={handleKeyPress} />
        {value && <CloseIcon className="close-icon" onClick={handleClear} fill="rgba(0, 0, 0, 0.25)" />}
      </InputWrap>
      <span className="cancel" onClick={handleCancel}>取消</span>
    </Wrap>
  )
}

export default SearchBar
