import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import { Form, Cascader, Input } from '../src'
import * as v from '../src/utils/validator'

const Wrapper = styled.div`
  background: #fff;
  padding: 1em;
  height: 100vh;
`

const Container = styled.div`
  width: 300px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`

// const CascaderMemo = memo(Cascader)
const Address = (props: AddressProps) => {
  const { options, defaultValue, onChange } = props

  const [region, setRegion] = useState<string | undefined>()
  const [detail, setDetail] = useState<string | undefined>()

  useEffect(() => {
    if (onChange && detail && region) {
      onChange(region + detail)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [region, detail])

  const handleChange = (val: any) => {
    setRegion(val.join('/'))
  }

  const handleDetailChange = ( e: any) => {
    setDetail(e.currentTarget.value)
  }

  return <Container>
     <Cascader options={options} defaultValue={defaultValue} onChange={handleChange}/>
     <Input onChange={handleDetailChange} placeholder="详细地址" value={detail} type="text" />
  </Container>
}

interface AddressProps {
  defaultValue?: string[] | number[]
  onChange?: (val: string) => void
  options: any
  [key: string]: any
}

const addressOptions = [
  {
    label: '北京',
    value: 'beijing',
  },
  {
    label: '四川',
    value: 'sichuan',
    children: [
      {
        label: '成都',
        value: 'chengdu',
        children: [
          {
            label: '高新区',
            value: 'gx'
          },
          {
            label: '武侯区',
            value: 'wh'
          },
          {
            label: '天府新区',
            value: 'tfx'
          },
        ]
      },
      {
        label: '绵阳',
        value: 'my',
        children: [
          {
            label: '江油',
            value: 'jy'
          },
          {
            label: '三台',
            value: 'st'
          },
        ]
      }
    ]
  },
  {
    label: '云南',
    value: 'yunnan',
    children : [
      {
        label: '昆明',
        value: 'kunming',
        children: [
          {
            label: '呈贡',
            value: 'cg'
          },
          {
            label: '五华',
            value: 'wh'
          },
        ]
      },
      {
        label: '大理',
        value: 'dali'
      }
    ]
  },
  {
    label: '浙江',
    value: 'zhejiang',
    children: [
      {
        label: '嘉兴',
        value: 'jx'
      },
      {
        label: '杭州',
        value: 'hz',
        children: [
          {
            label: '滨江',
            value: 'bj'
          },
          {
            label: '余杭',
            value: 'yh'
          },
        ]
      },
    ]
  }
]


export const simple = () => {
  const schema: Schema = {
    columns: 3,
    els: [
      {
        type: 'select', dataIndex: 'sex', label: '性别', width: '300px',
        options: [
          { label: '男', value: 1},
          { label: '女', value: 2},
        ],
        rules: [v.required()]
      },
      {
        type: 'select', dataIndex: 'gender', label: '性别', width: '300px',
        suffix: {
          type: 'text',
          value: 'test'
        },
        options: [
          { label: '男', value: 1},
          { label: '女', value: 2},
        ],
        rules: [v.required()]
      },
      {
        type: 'input', dataIndex: 'name', label: '姓名', required: true,
        rules: [v.required('name required'), v.minLength(2), v.maxLength(5)],
      },
      {
        type: 'input', dataIndex: 'height', label: '身高',
        suffix: {
          type: 'text',
          value: 'cm'
        }
      },
      // {
      //   type: 'input', dataIndex: 'dose', label: '剂量', required: true,
      //   rules: [v.required(), v.isInteger()],
      //   // suffix: {
      //   //   type: 'select',
      //   //   dataIndex: 'doseUnit',
      //   //   value: '',
      //   //   options: [
      //   //     { label: 'mg', value: 'mg' },
      //   //     { label: 'ml', value: 'ml' },
      //   //   ],
      //   //   rules: [v.required('请选择计量单位')],
      //   // }
      // },
      // {
      //   type: 'input', dataIndex: 'phone', label: '联系电话', required: true,
      //   rules: [v.required(), v.isTelephone((v: string) => `${v} 不是正确的电话号码`)],
      // },
      {
        type: 'number', dataIndex: 'normalAge', label: '周岁', defaultValue: 18,
        rules: [v.required(), v.min(0), v.max(100)], width: '100px',
        suffix: { type: 'text', value: '岁' },
      },
      {
        type: 'number', dataIndex: 'fullAge', label: '虚岁',
        disabled: true,
        rules: [v.assertObj((val: any, obj: any) => val - obj.normalAge === 1, '虚岁只能比周岁大一岁')],
        suffix: { type: 'text', value: '岁' },
      },
      {
        type: 'cascader', dataIndex: 'region', label: '地区-级联', width: '200px',
        options: addressOptions,
        defaultValue: 'jy',
        rules: [v.required()],
      },
      // {
      //   type: 'input', dataIndex: 'address', label: '详细地址', width: 250,
      //   rules: [v.required('name required'), v.minLength(2), v.maxLength(3)],
      //   hidden: (data: any) => data.gender === 1,
      // },
      // {
      //   type: 'input', dataIndex: 'desc',
      //   label: '描述',
      //   width: 300,
      //   disabled: true,
      //   hidden: (data: any) => data.gender === 2,
      //   defaultValue: 'test',
      // },
      { type: 'input', dataIndex: 'hobbies', label: '爱好', disabled: true },
      {
        type: 'datePicker', dataIndex: 'date', label: '日期', required: true,
        rules: [
          v.required(),
          v.assert((val: number) => val <= Date.now() + 3 * 24 * 60 * 60 * 1000, 'error')
        ]
      }

    ]
  }

  const handleSubmit = (formData: any) => {
    console.log('handle submit , formData', formData)
  }

  return <Wrapper>
    <Form
      submitText="确认提交。。。。。"
      schemas={schema}
      onSubmit={handleSubmit}
      onChange={ (formData: any) => console.log('onChange formData', formData) }
    />
  </Wrapper>
}

const Custom = ({ onChange }: {onChange: Function}) => {
  const [value, setValue] = useState()
  const handleChange = (e: any) => {
    const val = e.currentTarget.value
    setValue(val)
    onChange && onChange(val)
  }
  return <Input type='text' value={value} onChange={handleChange} placeholder="please input " />
}

const CustomAddress = ({ onChange }: {onChange: Function}) => {
  const handleChange = (val: string) => {
    onChange && onChange(val)
  }
  return <Address options={addressOptions} onChange={handleChange} />
}

const validateAge = (val: number, _: any, curRowData: any): boolean => {
  if (!curRowData || !curRowData.stage) {
    return true
  }

  if (curRowData.stage === '小学') {
    return val >= 6
  }

  if (curRowData.stage === '初中') {
    return val >= 12
  }

  if (curRowData.stage === '高中') {
    return val >= 15
  }

  return true
}

const handleAgeErrorMsg = (val: number, _: any, curRowData: any): string => {
  switch(curRowData.stage) {
    case '小学': return `${val}小于最小年龄为6岁`;
    case '初中': return `${val}小于最小年龄为12岁`;
    case '高中': return `${val}小于最小年龄为15岁`;
    default: return '年龄填写错误'
  }

}

export const TwoLevelComponents = () => {
  const schema: Schema = {
    columns: 3,
    els: [
      // {
      //   type: 'input', dataIndex: 'name', label: '姓名', required: true,
      //   defaultValue: 'rose',
      //   rules: [v.required('name required'), v.minLength(2), v.maxLength(5)],
      // },
      // {
      //   type: 'number', dataIndex: 'normalAge', label: '周岁',
      //   rules: [v.required(), v.min(0), v.max(100)],
      // },
      // {
      //   type: 'number', dataIndex: 'fullAge', label: '虚岁',
      //   rules: [v.assertObj((val: any, obj: any) => val - obj.normalAge === 1, '虚岁只能比周岁大一岁')],
      //   computed: [(data: any, ) => data.normalAge + 1, ['normalAge']]
      // },
      // {
      //   type: 'cascader', dataIndex: 'address', label: '联系地址',
      //   options: addressOptions,
      //   rules: [v.required()],
      // },
      {
        type: 'custom', dataIndex: 'custom', label: '自定义组件',
        rules: [v.required()],
        component: Custom
      },
      {
        type: 'custom', dataIndex: 'customAddress', label: 'Address',
        component: CustomAddress
      },
      // {
      //   type: 'input', dataIndex: 'dose', label: '剂量', required: true,
      //   rules: [v.required(), v.isInteger()],
      //   suffix: {
      //     type: 'select',
      //     dataIndex: 'doseUnit',
      //     value: '',
      //     width: 80,
      //     options: [
      //       { label: 'mg', value: 'mg' },
      //       { label: 'ml', value: 'ml' },
      //     ],
      //     rules: [v.required('请选择计量单位')],
      //   }
      // },
    ],
    additional: [
      {
        dataIndex: 'contact',
        els: [
          {
            type: 'select', dataIndex: 'stage', label: '阶段',
            options: [
              { label: '小学', value: '小学' },
              { label: '初中', value: '初中' },
              { label: '高中', value: '高中' },
            ],
          },
          {
            type: 'number', dataIndex: 'age', label: '年龄', required: true,
            rules: [
              v.required('age required'),
              v.assertObj(
                (val: number, formData: any, curRowData: any) => validateAge(val, formData, curRowData),
                (val: number, formData: any, curRowData: any) => handleAgeErrorMsg(val, formData, curRowData)
              )
            ],
            suffix: {
              type: 'text',
              dataIndex: 'ageUnit',
              value: '岁',
              rules: [v.required('请选择单位')],
            }
          },
          {
            type: 'input', dataIndex: 'intro', label: '简介',
            rules: [v.required()],
          },
          {
            type: 'input', dataIndex: 'phone', label: '电话', required: true,
            disabled: (data: any) => data.name === 'test',
            rules: [v.required(), v.isTelephone((v: string) => `${v} 不是正确的电话号码`)],
          },
          {
            type: 'input', dataIndex: 'dose', label: '剂量', required: true,
            rules: [v.required(), v.isInteger()],
            suffix: {
              type: 'select',
              dataIndex: 'doseUnit',
              value: '',
              options: [
                { label: 'mg', value: 'mg' },
                { label: 'ml', value: 'ml' },
              ],
              rules: [v.required('请选择计量单位')],
            }
          },
        ]
      },
      // {
      //   dataIndex: 'contactAddress',
      //   els: [
      //     {
      //       type: 'input', dataIndex: 'phone', label: '电话', required: true,
      //       rules: [v.required(), v.isInteger()],
      //       suffix: {
      //         type: 'select',
      //         dataIndex: 'code',
      //         value: '',
      //         options: [
      //           { label: '+86', value: '86' },
      //           { label: '+100', value: '100' },
      //           { label: '+101', value: '101' },
      //           { label: '+102', value: '102' },
      //         ],
      //         rules: [v.required('请选择区号')],
      //       }
      //     },
      //     {
      //       type: 'input', dataIndex: 'city', label: '城市', required: true,
      //       rules: [v.required(), v.minLength(4), v.maxLength(5)],
      //     },
      //     {
      //       type: 'input', dataIndex: 'country', label: '县', required: true,
      //       rules: [v.required(), v.minLength(4), v.maxLength(5)],
      //     },
      //     { type: 'input', dataIndex: 'street', label: '街' },
      //     { type: 'input', dataIndex: 'desc', label: '描述' },
      //   ]
      // },
      // {
      //   dataIndex: 'prescript',
      //   els: [
      //     {
      //       type: 'number', dataIndex: 'aCycle', label: '一次周期', required: true,
      //       rules: [v.required()]
      //     },
      //     {
      //       type: 'number', dataIndex: 'times', label: '几个周期', required: true,
      //       rules: [v.required(), v.max(5)]
      //     },
      //     {
      //       type: 'number', dataIndex: 'total', label: '总时长',
      //       disabled: true,
      //       computed: [(data: any) => data.aCycle && data.times ? data.aCycle * data.times : 0, ['aCycle', 'times']]
      //     }
      //   ]
      // }
    ]
  }

  const formData = {
    name: 'jack',
    fullAge: 12,
    contact: [
      {
        name: 'test1',
        phone: '1233123'
      },
      {
        name: 'test2',
        phone: '7897898'
      },
    ]
  }

  const formRef = useRef(null)
  const handleCLick = async () => {
    try {
      const res = await formRef.current.submit()
      console.log('res formData', res)
    } catch (err) {
      // handle error
    }
  }

  return (<div style={{ width: '600px',height: '100vh', background: '#fff' }}>
    <Form schemas={schema} ref={formRef} dropDefaultSubmitButton={true} defaultFormData={formData} />
    <button onClick={handleCLick}>外部触发submit事件</button>
  </div>)
}


// export const threeLevel = () => {
//   const schema: Schema = {
//     columns: 3,
//     els: [
//       { type: 'input', dataIndex: 'name', label: '姓名', required: true },
//       { type: 'input', dataIndex: 'nick', label: '昵称' },
//     ],
//     additional: [
//       {
//         dataIndex: 'contact',
//         els: [
//           { type: 'input', dataIndex: 'name', label: '联系人' },
//           { type: 'input', dataIndex: 'phone', label: '电话' },
//         ],
//         additional: [
//           {
//             dataIndex: 'test',
//             els: [
//               { type: 'input', dataIndex: 'name', label: '联系人-3' },
//               { type: 'input', dataIndex: 'phone', label: '电话-3' },
//             ]
//           }
//         ]
//       },
//       {
//         dataIndex: 'address',
//         els: [
//           { type: 'input', dataIndex: 'city', label: '城市' },
//           { type: 'input', dataIndex: 'country', label: '县' },
//           { type: 'input', dataIndex: 'street', label: '街' },
//         ]
//       }
//     ]
//   }

//   return <Form schemas={schema} />
// }

export const TestComponents = () => {
  const [formData, setFormData] = useState({})
  const schema: Schema = {
    columns: 3,
    els: [
      {
        type: 'input', dataIndex: 'weight', label: '患者体重', required: true,
        placeholder: '请输入体重',
        rules: [v.required()],
        suffix: { type: 'text', value: 'cm' },
      },
      {
        type: 'input', dataIndex: 'height', label: '患者身高', required: true,
        rules: [v.required()],
        suffix: { type: 'text', value: 'kg' },
      },
      {
        type: 'input', dataIndex: 'doctor', label: '药师', required: true,
        rules: [v.required(), v.maxLength(6), v.minLength(2)],
      },
      {
        type: 'select',  dataIndex: 'way', label: '给药途径',
        placeholder: '请选择',
        options: [
          { label: '注射', value: 1 },
          { label: '口福', value: 2 },
        ],
      },
      {
        type: 'select', dataIndex: 'date', label: '给药时间',
        options: [
          { label: '必要时', value: 1 },
          { label: '晚上', value: 2 },
        ],
      },
      {
        type: 'datePicker', dataIndex: 'date', label: '真实用药时间',
        placeholder: '请选择用药时间',
      },
    ],
    additional: [
      {
        least: 1,
        dataIndex: 'contact',
        els: [
          {
            type: 'input', dataIndex: 'name', label: '联系人姓名',
            placeholder: '请输入联系人姓名',
          }
        ]
      },
      {
        limit: 3,
        dataIndex: 'user',
        els: [
          {
            type: 'input', dataIndex: 'name', label: '用户姓名',
          }
        ]
      },
      {
        limit: 4,
        least: 3,
        dataIndex: 'drugInfo',
        els: [
          {
            type: 'input', dataIndex: 'brandName', label: '药品商品名',
            rules: [
              v.required('必要的'), v.minLength(3, '最小为3'), v.maxLength(10, '最大为10'),
              v.assertObj((val: any, _: any, curForm: any) => val && curForm.brandName !== '12345', '不能等于12345')
            ],
          },
          {
            type: 'select', dataIndex: 'specification', label: '药品规格', required: true,
            placeholder: '请选择药品规格',
            options: [
              { label: '规格1', value: 1 },
              { label: '规格2', value: 2 },
              { label: '规格3', value: 3 },
              { label: '规格4', value: 4 },
            ],
          },
          {
            type: 'select', dataIndex: 'type', label: '包装类型', required: true,
            options: [
              { label: '包装类型1', value: 1 },
              { label: '包装类型2', value: 2 },
              { label: '包装类型3', value: 3 },
              { label: '包装类型4', value: 4 },
            ],
          },
          {
            type: 'select', dataIndex: 'num', label: '包装数量', required: true,
            options: [
              { label: '包装数量1', value: 1 },
              { label: '包装数量2', value: 2 },
              { label: '包装数量3', value: 3 },
              { label: '包装数量4', value: 4 },
            ],
          },
          {
            type: 'number', dataIndex: 'total', label: '药品数量(最小单位)',
            disabled: true,
            computed: [
              (data: any) => data.num && data.specification ? data.num * data.specification : 0,
              ['num', 'specification']
            ]
          },
        ]
      }
    ]
  }
  const formRef = useRef(null)
  const handleSubmit = async () => {
    try {
      // @ts-ignore
      const form = await formRef.current.submit()
      console.log('handle submit , formData', form)
    } catch (err) {
      // handle error
    }
  }

  const handleChange = (data: any) => {
    setFormData(data)
  }

  return <Wrapper>
    <Form
      schemas={schema}
      dropDefaultSubmitButton
      onChange={handleChange}
      defaultFormData={formData}
      ref={formRef}
      />
      <button onClick={handleSubmit}>submit</button>
  </Wrapper>
}


export const Basic = () => {
  const [ basicFormData, setBasicFormData ] = useState({
    auditDate: Date.now(),
    weight: undefined,
    height: undefined
  })
  const BasicFormSchema: Schema = {
    columns: 3,
    els: [
      {
        type: 'datePicker', dataIndex: 'auditDate', label: '认定日期', required: true,
        width: '100%',
        rules: [
          v.required('请选择认定日期')
        ]
      },
      {
        type: 'input', dataIndex: 'height', label: '患者身高',
        width: '100%',
        suffix: { type: 'text', value: 'cm' },
        rules: [
          v.isInteger('患者身高必须是数字'),
          v.assertObj((val: string) => R.isNil(val) || parseInt(val) >= 1, '患者身高最小值1'),
          v.assertObj((val: string) => R.isNil(val) || parseInt(val) <= 500, '患者身高最大值500')
        ]
      },
      {
        type: 'input', dataIndex: 'weight', label: '患者体重',
        width: '100%',
        suffix: { type: 'text', value: 'kg' },
        rules: [
          v.isInteger('患者体重必须是数字'),
          v.assertObj((val: string) => R.isNil(val) || parseInt(val) >= 1, '患者体重最小值1'),
          v.assertObj((val: string) => R.isNil(val) || parseInt(val) <= 500, '患者体重最大值500')
        ]
      }
    ]
  }


  const basicFormRef = useRef(null)
  const handleSubmit = async () => {
    try {
      // @ts-ignore
      const form = await basicFormRef.current.submit()
      console.log('handle submit , formData', form)
    } catch (err) {
      // handle error
    }
  }

  return <Wrapper>
    <Form
      schemas={BasicFormSchema}
      defaultFormData={basicFormData}
      onChange={(data: any) => {
        console.log('data==============>', data)
        setBasicFormData(data)
      }}
      ref={basicFormRef}
      dropDefaultSubmitButton
    />
    <button onClick={handleSubmit}>submit</button>
  </Wrapper>
}

export default { title: 'Form', component: Form }
