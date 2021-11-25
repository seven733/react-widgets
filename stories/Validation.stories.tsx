// import { withKnobs } from '@storybook/addon-knobs'
import React, { useState } from 'react'
import { Field, ImageUpload, Input, InputNumber } from '../src'
import Book from '../src/Page'
import * as v from '../src/utils/validator'
import useForm from '../src/hooks/useForm'

const init: Person = {
  name: '',
  normalAge: 0,
  fullAge: 0,
  phone: '',
  avatar: '',
}

const Simple = () => {
  const rules: RulesMap = {
    name: [v.required('name required'), v.minLength(2), v.maxLength(5)],
    normalAge: [v.required(), v.min(0), v.max(100)],
    fullAge: [v.assertObj((val: any, obj: any) => val - obj.normalAge === 1, '虚岁只能比周岁大一岁')],
    phone: [v.required(), v.isTelephone((v: string) => `${v} 不是正确的电话号码`)],
    avatar: [v.assertObj((val: any) => val === 1, ' error message')]
  }
  const [formData, setFormData] = useState<Person>(init)

  const { validations, validate, validateField } = useForm({ fields: Object.keys(rules) })

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    validate<Person>(rules, formData).then(() => {
      alert('validate success')
    })
  }

  const handleNameChange = async (val: any, field: string) => {
    const newData = { ...formData, name: val }
    setFormData(newData)
    validateField(field, rules, newData)
  }

  return (
    <Book>
      <form>
        <Field label="姓名" required validation={validations.name!} horizontal>
          <Input
            style={{ width: '200px', background: "#d9d9d9" }}
            type='text'
            value={formData.name}
            placeholder="2~5个字"
            onChange={e => handleNameChange(e.currentTarget.value, 'name')} />
        </Field>
        <Field label="联系电话" required validation={validations.phone!} horizontal>
          <Input
            style={{ width: '200px', background: "#d9d9d9" }}
            type='text'
            placeholder="自定义错误消息"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.currentTarget.value })} />
        </Field>

        <Field label="周岁" validation={validations.normalAge!} required>
          <InputNumber
            style={{ width: '200px', background: "#d9d9d9" }}
            placeholder="0~100岁"
            value={formData.normalAge}
            onChange={val => setFormData({ ...formData, normalAge: val })} />
        </Field>
        <Field label="虚岁" validation={validations.fullAge!}>
          <InputNumber
            style={{ width: '200px', background: "#d9d9d9" }}
            value={formData.fullAge}
            placeholder="应该比周岁大一岁"
            onChange={val => setFormData({ ...formData, fullAge: val })} />
        </Field>
        <Field label="头像" validation={validations.avatar!}>
          <ImageUpload onChange={val => setFormData({  ...formData, avatar: val })} />
        </Field>

        <button type="submit" onClick={handleSubmit}>提交</button>
      </form>
    </Book>
  )
}

export default { title: 'Validation', component: Field }

export const SimpleCase = () => (<Simple />)

interface Person {
  name: string
  phone: string
  normalAge: number
  fullAge: number
  avatar: any
}
