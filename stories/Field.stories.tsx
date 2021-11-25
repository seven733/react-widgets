import * as React from 'react'
import {Field, Form} from '../src'
import {Meta, Story} from '@storybook/react/types-6-0'
import {FieldProps} from '../src/Field'

export default { title: 'Field', component: Field } as Meta

export const Doc: Story<FieldProps> = (args) => {
  return <Field {...args}>
    <input type='text' />
  </Field>
}
Doc.args = {
  label:'姓名',
  required:true
}

export const Sample = () => {
  return <div>
    <Field label="姓名" required={true}>
      <input type='text' />
    </Field>
    <Field label="年龄" horizontal={true}>
      <input type="number" />
    </Field>
  </div>
}

export const FormAsChildren = () => {
  const schema: Schema = {
    els: [],
    additional: [
      {
        limit: 3,
        least: 1,
        dataIndex: 'drugSpecsInPrescription',
        els: [
          {
            type: 'select' , label: '药品商品名', dataIndex: 'brandId', required: true,
            options: [
              { label: '规格1', value: 1 },
              { label: '规格2', value: 2 },
              { label: '规格3', value: 3 },
              { label: '规格4', value: 4 },
            ],
          },
          {
            type: 'select' , label: '药品规格', dataIndex: 'drugUnitSpecId', required: true,
            options: [
              { label: '规格1', value: 1 },
              { label: '规格2', value: 2 },
              { label: '规格3', value: 3 },
              { label: '规格4', value: 4 },
            ],
          },
          {
            type: 'select' , label: '包装类型', dataIndex: 'drugPackageSpecId', required: true,
            options: [
              { label: '规格1', value: 1 },
              { label: '规格2', value: 2 },
              { label: '规格3', value: 3 },
              { label: '规格4', value: 4 },
            ],
          },
          {
            type: 'select' , label: '包装数量', dataIndex: 'packageAmount', required: true,
            options: [
              { label: '规格1', value: 1 },
              { label: '规格2', value: 2 },
              { label: '规格3', value: 3 },
              { label: '规格4', value: 4 },
            ],
          },
          {
            type: 'input' , label: '药品数量(最小单位)', dataIndex: 'unitSpecPackageAmount', disabled: true
          },
        ]
      }
    ]
  }

  return <Field label="药品配置" required={true} style={{ width: '500px' }}>
    <Form schemas={schema} dropDefaultSubmitButton
  />
  </Field>
}

