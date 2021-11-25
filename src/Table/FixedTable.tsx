import React, { useEffect, useState, useRef } from 'react'
import styled, { css } from 'styled-components'
import { lighten } from "polished"
import { Th, Td, FillThWidth, getHeight, Align, yHeightIsGtRealHeight } from './common'

const FixedContainer = styled.div<FixedContainerProps>`
  overflow: hidden;
  position: absolute;
  top: 0;
  ${props => props.align === Align.Left && css`
    left: 0;
  `}
  ${props => props.align === Align.Left && props.scrollLeft !== 0 && css`
    box-shadow: 4px -${FillThWidth}px 16px rgba(0, 0, 0, 0.2);
  `}
  ${props => props.align === Align.Right && css`
    right: 0;
    margin-right: ${yHeightIsGtRealHeight(props.data, props.scroll, props.lineHeight) ? 0 : FillThWidth }px;
  `}
  ${props => props.align === Align.Right && !props.scrollGetToRight && css`
    box-shadow: -4px -${FillThWidth}px 16px rgba(0, 0, 0, 0.2);
  `}
  z-index: 1;
  width: ${ props => `${props.width}px`};
`

const FixedTableBody = styled.div<{scroll?: Scroll, data: any[], lineHeight: number}>`
  overflow: hidden;
  ${ props => props.scroll && props.scroll.y && css`
    height: ${getHeight(props.data, props.scroll.y, props.lineHeight) - FillThWidth}px;
  `};
`

const Tr = styled.tr<{ lineHeight?: number, isHover?: boolean, active?: boolean }>`
  width: 100%;
  height: ${ props => props.lineHeight ? `${props.lineHeight}px` : '3.75em' };
  ${props => props.isHover && css`
    background-color: rgba(41, 197, 136, .06);
  `}
  ${props => props.active && css`
    background-color: rgba(41, 197, 136, .06);
  `}
`

const Fill = styled.div<{width: number, lineHeight?: number}>`
  position: absolute;
  top: 0;
  right: 0;
  height: ${ props => props.lineHeight ? `${props.lineHeight}px` : '3.75em' };
  width: 6px;
  background: ${lighten(0.96, '#000')};
`


const FixedTable: <T>(data: FixedTableProps<T>) => React.ReactElement
= (props) => {
  const { cols, data, lineHeight, rowKey, align, scroll, scrollTop, hoverIndex,
    scrollLeft, colDefaultValue, scrollGetToRight, activeIndex, onHoverIndexChange } = props
  const tabletEl = useRef()

  const [width, setWidth] = useState<number>(0)
  useEffect(() => {
    const newWidth = cols.reduce((a, c) => a += c.width, 0)
    setWidth(newWidth)
  }, [cols])

  useEffect(() => {
    if (tabletEl.current) {
      // @ts-ignore
      tabletEl.current!.scrollTop = scrollTop || 0
    }
  }, [scrollTop])

  return cols.length > 0 ? <React.Fragment>
    {
      align === 'right' && <Fill width={width} lineHeight={lineHeight} />
    }
    <FixedContainer width={width} align={align} scrollLeft={scrollLeft} data={data} scroll={scroll} lineHeight={lineHeight} scrollGetToRight={scrollGetToRight}>
      <table>
        <colgroup>
          {
            cols.map((column, index) =>
              <col width={column.width ? `${column.width}px` : `${colDefaultValue}px`} key={index.toString()} />
            )
          }
        </colgroup>
        <thead>
          <Tr lineHeight={lineHeight} >
            {
              cols.map((column, index) => {
                return <Th
                  key={`${column.title}${index}`}
                  textAlign={column.align}
                  width={column.width}
                >
                  {column.title}
                </Th>
              })
            }
          </Tr>
        </thead>
      </table>

      <FixedTableBody scroll={scroll} ref={tabletEl} data={data} lineHeight={lineHeight}>
        <table>
          <colgroup>
            {
              cols.map((column, index) =>
                <col width={column.width ? `${column.width}px` : `${colDefaultValue}px`} key={index.toString()} />
              )
            }
          </colgroup>
          <tbody>
          {
            data.map((item, index) => {
              return (
                <Tr
                  lineHeight={lineHeight}
                  key={rowKey ? rowKey(item) : index.toString()}
                  onMouseEnter={() => onHoverIndexChange(index)}
                  onMouseLeave={() => onHoverIndexChange(null)}
                  isHover={hoverIndex === index}
                  active={index === activeIndex}
                >
                  {
                    cols.map(column => {
                      // @ts-ignore
                      const content = column.format ? column.format(item[column.dataIndex]) : column.render ? column.render(item, index) : item[column.dataIndex]
                      return <Td
                        textAlign={column.align}
                        key={column.key.toString()}
                        width={column.width}
                        title={typeof(content) === 'string' ? content : ''}
                      >
                        { content }
                      </Td>
                    })
                  }
                </Tr>
              )
            })
          }
          </tbody>
        </table>
      </FixedTableBody>
    </FixedContainer>
  </React.Fragment>
  : null
}

export default FixedTable

interface FixedTableProps<T> extends TableProps<T> {
  align: Align.Left | Align.Right
  cols: ColumnType<T>[]
  scrollTop: number
  hoverIndex: number | null
  onHoverIndexChange: Function
  scrollLeft: number
  lineHeight: number
  colDefaultValue: number
  scrollGetToRight?: boolean
}

interface FixedContainerProps {
  width: number
  lineHeight: number
  align: Align.Left | Align.Right
  scrollLeft: number
  scroll: Scroll
  data: any[]
  scrollGetToRight?: boolean
}