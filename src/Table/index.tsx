import React, {
  useState, useEffect, useMemo, createContext, useContext, ChangeEvent, useRef, MouseEvent, useCallback, ReactNode
} from 'react'
import styled from 'styled-components'
import { Container, Content, Tr, Th, Td, FillThWidth, Align, ColDefaultWidth, yHeightIsGtRealHeight } from './common'
import FixedTable from './FixedTable'


const NoDataWrapper = styled.div`
  text-align: center;
  padding: 3rem;
`

const TableContext = createContext(null)

const CheckBox: <T>(data: CheckBoxProps<T>) => React.ReactElement = ({value}) => {
  const { selectedRows, handleChecked } = useContext(TableContext)
  const isChecked = useMemo(() => {
    return selectedRows.indexOf(value) !== -1
  }, [value, selectedRows])
  return <input
    type="checkbox"
    style={{ border: '.1em solid #ccc' }}
    checked={isChecked}
    onChange={e => handleChecked(e, value)}
  />
}

const Table = function <T>(props: TableProps<T>): React.ReactElement {
  const {
    data, columns, lineHeight=50, selectable, onSelectedChange, rowKey, scroll, onRowClick, activeIndex, Empty, ...rest
  } = props
  const tabletHeadEl = useRef()
  const tabletBodyEl = useRef()
  const [selectedRows, setSelectedRows] = useState([])
  const [scrollTop, setScrollTop] = useState<number>(0)
  const [scrollLeft, setScrollLeft] = useState<number>(0)
  const [hoverIndex, setHoverIndex] = useState<number>(null)
  const handleChecked = (e: ChangeEvent<HTMLInputElement>, rowData: T) => {
    if (e.target.checked) {
      setSelectedRows(selectedRows.concat([rowData]))
    } else {
      const index = selectedRows.indexOf(rowData)
      const newVal = selectedRows.filter((_, idx) => idx !== index)
      setSelectedRows(newVal)
    }
  }

  useEffect(() => {
    onSelectedChange && onSelectedChange(selectedRows)
  }, [selectedRows, onSelectedChange])

  const handleCheckedAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(data)
    } else {
      setSelectedRows([])
    }
  }

  const isCheckedAll = useMemo(() => {
    return selectedRows.length === data.length
  }, [selectedRows, data])


  let { columnList, leftColumns, rightColumns, hasFixedColumn, allCeilColumns } = useMemo(() => {
    let list: ColumnType[][] = []
    let rightColumns: ColumnType[] = []
    let leftColumns: ColumnType[] = []
    let allCeilColumns: ColumnType[] = []
    const iterationColumns = (cols: ColumnType[], level = 0, indexMap = {}) => {
      cols.forEach((item, index)=> {
        if (item.columns && item.columns.length > 0) {
          Object.keys(indexMap).forEach(key => {
            if (level - parseInt(key) === 1 && index=== 0) {
              // @ts-ignore
              list[level-1][indexMap[key]].colSpan = 0
            }
          })

          const curCol = Object.assign(item, { colSpan: item.columns.length })
          list[level] = list[level] && list[level].length > 0 ? list[level].concat([curCol]) : [curCol]
          let additional: any = {}
          additional[level] = index
          iterationColumns(item.columns, level + 1, Object.assign(indexMap, additional))
        } else {
          Object.keys(indexMap).forEach(key => {
            if (level - parseInt(key) > 1) {
              // @ts-ignore
              list[key][indexMap[key]].colSpan += 1
            }
          })
          if (item.fixed && item.fixed === Align.Left) {
            leftColumns.push(item)
          }
          if (item.fixed && item.fixed === Align.Right) {
            rightColumns.push(item)
          }
          allCeilColumns = allCeilColumns.concat(item)
          list[level] = list[level] && list[level].length > 0 ? list[level].concat([item]) : [item]
        }
      })
    }
    // @ts-ignore
    iterationColumns(columns)

    return {
      columnList: list,
      leftColumns,
      rightColumns,
      allCeilColumns,
      hasFixedColumn: leftColumns.length > 0 || rightColumns.length > 0,
    }
  }, [columns])

  const [colDefaultValue, setColDefaultValue] = useState<number>(ColDefaultWidth)
  useEffect(() => {
    if (!tabletHeadEl || !hasFixedColumn) {
      return
    }
    // @ts-ignore
    const clientWidth = (tabletHeadEl.current as HTMLDivElement).clientWidth
    const { fixedCount, fixedWidth } = allCeilColumns.reduce((a, c) => {
      if (c.width) {
        a.fixedCount++
        a.fixedWidth += c.width
      }
      return a;
    }, {fixedCount: 0, fixedWidth: 0})

    const restWidth = yHeightIsGtRealHeight ? (clientWidth - fixedWidth - FillThWidth) : (clientWidth - fixedWidth)
    const avgWidth = restWidth / (allCeilColumns.length - fixedCount)
    setColDefaultValue(avgWidth > ColDefaultWidth ? avgWidth : ColDefaultWidth)
  }, [tabletHeadEl, allCeilColumns, hasFixedColumn])

  const scrollGetToRight = useMemo(() => {
    if (!tabletHeadEl || !tabletHeadEl.current) {
      return false
    }
    // @ts-ignore
    const clientWidth = (tabletHeadEl.current as HTMLDivElement).clientWidth
    const realWidth = allCeilColumns.reduce((a, c) => {
      a += c.width ? c.width : colDefaultValue
      return a
    }, 0)
    return scrollLeft + clientWidth >= realWidth
  }, [scrollLeft, colDefaultValue, allCeilColumns])


  const hasFilter = useMemo(() => {
    let has = false
    columnList.forEach(o => {
      o.forEach(item => {
        if (item.filter) {
          has = true
        }
      })
    })
    return has
  }, [columnList])

  const handleScrollChange = useCallback(
    (e: any) => {
      setScrollTop(e.target.scrollTop)
      setScrollLeft(e.target.scrollLeft)
      // @ts-ignore
      tabletHeadEl.current!.scrollLeft = e.target.scrollLeft
    },
    []
  )

  useEffect(() => {
    if (tabletBodyEl && tabletBodyEl.current) {
      (tabletBodyEl.current as HTMLDivElement).addEventListener('scroll', handleScrollChange)
    }

    return () => {
      if (tabletBodyEl && tabletBodyEl.current) {
        (tabletBodyEl.current as HTMLDivElement).removeEventListener('scroll', handleScrollChange)
      }
    }
  }, [handleScrollChange, tabletBodyEl])


  const handleRowClick = (e: MouseEvent<HTMLTableRowElement>, row: T, index: number) => {
    e.stopPropagation()
    if (onRowClick) {
      onRowClick(row, index)
    }
  }

  const handleMouseEnterTr = (index: number) => {
    setHoverIndex(index)
  }

  return (
    <Container scroll={scroll} {...rest}>
      {
        leftColumns && (
        <FixedTable<T> {...props}
          cols={leftColumns as ColumnType<T>[]}
          align={Align.Left}
          scrollTop={scrollTop}
          hoverIndex={hoverIndex}
          onHoverIndexChange={(idx: number) => setHoverIndex(idx)}
          scrollLeft={scrollLeft}
          lineHeight={lineHeight}
          colDefaultValue={colDefaultValue}
        />)}
      <div style={{ overflowX: 'hidden' }} ref={tabletHeadEl}>
        <table>
          {
            ((scroll && scroll.x) || hasFixedColumn) && <colgroup>
            {
              columnList && columnList.map((item, index) => {
                return item.map((column, idx) =>
                  <col width={column.width ? `${column.width}px` : `${colDefaultValue}px`} key={`${index}-${idx}`} />
                )
              })
            }
          </colgroup>
          }
          <thead>
            {
              columnList && columnList.map((item, idx) => (
                <Tr lineHeight={lineHeight} key={idx.toString()}>
                  {
                    selectable && <th style={{ width: '2.5em', textAlign: 'center' }} rowSpan={columnList.length}>
                      <input
                        type="checkbox"
                        style={{ border: '.1em solid #ccc' }}
                        checked={isCheckedAll}
                        onChange={e => handleCheckedAll(e)}
                      />
                    </th>
                  }
                  {
                    item.map((column, index)=> {
                      return (
                        <Th
                          key={`${column.title}${index}`}
                          textAlign={column.align}
                          rowSpan={column.rowSpan ? column.rowSpan : column.columns ? 1 : columnList.length - idx }
                          colSpan={column.colSpan}
                          width={column.width}
                        >
                          {column.title}
                        </Th>
                      )
                    })
                  }
                  {
                    yHeightIsGtRealHeight(data, scroll, lineHeight)
                      ? null
                      : <th style={{ width: `${FillThWidth}px`, padding: 0 }}></th>
                  }
                </Tr>)
              )
            }
          </thead>
        </table>
      </div>
      {
        data && data.length
          ? <Content scroll={scroll} onScroll={handleScrollChange} ref={tabletBodyEl} data={data} lineHeight={lineHeight}>
              <table>
                {
                  ((scroll && scroll.x) || hasFixedColumn) && <colgroup>
                  {
                    columnList && columnList.map((item, index)=> {
                      return item.map((column, idx) =>
                        <col width={column.width ? `${column.width}px` : `${colDefaultValue}px`} key={`${index}-${idx}`} />
                      )
                    })
                  }
                </colgroup>
                }
                <tbody>
                  {
                    hasFilter && <Tr lineHeight={lineHeight}>
                      {
                        selectable && <td style={{ width: '2.5em' }}></td>
                      }
                      {
                        columnList.map(o => {
                          return o.map(column => {
                            return column.key ? (
                              <td align={column.align} key={column.key.toString()}>
                                {column.filter && column.filter()}
                              </td>
                            ) : null
                          })
                        })
                      }
                    </Tr>
                  }
                  {
                    data.map((item, index) => {
                      return (
                        <Tr lineHeight={lineHeight} key={rowKey ? rowKey(item) : index.toString()}
                          onMouseEnter={() => handleMouseEnterTr(index)}
                          onMouseLeave={() => setHoverIndex(null)}
                          isHover={hoverIndex === index}
                          active={index === activeIndex}
                          onClick={(e) => handleRowClick(e, item, index)}>
                          {
                            selectable && <td align="center" style={{ width: '2.5em' }}>
                              <TableContext.Provider value={{ selectedRows, handleChecked }}>
                                <CheckBox value={item} />
                              </TableContext.Provider>
                            </td>
                          }
                          {
                            columnList.map(o => {
                              return o.map(column => {
                                // @ts-ignore
                                const content = column.format ? column.format(item[column.key]) : column.render ? column.render(item, index) : item[column.dataIndex]
                                return column.key ? (
                                  <Td textAlign={column.align} key={column.key.toString()} width={column.width} title={typeof(content) === 'string' ? content : ''}>
                                    {content}
                                  </Td>
                                ) : null
                              })
                            })
                          }
                        </Tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </Content>
        : <NoDataWrapper>{Empty || '暂无数据'}</NoDataWrapper>
      }
      {
        rightColumns && <FixedTable<T> {...props}
          cols={rightColumns as ColumnType<T>[]}
          align={Align.Right}
          scrollTop={scrollTop}
          hoverIndex={hoverIndex}
          onHoverIndexChange={(idx: number) => setHoverIndex(idx)}
          scrollLeft={scrollLeft}
          lineHeight={lineHeight}
          colDefaultValue={colDefaultValue}
          scrollGetToRight={scrollGetToRight}
        />
      }
    </Container>
  )
}


interface CheckBoxProps<T> {
  value: T
}

import { HtmlHTMLAttributes } from "react";

type TableDefaultValueType = Record<string, any>;

export interface TableProps<T> extends HtmlHTMLAttributes<HTMLDivElement> {
  data: T[]
  columns: ColumnType<T>[]
  lineHeight?: number
  selectable?: boolean
  onSelectedChange?: Function
  rowKey?: (row: T) => string
  scroll?: Scroll
  onRowClick?: (row: T, index: number) => void
  activeIndex?: number
  Empty?: React.ReactNode
}

export interface ColumnType<ValueType = TableDefaultValueType> {
  title: string
  dataIndex?: string
  key?: keyof ValueType
  align?: "right" | "left" | "center" | "justify" | "char"
  format?: (val: any) => any
  render?: (row: ValueType, idx: number) => any
  columns?: ColumnType<ValueType>[]
  rowSpan?: number
  colSpan?: number
  width?: number
  filter?: () => ReactNode
  fixed?: 'left' | 'right'
}

interface Scroll {
  x?: number
  y?: number
}


export default Table