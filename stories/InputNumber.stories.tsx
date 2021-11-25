import React, { useState } from 'react'
import styled from 'styled-components'
import { InputNumber} from '../src'

const Wrapper = styled.div`
  background: #fff;
  padding: 1em;
  height: 100vh;
`

export const Simple = () => {

  const handleChange = (val: number) => {
    console.log('val', val)
  }
  return <Wrapper>
    <InputNumber onChange={handleChange} defaultValue={4} />
  </Wrapper>
}

export const Step = () => {
  const handleChange = (val: number) => {
    console.log('val', val)
  }
  return <Wrapper>
    <InputNumber step={2} onChange={handleChange} />
  </Wrapper>
}

export const Min = () => {
  const handleChange = (val: number) => {
    console.log('val', val)
  }
  return <Wrapper>
    <InputNumber min={-6} onChange={handleChange} placeholder="min: -6" />
    <InputNumber min={0} onChange={handleChange} placeholder="min: 0" />
  </Wrapper>
}

export const Max = () => {
  const [ val, setVal ] = useState<number>(0)
  const handleChange = (num: number) => {
    setVal(num)
  }
  return <Wrapper>
    <InputNumber max={0} onChange={handleChange} placeholder="max: 0"/>
    <InputNumber max={20000} onChange={handleChange} suffix="ml" defaultValue={val} />
  </Wrapper>
}

export const MinAndMax= () => {
  const handleChange = (val: number) => {
    console.log('val', val)
  }
  return <Wrapper>
    <InputNumber min={-6} max={20} step={2} onChange={handleChange} placeholder="between: -6~20" />
    <InputNumber min={0} max={0} step={2} onChange={handleChange} placeholder="between: 0~0" />
    <InputNumber min={7} max={7} step={2} onChange={handleChange} placeholder="between: 7~7" />
  </Wrapper>
}

export const Disabled = () => {
  const handleChange = (val: number) => {
    console.log('val', val)
  }
  return <Wrapper>
    <InputNumber disabled onChange={handleChange} />
    <InputNumber disabled onChange={handleChange} suffix="mg" />
  </Wrapper>
}


const CustomStyle = styled(InputNumber)`
  width: 400px;
`
export const modifyWidth = () => {
  const handleChange = (val: number) => {
    console.log('val', val)
  }
  return <Wrapper>
    <CustomStyle onChange={handleChange} />
  </Wrapper>
}

export const suffix = () => {
  const handleChange = (val: number) => {
    console.log('val', val)
  }
  return <Wrapper>
    <InputNumber onChange={handleChange} style={{ width: 300 }} prefix="http://" />
    <br />
    <InputNumber onChange={handleChange} style={{ width: 300 }} suffix="g" />
    <br />
    <InputNumber onChange={handleChange} style={{ width: 300 }} prefix="http://"  suffix="com"/>
  </Wrapper>
}


export default { title: 'InputNumber', component: InputNumber }


