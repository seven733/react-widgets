import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import * as R from 'ramda'
import { Select, Option } from '../src'
import { randomStudents, randomPerson } from './fakeData/student'

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

const SelectDemo = () => {
  const ref = useRef<HTMLDivElement>()
  const [val, setVal] = useState<number>(1)
  const handleDepartmentChange = (data: any) => { }
  const [rect, setRect] = useState<DOMRect>()

  const handleChange = (data: any) => { }

  useEffect(() => {
    const input = ref.current?.querySelector('input').parentElement
    const rect = input?.getBoundingClientRect()
    setRect(rect)
  }, [])

  return (
    <Wrapper ref={ref} >
      <StyledSelect onChange={handleDepartmentChange} defaultValue={students[3]}>
        {students.map(o => <Option value={o} label={o.name} key={o.id}></Option>)}
      </StyledSelect>

      <Select onChange={handleChange} defaultValue={0} bordered={false} style={{ width: 120 }}>
        {data.map(o => <Option value={o.id} label={o.name} key={o.id}></Option>)}
      </Select>
      <Select onChange={handleChange} defaultValue={val}>
        {hasZeroData.map(o => <Option value={o.id} key={o.id} label={o.name}></Option>)}
      </Select>
      <button onClick={() => setVal(0)}>set 0</button>


      <hr style={{ margin: '200px auto' }} />
      <StyledSelect onChange={handleDepartmentChange} defaultValue={students[3]} optionsPosition="top">
        {students.map(o => <Option value={o} label={o.name} key={o.id}></Option>)}
      </StyledSelect>

    </Wrapper>)
}

export const Basic = () => <SelectDemo />

export const Clearable = () => {
  const students = randomStudents(20)
  const handleDepartmentChange = (data: any) => {
  }
  return (
    <Wrapper>
      <Select onChange={handleDepartmentChange} defaultValue={0} allowClear>
        {
          students.map(o => <Option value={o.id} label={o.name} key={o.id}></Option>)
        }
      </Select>
    </Wrapper>)
}


export const Multiple = () => {
  const students = randomStudents(20)
  const handleDepartmentChange = (data: any) => {
  }

  return (
    <Wrapper>
      <Select onChange={handleDepartmentChange} defaultValue={[1, 3]} multiple>
        {
          students.map(o => <Option value={o.id} label={o.name} key={o.id} title={o.name}></Option>)
        }
      </Select>
    </Wrapper>)
}


export const Disabled = () => {
  const students = randomStudents(20)
  const handleDepartmentChange = (data: any) => {
  }
  return (
    <Wrapper>
      <Select onChange={handleDepartmentChange} defaultValue={1} disabled={true}>
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

export const NoData = () => {
  const handleChange = (data: any) => {
  }

  return (
    <Wrapper>
      <Select onChange={handleChange} defaultValue={1} placeholder="?????????">
      </Select>
      <br />

      <Select onChange={handleChange} defaultValue={1} placeholder="?????????" multiple>
      </Select>

      <br />
      <Select onChange={handleChange} defaultValue={0} bordered={false} style={{ width: 40 }}>
        {
          [].map(o => <Option value={o.id} label={o.name} key={o.id}></Option>)
        }
      </Select>
    </Wrapper>)
}


export const DisableOption = () => {
  const students = randomStudents(20)
  const handleDepartmentChange = (data: any) => {
  }

  return (
    <Wrapper>
      <Select onChange={handleDepartmentChange} defaultValue={1} style={{ width: 300 }}>
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

export const CustomOptions = () => {
  const students = randomStudents(20)
  const handleDepartmentChange = (data: any) => {
  }

  return (
    <Wrapper>
      <Select onChange={handleDepartmentChange} defaultValue={1} style={{ width: 300 }}>
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

export const TestOptions = () => {

  const students: { label: string, value: number }[] = [
    { label: '??????????????????????????????', value: 1 },
    { label: '??????????????????????????????', value: 2 },
    { label: '?????????????????????????????????????????????', value: 3 },
    { label: '?????????????????????????????????????????????', value: 4 },
    { label: '?????????????????????????????????????????????', value: 5 },
    { label: '?????????????????????????????????????????????', value: 6 },
    { label: '?????????????????????????????????????????????', value: 7 },
  ]
  const handleDepartmentChange = (data: any) => {
  }

  return (
    <Wrapper>
      <Select onChange={handleDepartmentChange} defaultValue={1}>
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
      <Select onChange={handleDepartmentChange} defaultValue={1} bordered={false}>
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


export const FilterOption = () => {
  const students = randomStudents(20)
  const handleDepartmentChange = (data: any) => {
  }

  return (
    <Wrapper>
      <Select onChange={handleDepartmentChange} style={{ width: 300 }}
        filterOption
        placeholder="????????????label??????"
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

      <Select onChange={handleDepartmentChange} style={{ width: 400 }}
        placeholder="??????????????????"
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

export const Suffix = () => {
  const students = randomStudents(20)
  const handleChange = (data: any) => {
  }

  return (
    <Wrapper>
      <Select onChange={handleChange} defaultValue={1} style={{ width: 250 }} suffix="???">
        {
          students.map(o =>
            <Option value={o.id} label={o.name} key={o.id}></Option>
          )
        }
      </Select>
      <br />
      <Select onChange={handleChange} defaultValue={1} prefix="test" style={{ width: 250 }} >
        {
          students.map(o =>
            <Option value={o.id} label={o.name} key={o.id}></Option>
          )
        }
      </Select>
      <br />

      <Select onChange={handleChange} defaultValue={1} style={{ width: 250 }} suffix="???" prefix="test">
        {
          students.map(o =>
            <Option value={o.id} label={o.name} key={o.id}></Option>
          )
        }
      </Select>
      <br />

      <Select onChange={handleChange} defaultValue={1} style={{ width: 250 }} suffix="???" prefix="test" disabled>
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
      name: '?????????',
      value: '?????????',
      subjects: [
        { name: '??????', value: '1-y' },
        { name: '??????', value: '1-s' },
        { name: '??????', value: '1-k' },
      ]
    },
    {
      name: '?????????',
      value: '?????????',
      subjects: [
        { name: '??????', value: '2-y' },
        { name: '??????', value: '2-s' },
      ]
    },
    {
      name: '?????????',
      value: ' ?????????',
      subjects: []
    },
    {
      name: '?????????',
      value: ' ?????????',
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


export default { title: 'Select', component: Select }