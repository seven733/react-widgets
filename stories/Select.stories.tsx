import React, { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import * as R from 'ramda'
import { Select, Option } from '../src'
import { randomStudents, randomPerson } from './fakeData/student'
import { SelectProps } from '../src/Select'

const Wrapper = styled.div`
  background: #fff;
  padding: 1em;
  height: 100vh;
`

const students = randomStudents(20)
const data = randomStudents(20)

const hasZeroData = [
  { name: 'jack', id: 0 },
  { name: 'rose', id: 1 },
  { name: 'tom', id: 2 },
]

const StyledSelect = styled(Select) <{ rect?: DOMRect }>`
  ${({ rect }) => rect && css`
    .options {
      position: fixed;
      top: calc(${rect.bottom}px + 0.1em);
      left: ${rect.left}px;
      width: ${rect.width}px;
    }
  `}
`

const SelectDemo = (args: SelectProps<Student>) => {
  const ref = useRef<HTMLDivElement>()

  return (
    <Wrapper ref={ref} >
      <StyledSelect {...args} defaultValue={students[3]}>
        {students.map(o => <Option value={o} label={o.name} key={o.id}></Option>)}
      </StyledSelect>

      <Select {...args} bordered={false} style={{ width: 120 }}>
        {data.map(o => <Option value={o.id} label={o.name} key={o.id}></Option>)}
      </Select>
      <Select {...args}>
        {hasZeroData.map(o => <Option value={o.id} key={o.id} label={o.name}></Option>)}
      </Select>


      <hr style={{ margin: '200px auto' }} />
      <StyledSelect {...args} defaultValue={students[3]} optionsPosition="top">
        {students.map(o => <Option value={o} label={o.name} key={o.id}></Option>)}
      </StyledSelect>

    </Wrapper>)
}

export const Basic = (args: SelectProps<Student>) => <SelectDemo {...args} />

export const Clearable = (args: SelectProps<Student>) => {
  const students = randomStudents(20)
  return (
    <Wrapper>
      <Select {...args} allowClear>
        {
          students.map(o => <Option value={o.id} label={o.name} key={o.id}></Option>)
        }
      </Select>
    </Wrapper>)
}


export const Multiple = (args: SelectProps<Student>) => {
  const students = randomStudents(20)

  return (
    <Wrapper>
      <Select {...args} multiple>
        {
          students.map(o => <Option value={o.id} label={o.name} key={o.id} title={o.name}></Option>)
        }
      </Select>
    </Wrapper>)
}


export const Disabled = (args: SelectProps<Student>) => {
  const students = randomStudents(20)
  return (
    <Wrapper>
      <Select {...args} disabled={true}>
        {
          students.map(o =>
            <Option
              value={o.id}
              label={o.name}
              key={o.id}
            />)}
      </Select>
    </Wrapper>)
}

export const NoData = (args: SelectProps<Student>) => {

  return (
    <Wrapper>
      <Select {...args} placeholder="请选择">
      </Select>
      <br />

      <Select  {...args} placeholder="请选择" multiple>
      </Select>

      <br />
      <Select  {...args}bordered={false} style={{ width: 40 }}>
        {
          [].map(o => <Option value={o.id} label={o.name} key={o.id}></Option>)
        }
      </Select>
    </Wrapper>)
}


export const DisableOption = (args: SelectProps<Student>) => {
  const students = randomStudents(20)
  return (
    <Wrapper>
      <Select {...args} style={{ width: 300 }}>
        {
          students.map(o =>
            <Option
              value={o.id}
              label={o.name}
              key={o.id}
              disabled={o.id % 2 === 0}
            />
          )
        }
      </Select>
    </Wrapper>)
}

export const CustomOptions = (args: SelectProps<Student>) => {
  const students = randomStudents(20)
  return (
    <Wrapper>
      <Select {...args} style={{ width: 300 }}>
        {
          students.map(o =>
            <Option
              value={o.id}
              label={o.name}
              key={o.id}>
              <span style={{ float: 'left' }}>{o.name}</span>
              <span style={{ float: 'right' }}>{o.age}</span>
            </Option>
          )
        }
      </Select>
    </Wrapper>)
}

export const TestOptions = (args: SelectProps<Student>) => {

  const students: { label: string, value: number }[] = [
    { label: '君不见黄河之水天上来', value: 1 },
    { label: '君不见高堂明镜悲白发', value: 2 },
    { label: '人生得意须尽欢，莫使金樽空对月', value: 3 },
    { label: '天生我材必有用，千金散尽还复来', value: 4 },
    { label: '烹羊宰牛且为乐，会须一饮三百杯', value: 5 },
    { label: '烹羊宰牛且为乐，会须一饮三百杯', value: 6 },
    { label: '烹羊宰牛且为乐，会须一饮三百杯', value: 7 },
  ]

  return (
    <Wrapper>
      <Select {...args}>
        {
          students.map(o =>
            <Option
              value={o.value}
              label={o.label}
              key={o.value}>
            </Option>
          )
        }
      </Select>

      <br />
      <Select {...args} bordered={false}>
        {
          students.map(o =>
            <Option
              value={o.value}
              label={o.label}
              key={o.value}>
            </Option>
          )
        }
      </Select>
    </Wrapper>)
}


export const FilterOption = (args: SelectProps<Student>) => {
  const students = randomStudents(20)

  return (
    <Wrapper>
      <Select {...args} style={{ width: 300 }}
        filterOption
        placeholder="默认通过label过滤"
      >
        {
          students.map(o =>
            <Option
              value={o.id}
              label={o.name}
              key={o.id}>
            </Option>
          )
        }
      </Select>

      <br />

      <Select {...args} style={{ width: 400 }}
        placeholder="通过电话过滤"
        filterOption={(val: any, optionProps: any) => new RegExp(val).test(optionProps.value.phone)}
      >
        {
          students.map(o =>
            <Option
              value={o}
              label={o.name}
              key={o.id}>
              <span style={{ float: 'left' }}>{o.name}</span>
              <span style={{ float: 'right' }}>{o.phone}</span>
            </Option>
          )
        }
      </Select>
    </Wrapper>)
}

export const Suffix = (args: SelectProps<Student>) => {
  const students = randomStudents(20)

  return (
    <Wrapper>
      <Select {...args} style={{ width: 250 }} suffix="天">
        {
          students.map(o =>
            <Option value={o.id} label={o.name} key={o.id}></Option>
          )
        }
      </Select>
      <br />
      <Select {...args} prefix="test" style={{ width: 250 }} >
        {
          students.map(o =>
            <Option value={o.id} label={o.name} key={o.id}></Option>
          )
        }
      </Select>
      <br />

      <Select {...args} style={{ width: 250 }} suffix="天" prefix="test">
        {
          students.map(o =>
            <Option value={o.id} label={o.name} key={o.id}></Option>
          )
        }
      </Select>
      <br />

      <Select {...args} style={{ width: 250 }} suffix="天" prefix="test" disabled>
        {
          students.map(o =>
            <Option value={o.id} label={o.name} key={o.id}></Option>
          )
        }
      </Select>
    </Wrapper>)
}

const Related = () => {

  const grades: Grade[] = [
    {
      name: '一年级',
      value: '一年级',
      subjects: [
        { name: '语文', value: '1-y' },
        { name: '数学', value: '1-s' },
        { name: '科学', value: '1-k' },
      ]
    },
    {
      name: '二年级',
      value: '二年级',
      subjects: [
        { name: '语文', value: '2-y' },
        { name: '数学', value: '2-s' },
      ]
    },
    {
      name: '三年级',
      value: ' 三年级',
      subjects: []
    },
    {
      name: '四年级',
      value: ' 四年级',
    },
  ]

  const [grade, setGrade] = useState<Grade>()
  const [subjects, setSubjects] = useState<Subject[]>([])
  const [subject, setSubject] = useState<Subject>()

  const handleGradeChange = (data: any) => {
    const { value } = data
    setGrade(value)
    if (value.subjects) {
      setSubjects(value.subjects)
    }
    setSubject(undefined)
  }
  const handleSubjectChange = (data: any) => {
    setSubject(data.value)
  }
  return (
    <Wrapper>
      <Select onChange={handleGradeChange} defaultValue={grade}>
        {
          grades.map(o =>
            <Option
              value={o}
              label={o.name}
              key={o.name}>
            </Option>
          )
        }
      </Select>

      <br />
      <Select onChange={handleSubjectChange} defaultValue={subject}>
        {
          subjects.map(o =>
            <Option
              value={o}
              label={o.name}
              key={o.name}>
            </Option>
          )
        }
      </Select>
    </Wrapper>)
}

export const RelatedSelect = () => <Related />


const AddItem = ({ onAdd }: { onAdd: (value: string) => void }) => {
  const [val, setVal] = useState('')
  const handleClick = () => {
    onAdd(val)
    setVal('')
  }
  return <div onClick={e => e.stopPropagation()} style={{ display: 'flex', width: '100%' }}>
    <input value={val} onChange={e => setVal(e.currentTarget.value)} style={{ width: '40%' }} />
    <span onClick={handleClick}>Add</span>
  </div>
}

const doctorData = randomPerson(4)
const DropDownRender = () => {
  const [selected, setSelected] = useState<number[]>([])
  const [doctors, setDoctors] = useState(doctorData)
  const handleChange = (data: { label: string, value: number }[]) => {
    setSelected(R.pluck('value', data))
  }

  const handleAdd = (val: string) => {
    const newDoctor = randomPerson(1)[0]
    const newId = doctors.length + 1
    newDoctor.id = newId
    newDoctor.name = val
    setSelected(selected.concat(newId))
    setDoctors(doctors.concat(newDoctor))
  }
  return (
    <Wrapper>
      <Select
        onChange={handleChange}
        style={{ width: '200px' }}
        defaultValue={selected}
        multiple
        addible={<AddItem onAdd={handleAdd} />}
      >
        {
          doctors.map(o => <Option value={o.id} label={o.name} key={o.id}></Option>)
        }
      </Select>
    </Wrapper>)
}

export const AddOption = () => <DropDownRender />

const OverflowYVisible = styled.div`
  background: #fff;
  padding: 1em;
  height: 60px;
  overflow-x: scroll;
  overflow-y: visible;
`

export const OverflowCase = () => {
  return (
    <OverflowYVisible>
      <Select onChange={() => { }} defaultValue={students[3]}>
        {students.map(o => <Option value={o} label={o.name} key={o.id}></Option>)}
      </Select>
    </OverflowYVisible>)
}

export interface Student {
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


Clearable.storyName = 'Clearable single select'
Multiple.storyName = 'Basic multiple select'

DisableOption.storyName = 'Disabled option'

CustomOptions.storyName = 'Custom template'

FilterOption.storyName = 'Option filtering'
interface Grade {
  name: string
  value: string
  subjects?: Subject[]
}
interface Subject {
  name: string
  value: string
}


export default {
  title: 'Select',
  component: Select,
  argTypes: {
    onChange: { action: true },
    onClear: { action: true },
    filterOption: { control: false },
    prefix: { control: false },
    suffix: { control: false },
    addible: { control: false },
  },
  args: {
    allowClear: false,
    placeholder: 'please select',
    multiple: false,
    bordered: true,
    disabled: false,
    optionsPosition: 'bottom',
  }
}