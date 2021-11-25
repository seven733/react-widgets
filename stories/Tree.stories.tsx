import { withKnobs } from '@storybook/addon-knobs'
import React, { useState } from 'react'
import styled from 'styled-components'
import { Tree } from '../src'
import Book from '../src/Page'

const addressData = [
  {
    name: '浙江',
    cities: [
      {
        name: '杭州', countries: [
          { name: '余杭' },
          { name: '滨江' },
        ]
      },
      {
        name: '海宁', countries: [
          { name: '盐官' },
          { name: '桐乡' },
        ]
      }
    ]
  },
  { name: '北京' },
  {
    name: '四川',
    cities: [
      {
        name: '成都', countries: [
          { name: '高新区' },
          { name: '武侯区' },
        ]
      },
      {
        name: '绵阳', countries: [
          { name: '江油' },
          { name: '三台' },
        ]
      }
    ]
  },
]


export const Simple = () => {
  const NodeMap: RenderType = {
    province: (val: any) => <div style={{ background: "#fffbe6" }}>{val.name}</div>,
    cities: (val: any) => <div style={{ background: "#b5f5ec" }}>{val.name}</div>,
    countries: (val: any) => <div style={{ background: "#ffccc7" }}>{val.name}</div>,
  }
  const dataTypes = ['province', 'cities', 'countries'].map(item => ({
    dataIndex: item,
    render: NodeMap[item],
  }))
  return (
    <Book>
      <Tree data={addressData} dataTypes={dataTypes} unfold={true} />
    </Book>
  )
}



const school: SchoolItem[] = [
  {
    name: '第一中学',
    isPrivate: false,
    grades: [
      {
        name: '1年级',
        hasEnglishClass: false,
        class: [
          { name: '1班', isExcellentClass: true },
          { name: '2班', isExcellentClass: false },
          { name: '3班', isExcellentClass: true },
        ]
      },
      {
        name: '2年级',
        hasEnglishClass: false,
        class: [
          { name: '1班', isExcellentClass: true },
          { name: '2班', isExcellentClass: false },
          { name: '3班', isExcellentClass: true },
        ]
      },
      {
        name: '3年级',
        hasEnglishClass: true,
        class: [
          { name: '1班', isExcellentClass: true },
          { name: '2班', isExcellentClass: false },
          { name: '3班', isExcellentClass: true },
        ]
      },
    ]
  },
  {
    name: '胜育强中学',
    isPrivate: true,
    grades: [
      {
        name: '1年级',
        hasEnglishClass: false,
        class: [
          { name: '1班', isExcellentClass: true },
          { name: '2班', isExcellentClass: false },
          { name: '3班', isExcellentClass: true },
        ]
      },
      {
        name: '2年级',
        hasEnglishClass: false,
        class: [
          { name: '1班', isExcellentClass: true },
          { name: '2班', isExcellentClass: false },
          { name: '3班', isExcellentClass: true },
        ]
      },
      {
        name: '3年级',
        hasEnglishClass: true,
        class: [
          { name: '1班', isExcellentClass: true },
          { name: '2班', isExcellentClass: false },
          { name: '3班', isExcellentClass: true },
        ]
      },
    ]
  }
]


const School = ({ data }: { data: SchoolItem }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '20px' }}>{data.name}</div>
      <div style={{ color: data.isPrivate ? '#f4ffb8' : '#91d5ff' }}>{data.isPrivate ? '私立' : '国立'}</div>
    </div>
  )
}

const Grade = ({ data }: { data: GradeItem }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div style={{ fontSize: '20px' }}>{data.name}</div>
      <div style={{ color: data.hasEnglishClass ? '#95de64' : '#ffa39e' }}>是否有英语课：{data.hasEnglishClass ? '是' : '否'}</div>
    </div>
  )
}

const MyClass = ({ data }: { data: ClassItem }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '20px' }}>{data.name}</div>
        <div style={{ color: data.isExcellentClass ? '#95de64' : '#ffa39e' }}>{data.isExcellentClass ? '是' : '否'}</div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => alert(`当前班级为： ${data.name}`)}>展示当前数据</button>
      </div>
    </div>
  )
}

const MyIcon = styled.div`
  min-width: 20px;
  min-height: 20px;
  color: white;
  background: #722ed1;
  cursor: pointer;
  text-align: center;
  margin-right: 20px;
`

const CustomFoldIcon = ({ onToggle, show }: { onToggle: Function, show: boolean }) => (
  <MyIcon onClick={() => onToggle(!show)}> {show ? '-' : '+'} </MyIcon>
)

export const CustomTree = () => {
  const NodeMap: RenderType = {
    school: (val: SchoolItem) => <School data={val} />,
    grades: (val: GradeItem) => <Grade data={val} />,
    class: (val: ClassItem) => <MyClass data={val} />,
  }
  const StyleMap: StyleMapType = {
    school: { background: '#d9d9d9', padding: '24px', marginBottom: '20px' },
    grades: { padding: '24px', background: '#bfbfbf', marginBottom: '20px' },
    class: { margin: '20px auto', padding: '24px', border: '1px solid #d9d9d9' },
  }
  const dataTypes = ['school', 'grades', 'class'].map(item => ({
    dataIndex: item,
    render: NodeMap[item],
    style: StyleMap[item],
  }))
  return (
    <Tree data={school} dataTypes={dataTypes} foldIcon={CustomFoldIcon} indent="100px" />
  )
}

export default { title: 'Tree', decorators: [withKnobs], component: Tree }

interface RenderType {
  [prop: string]: (props: any) => React.ReactNode;
}
interface StyleMapType {
  [prop: string]: any
}

interface SchoolItem {
  name: string
  isPrivate: boolean
  grades: GradeItem[]
}

interface GradeItem {
  name: string
  hasEnglishClass: boolean
  class: ClassItem[]
}

interface ClassItem {
  name: string
  isExcellentClass: boolean
}