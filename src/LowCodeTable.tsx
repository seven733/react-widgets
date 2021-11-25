import React, { ChangeEvent, useEffect, useState } from 'react'
import { ColumnType, InputNumber, Table } from '../src'
import styled from 'styled-components'
import * as R from 'ramda'

const StyledTable = styled.table`
  td {
    text-align: left;
    button {
      margin-left: 20px;
    }
  }
`
const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  > div {
    margin: 0 16px;
    display: flex;
    align-items: center;
  }
`
const initColumns: ColumnType[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
]

const initRow = (columns: ColumnType[]) => {
  const row: TableDefaultValueType = {}
  const columnIds = columns.map(c => c.dataIndex)
  columnIds.forEach(id => row[id] = undefined)
  return row
}

export const LowCodeTable = () => {
  const [columns, setColumns] = useState<ColumnType[]>(initColumns)
  const [rows, setRows] = useState<TableDefaultValueType[]>([])
  const [newRow, setNewRow] = useState<TableDefaultValueType>()
  const [inputValue, setInputValue] = useState<string>('')
  const [index, setIndex] = useState(NaN)
  const [tableOptions, setTableOptions] = useState({selectable: false, scrollRows: undefined, lineHeight: 50})

  const handleRowClick = (row: TableDefaultValueType, idx: number) => {
    console.log(row)
    setIndex(idx)
  }

  useEffect(() => {
    const columnIds = columns.map(c => c.dataIndex)
    if (columnIds.length !== 0) {
      const row = initRow(columns)
      setNewRow(row)
      if (rows.length !== 0) {
        const newRows = rows.map(r => R.pickAll(columnIds, r))
        setRows(newRows)
      } else {
        setRows([row])
      }
    }
  }, [columns])

  const handleAddColumns = () => {
    if (inputValue === '') return
    const id = `${inputValue}_id=${Math.floor(Math.random() * 1000)}`
    const newColumns = [...columns, {
      title: inputValue,
      dataIndex: id,
      key: id,
    }]
    setColumns(newColumns)
    setInputValue('')
  }

  const handleRmCol = (key: string) => {
    const newColumns = columns.filter(c => c.key !== key)
    setColumns(newColumns)
  }
  const handleRmRow = (index: number) => {
    setRows(rows.filter((_, i) => i !== index))
  }

  const editRow = (row: TableDefaultValueType, index?: number) =>
    Object.keys(row).map((k, i) => <td key={i}>
      {index !== undefined ?
        <input key={i} name={k} value={row[k] || ''} onChange={(e) => handleInputRow(e, index)} /> :
        <input key={i} name={k} value={newRow[k] || ''} onChange={(e) => handleInputRow(e)} />
      }
    </td>)
  // const ColumnOptions = (props: HTMLProps<HTMLElement>) => <tr>
  //   {columns.map(c =>
  //     <td key={c.key}>
  //       {props.children}
  //     </td>)}
  // </tr>

  const handleAddRows = () => {
    setRows([...rows, newRow])
    setNewRow(initRow(columns))
  }
  const handleInputColumns = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }
  const handleInputRow = (e: ChangeEvent<HTMLInputElement>, index?: number) => {
    const {name, value} = e.target
    if (index !== undefined) {
      setRows(rows.map((r, i) => i !== index ? r : {...r, [name]: value}))
    } else {
      setNewRow({...newRow, [name]: value})
    }
  }

  return (
    <>
      <h1>table</h1>
      <Table<TableDefaultValueType> data={rows}
                                    columns={columns}
                                    selectable={tableOptions.selectable}
                                    onRowClick={handleRowClick}
                                    activeIndex={index}
                                    scroll={{y: (tableOptions.lineHeight + 2) * tableOptions.scrollRows}}
                                    lineHeight={tableOptions.lineHeight}

      />

      <div style={{marginTop:'36px'}}>
        <hr/>
        <h1>edit table</h1>
        <StyledTable>
          <tbody>
          <tr>
            {columns.map(c => <td key={c.key}>{c.title}
              <button onClick={() => handleRmCol(c.key)}>-</button>
            </td>)}
            <td>
              <input style={{width:'50%'}} type="text" onChange={handleInputColumns} value={inputValue} />
              <button onClick={handleAddColumns}>add</button>
            </td>
          </tr>
          </tbody>
        </StyledTable>
        <StyledTable>
          <tbody>
          {rows.map((row, i) =>
            <tr key={i}>
              {editRow(row, i)}
              <td>
                <button onClick={() => handleRmRow(i)}>-</button>
              </td>
            </tr>)}
          </tbody>
        </StyledTable>
        <h2>add rows</h2>
        <StyledTable>
          <tbody>
          <tr>
            {newRow && columns.length !== 0 && <>
              {editRow(newRow)}
              <td>
                <button onClick={handleAddRows}>add</button>
              </td>
            </>}
          </tr>
          </tbody>
        </StyledTable>
        <h2>row options</h2>
        <FlexDiv>
          <div>
            selectAble &nbsp;<input type="checkbox" onChange={() => setTableOptions({
            ...tableOptions,
            selectable: !tableOptions.selectable
          })} />
          </div>
          <div>
            show rows&nbsp;
            <InputNumber
              min={1}
              max={rows.length}
              onChange={(val) => setTableOptions({...tableOptions, scrollRows: val})}
              defaultValue={tableOptions.scrollRows || rows.length} />
          </div>
          <div>
            line height&nbsp;
            <InputNumber
              max={150}
              onChange={(val) => setTableOptions({...tableOptions, lineHeight: val})}
              defaultValue={tableOptions.lineHeight} />
          </div>
        </FlexDiv>
        {/*<h2>column options</h2>*/}
        {/*<StyledTable>*/}
        {/*  <tbody>*/}
        {/*  <tr>*/}
        {/*    {columns.map(c => <td key={c.key}>{c.title}</td>)}*/}
        {/*  </tr>*/}
        {/*  <ColumnOptions>*/}
        {/*    /!*width &nbsp;*!/*/}
        {/*    /!*<InputNumber onChange={(val => )}*!/*/}
        {/*  </ColumnOptions>*/}
        {/*  </tbody>*/}
        {/*</StyledTable>*/}

      </div>

    </>
  )
}
