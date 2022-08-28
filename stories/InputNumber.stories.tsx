import React from 'react'
import styled from 'styled-components'
import { InputNumber} from '../src'
import { InputNumberProps } from '../src/InputNumber'

const Wrapper = styled.div`
  background: #fff;
  padding: 1em;
  height: 100vh;
`

export const Simple = (args: InputNumberProps) => {
  return <Wrapper>
    <InputNumber {...args} />
  </Wrapper>
}

export const Step = (args: InputNumberProps) => {
  return <Wrapper>
    <InputNumber {...args} step={2} />
  </Wrapper>
}

export const Min = (args: InputNumberProps) => {
  return <Wrapper>
    <InputNumber {...args} min={-6} placeholder="min: -6"  />
    <InputNumber {...args} min={0} placeholder="min: 0" />
  </Wrapper>
}

export const Max = (args: InputNumberProps) => {
  return <Wrapper>
    <InputNumber {...args} max={0} placeholder="max: 0" />
    <InputNumber {...args} max={20000} suffix="ml"   defaultValue={2} />
  </Wrapper>
}

export const MinAndMax= (args: InputNumberProps) => {
  return <Wrapper>
    <InputNumber {...args} min={-6} max={20} step={2} placeholder="between: -6~20" />
    <InputNumber {...args} min={0} max={0} step={2} placeholder="between: 0~0" />
    <InputNumber {...args} min={7} max={7} step={2} placeholder="between: 7~7" />
  </Wrapper>
}

export const Disabled = (args: InputNumberProps) => {
  return <Wrapper>
    <InputNumber disabled {...args} />
    <InputNumber disabled suffix="mg" {...args} />
  </Wrapper>
}


const CustomStyle = styled(InputNumber)`
  width: 400px;
`
export const modifyWidth = (args: InputNumberProps) => {
  return <Wrapper>
    <CustomStyle {...args} />
  </Wrapper>
}

export const suffix = (args: InputNumberProps) => {
  return <Wrapper>
    <InputNumber {...args} prefix="http://" />
    <br />
    <InputNumber {...args} suffix="g" />
    <br />
    <InputNumber {...args} prefix="http://"  suffix="com"/>
  </Wrapper>
}



export default {
  title: 'InputNumber',
  component: InputNumber,
  argTypes: {
    onChange: { action: true },
  },
  args: {
    disabled: false,
    defaultValue: 0,
    step: 1,
    min: 0,
    max: 100
  }
}


