import {lighten} from 'polished'
import React, {TouchEventHandler, useEffect, useState} from 'react'
import styled from 'styled-components'
import {useSpring, animated} from 'react-spring'
import Popup from '../Popup'

const height = 250
const ITEM_HEIGHT = 45
const headerHeight = 60

const Header = styled.div`
  background: ${props => props.theme.colors.background};
  height: ${headerHeight}px;
  line-height: ${headerHeight}px;
  width: 100%;
  color: ${lighten(0.2, '#000')};
  text-align: center;
  border-radius: 1.5rem 1.5rem 0 0;
`

const StyledSpan = styled.span<{ position: 'left' | 'right' }>`
  position: absolute;
  right: ${props => props.position === 'right' ? '2.0rem' : null};
  left: ${props => props.position === 'left' ? '2.0rem' : null};
  color: ${props => props.theme.colors.primary};
  cursor: pointer;
`

export const TouchListener = styled.div`
  display: block;
  overflow: hidden;
  width: 100%;
  touch-action: none;
`

// highlight selected item
const StyledItem = styled.div<{ active?: boolean }>`
  height: ${ITEM_HEIGHT}px;
  line-height: ${ITEM_HEIGHT}px;
  color: ${props => props.active ? props.theme.colors.primary : lighten(0.6, '#000')};
  text-align: center;
  background: transparent;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 1em;
  overflow-wrap:  normal;
  white-space: nowrap;
`

const SelectedBar = styled.div`
  position: absolute;
  height: ${ITEM_HEIGHT}px;
  width: 100%;
  border-top: 1px solid ${lighten(0.8, '#000')};
  border-bottom: 1px solid ${lighten(0.8, '#000')};
  /* 一半的高度-半格长度为中间位置 */
  top: ${(height - ITEM_HEIGHT) / 2 - 1}px;
  pointer-events: none;
`

const StylePopup = styled(Popup)`
  padding: 0;
`

const ColumnsWrapper = styled.div`
  position: relative;
  height: ${height}px;
  display: flex;
  justify-content: space-around;
  padding: ${(height - 5 * ITEM_HEIGHT) / 2}px 0;
`

function Column<T extends PickerItem<T>>(props: PickerColumnProps<T>) {
  const {items, initialIndex, onChange} = props

  const [y, setY] = useState(0)
  const [offset, setOffset] = useState(0) // offset 记录了位置应该在原始位置的基础上平移多少
  const [time, setTime] = useState(Date.now())
  const [speed, setSpeed] = useState(0)
  const [index, setIndex] = useState(0)

  const [styles] = useSpring(() => ({
    to: {transform: `translateY(${offset}px)`}, onRest: () => {
      onChange(items[index], index)
    }
  }), [index, offset])

  // props.index变化，计算应该到达的新位置，根据应该到达的位置，设置offset值
  useEffect(() => {
    if (typeof initialIndex !== 'number' || index === initialIndex) return
    const tempOffset = -ITEM_HEIGHT * initialIndex
    setIndex(initialIndex)
    setOffset(tempOffset)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIndex, items])

  const handleTouchStart: TouchEventHandler = (e) => {
    e.preventDefault()
    if (items.length === 0) return

    // 将offset与其对应的index累积保持,保证多次滑动效果
    setY(e.changedTouches[0].pageY)
    setSpeed(0)
  }

  const handleTouchMove: TouchEventHandler = (e) => {
    e.preventDefault()

    if (items.length === 0) return

    const diff = e.changedTouches[0].pageY - y
    setOffset(offset + diff)
    setSpeed(diff / (Date.now() - time))
    setTime(Date.now())
    setY(e.changedTouches[0].pageY)
  }

  const handleTouchEnd: TouchEventHandler = () => {
    if (items.length === 0) return

    // 根据滑动结束时的速度做相应的惯性滑行
    let targetY = offset + speed * speed * speed * 100
    const limit = (items.length - 1) * ITEM_HEIGHT

    // 超出整个数列长度，则需保证还在可渲染到数列的范围内
    if (targetY > 0) {
      targetY = 0
    } else if (Math.abs(targetY) > limit) {
      targetY = -limit
    } else {
      // 映射所在的index, 保证选项渲染在SelectedBar中间位置
      const units = Math.round(targetY / (ITEM_HEIGHT))
      targetY = units * ITEM_HEIGHT
    }
    setOffset(targetY)
    setIndex(-targetY / (ITEM_HEIGHT))
  }

  const handleItemClick = (i: number) => {
    setIndex(i)
    setOffset(-i * ITEM_HEIGHT)
  }

  // TODO: 兼容无TouchEvents的设备，如PC
  return (
    <TouchListener onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <animated.div style={styles}>
        <StyledItem/>
        <StyledItem/>
        {items.map((item, i) => (
          <StyledItem key={i} active={index === i}
                      onClick={() => handleItemClick(i)}>
            {item.value}
          </StyledItem>
        ))}
        <StyledItem/>
        <StyledItem/>
      </animated.div>
    </TouchListener>
  )
}

export default function Picker<T extends PickerItem<T>>(props: PickerProps<T>) {
  const {columns = 1, data, title, onConfirm, onClose, visible} = props
  const {defaultCoordinates = new Array(columns).fill(0)} = props

  if (data.length === 0) return (<></>)

  const [coordinates, setCoordinates] = useState(defaultCoordinates) // 坐标，标识选中数据的index
  const [options, setOptions] = useState(data) // 展示选项

  useEffect(() => {
    !visible && setCoordinates(new Array(columns).fill(0))
  }, [visible])

  useEffect(() => {
    let newOptions: T[][] = new Array(columns)
    coordinates.forEach((coordinate, index) => {
      if (!newOptions[index]) {
        newOptions[index] = data[index] || []
      }

      if (index + 1 < newOptions.length && newOptions[index].some(item => item.children && item.children.length > 0)) {
        newOptions[index + 1] = newOptions[index][coordinate].children || []
      }
    })
    setOptions(newOptions)
  }, [coordinates, data])

  const handleColumnChange = (coordinate: number, index: number) => {
    let newCoordinates = Array.from(coordinates)
    newCoordinates[index] = coordinate
    setCoordinates(newCoordinates)
  }

  const handleConfirm = () => {
    onConfirm(coordinates.map((coordinate, index) => options[index][coordinate]))
  }

  return (
    <StylePopup visible={visible} confirmed={!visible} onClose={onClose}>
      <Header>
        {title}
        <StyledSpan position={'left'} onClick={() => onClose()}>取消</StyledSpan>
        <StyledSpan position={'right'} onClick={handleConfirm}>确定</StyledSpan>
      </Header>
      <ColumnsWrapper>
        {visible && options.map((items, index) => {
          return <Column<T> key={index} items={items} initialIndex={defaultCoordinates[index]}
                            onChange={(_item, coordinate) => handleColumnChange(coordinate, index)}/>
        })}
        <SelectedBar onTouchEnd={e => e.preventDefault()}/>
      </ColumnsWrapper>
    </StylePopup>
  )
}

interface PickerColumnProps<T> {
  items: PickerItem<T>[]
  initialIndex: number

  onChange(item: PickerItem<T>, index: number): void
}

export interface PickerItem<T> {
  value: string // 用于展示的属性
  children?: T[]
}

export interface PickerProps<T extends PickerItem<T>> {
  visible: boolean
  title: string
  data: T[][] // 优选取前一个数组元素的children作为下一列内容
  columns?: number
  defaultCoordinates?: number[]

  onConfirm(items: T[]): void

  onClose?: () => void
}
