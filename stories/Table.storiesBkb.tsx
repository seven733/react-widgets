import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Table } from '../src'
import { randomPerson, randomStudents } from './fakeData/student'
import  { ColumnType } from '../src/Table'

const Input = styled.input`
  width: '10rem';
`

const Married = styled.div<{ married?: boolean }>`
  width: 100px;
  height: 20px;
  text-align: center;
  background-color : ${ props => props.married ? '#ffccc7' : '#d9d9d9' };
`

const OperationButton = styled.span`
  margin-left: 20px;
  color: #69c0ff;
`

const data: Person[] = randomPerson(5)
const students: Student[] = randomStudents(5)

const onFired = (e: any, row: Person) => {
  e.stopPropagation()
  alert(`${row.name} 你被开除了!`)
}
const columns: ColumnType[] = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
    format: (val: number) => `${val}岁`
  },
  {
    title: '联系电话',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: '是否结婚',
    dataIndex: 'married',
    key: 'married',
    width: 160,
    format: (val: boolean) => val ? <Married married>是</Married> : <Married>否</Married>
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '操作',
    width: 200,
    dataIndex: 'operation',
    key: 'operation',
    align: 'right',
    render: (row: Person) => {
      return (
        <div>
          {
            !row.married && <OperationButton onClick={(e) => onFired(e, row)}>开除</OperationButton>
          }
          <OperationButton>详情</OperationButton>
        </div>
      )
    }
  },
]

export const Simple = () => {
  const [index, setIndex] = useState(NaN)
  const handleRowClick = (row: Person, idx: number) => {
    alert(`点击了 第 ${idx}行，姓名为${row.name}`)
    setIndex(idx)
  }

  return (
    <div>
      <div style={{ width: '800px' }}>
        <Table<Person> data={randomPerson(5)} columns={columns} onRowClick={handleRowClick} activeIndex={index} />
      </div>

      <div style={{ width: '800px' }}>
        <Table<Person> data={randomPerson(8)} columns={columns} onRowClick={handleRowClick} scroll={{ y: 300 }} />
      </div>

      <div style={{ width: '800px', background: 'snow' }}>
        <Table<Person> data={randomPerson(0)} columns={columns} onRowClick={handleRowClick} scroll={{ x: 500 }} />
      </div>
    </div>
  )
}

// const CanSelectTable = () => {
//   const [selectedRows, setSelectedRows] = useState([])
//   const handleClick = () => {
//     const names = selectedRows.map(o => o.name)
//     alert(`选中的有: ${names.join('  ')}`)
//   }
//   return (
//     <div>
//       <div style={{ width: '800px' }}>
//         <Table data={data} columns={columns} selectable onSelectedChange={(val: Person[])=> setSelectedRows(val)} />
//         <button onClick={handleClick}> 展示所选的行 </button>
//       </div>
//     </div>
//   )
// }

// /**
//  * -------------------------------------------------------------------------
//  * 多行表头
//  * -------------------------------------------------------------------------
// */
// const multiColumns: ColumnType[] = [
//   {
//     title: '编号',
//     dataIndex: 'id',
//     key: 'id',
//   },
//   {
//     title: '个人信息',
//     columns: [
//       {
//         title: '姓名',
//         dataIndex: 'name',
//         key: 'name',
//       },
//       {
//         title: '年龄',
//         dataIndex: 'age',
//         key: 'age',
//       },
//     ]
//   },
//   {
//     title: '家庭住址',
//     columns: [
//       {
//         title: '所属省',
//         dataIndex: 'province',
//         key: 'province',
//       },
//       {
//         title: '所属市',
//         dataIndex: 'city',
//         key: 'city',
//       },
//     ]
//   },
//   {
//     title: '双亲信息',
//     columns: [
//       {
//         title: '父亲',
//         columns: [
//           {
//             title: '姓名(父)',
//             dataIndex: 'fatherName',
//             key: 'fatherName',
//           },
//           {
//             title: '年龄',
//             dataIndex: 'fatherAge',
//             key: 'fatherAge',
//           },
//         ]
//       },
//       {
//         title: '母亲',
//         columns: [
//           {
//             title: '姓名(母)',
//             dataIndex: 'motherName',
//             key: 'motherName',
//           },
//           {
//             title: '年龄',
//             dataIndex: 'motherAge',
//             key: 'motherAge',
//           },
//         ]
//       },
//     ]
//   },
// ]

// const MultiColumns = () => {
//   return (
//     <div>
//       <div style={{ width: '800px' }}>
//         <Table data={students} columns={multiColumns} rowKey={(val: Student) => val.id.toString()} />
//       </div>
//     </div>
//   )
// }

// /**
//  * ---------------------------------------------------------
//  * 带搜索的
//  * --------------------------------------------------------=
//  */
// const Filter = () => {
//   const [name, setName] = useState('')

//   useEffect(() => {
//     console.log('name', name)
//   }, [name])

//   const columns: ColumnType[] = [
//     {
//       title: '姓名',
//       dataIndex: 'name',
//       filter: () => <Input type="text" placeholder="请输入姓名" value={name} onChange={e => setName(e.target.value)} />,
//       key: 'name',
//     },
//     {
//       title: '年龄',
//       dataIndex: 'age',
//       key: 'age',
//     },
//     {
//       title: '是否结婚',
//       dataIndex: 'married',
//       key: 'married',
//       format: (val: boolean) => val ? <Married married>是</Married> : <Married>否</Married>
//     },
//     {
//       title: '住址',
//       dataIndex: 'address',
//       key: 'address',
//     },
//   ]
//   return (
//     <div style={{ background: "red" }}>
//       <div style={{ width: '800px' }}>
//         <Table data={data} columns={columns}></Table>
//       </div>
//     </div>
//   )
// }


// /**
//  * ---------------------------------------------------------
//  * 调整表格大小
//  * --------------------------------------------------------=
//  */
// const Resizable = () => {
//   return (
//     <div style={{ background: "red" }}>
//       <div style={{ width: '800px' }}>
//         <Table data={randomPerson(20)} columns={columns} lineHeight={70} scroll={{ x: 500, y: 270 }}></Table>
//       </div>
//     </div>
//   )
// }


// /**
//  * ---------------------------------------------------------
//  * 固定列
//  * --------------------------------------------------------=
//  */
// const tempStudents = randomStudents(29)
// const FixedColumns = () => {
//   const onFired = (e: any, row: Person) => {
//     e.stopPropagation()
//     alert(`${row.name} 你被开除了!`)
//   }
//   const columns: ColumnType[] = [
//     { title: '姓名', dataIndex: 'name', key: 'name', fixed: 'left', width: 100 },
//     { title: '年龄', dataIndex: 'age', key: 'age', fixed: 'left', width: 100 },
//     { title: '联系电话', dataIndex: 'phone', key: 'phone' },
//     { title: '性别', dataIndex: 'gender', key: 'gender' },
//     { title: '省份', dataIndex: 'province', key: 'province' },
//     { title: '城市', dataIndex: 'city', key: 'city' },
//     { title: '父亲名字', dataIndex: 'fatherName', key: 'fatherName' },
//     { title: '父亲年龄', dataIndex: 'fatherAge', key: 'fatherAge', },
//     { title: '母亲名字', dataIndex: 'motherName', key: 'motherName' },
//     { title: '母亲年龄', dataIndex: 'motherAge', key: 'motherAge', },
//     { title: '描述', dataIndex: 'desc', key: 'desc', },
//     {
//       title: '操作',
//       width: 130,
//       fixed: 'right',
//       dataIndex: 'operation',
//       key: 'operation',
//       align: 'right',
//       render: (row: Person) => {
//         return (
//           <div>
//             {
//               !row.married && <OperationButton onClick={(e) => onFired(e, row)}>开除</OperationButton>
//             }
//             <OperationButton>详情</OperationButton>
//           </div>
//         )
//       }
//     },
//   ]

//   const [index, setIndex] = useState(NaN)
//   const handleRowClick = (_: any, idx: number) => {
//     setIndex(idx)
//   }

//   return (
//     <div style={{ background: "red" }}>
//       <div style={{ width: '800px' }}>
//         <Table data={tempStudents} columns={columns} scroll={{y: 400}} activeIndex={index} onRowClick={handleRowClick} />
//       </div>
//     </div>
//   )
// }

// export const SelectTable = () => (<CanSelectTable />)
// export const HybridTableHead = () => (<MultiColumns />)
// export const FilterTable = () => (<Filter />)
// export const ResizableTable = () => <Resizable />
// export const FixedColumnTable = () => <FixedColumns />

interface Person {
  name: string
  age: number
  phone: string
  married: boolean
  address: string
}

interface Student {
  id: number
  name: string
  age: number
  gender: number
  phone: string
  province: string
  city: string
  fatherName: string
  fatherAge: number
  motherName: string
  motherAge: number
  desc?: string
}
export default {
  title: 'Table Demo',
  component: Table,
}
