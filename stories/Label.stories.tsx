import React, { useState } from 'react'
import styled from 'styled-components'
import { cover } from 'polished'
import {Page, Label, Input, Picker} from '../src'
import { ReactComponent as IconCheck } from '../src/assets/check.svg'

const StyledBackground = styled.div`
  ${cover()};
  background: #fff;
`
const items = ['本人', '父母', '爱人', '子女', '其他']

const FieldsForm = () => {
  const person = ''
  const [flag, setFlag] = useState(false)
  const handleConfirm = () => {
    setFlag(false)
  }
  const handleClick = () => {
    setFlag(true)
  }
  return (
      <StyledBackground>
        <Label field="姓名">讲方言</Label>
        <Label field="身份证号码">
          <Input style={{border: 'none'}} placeholder="请输入你的身份证号码" />
        </Label>
        <Label field="你与患者的关系">
          <span onClick={handleClick}>
            <span>{!person ? '请选择' : null}</span>
            {person}
            <span>{'>'}</span>
          </span>
          <Picker visible={flag} data={items} title="请选择你与患者的关系" onConfirm={handleConfirm}></Picker>
        </Label>
      </StyledBackground>
  )
}

export function FieldsFormDemo() {
  return <FieldsForm />
}

export const NaviLabel = () => (
  <Page style={{ background: '#fff' }}>
    <Label icon={<IconCheck />} output field='处方' to='/page-url'></Label>
    <Label field='处方' output to='/page-url'></Label>
  </Page>
)

export default { title: 'Label' }


