import React from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import {Cascader} from '../src'
import {Meta, Story} from '@storybook/react/types-6-0'
import {CascaderProps} from '../src/Cascader'


const Wrapper = styled.div`
  background: #fff;
  padding: 1em;
  height: 100vh;
`

const getOptions = (level: number, num: number) => {
  const genData = (path: string = '', l: number = 0): any => {
    return R.range(0, num).map(item => {
      const str = path === '' ? item.toString() : `${path}-${item}`
      return {
        label: str,
        value: str,
        children: l >= level - 1 ? [] : genData(str, l + 1)
      }
    })
  }

  return genData()
}

const data = getOptions(5, 20)
const options = [
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
    children: [
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
const defaultValue = ['sichuan', 'my', 'st']


export default {
  title: 'Cascader',
  component: Cascader,
  argTypes: {
    onChange: {description: '选择完成时的回调', type: {required: true}},
    options: {
      type: {required: true,}, table: {
        type: {
          summary: '选择的数组 OptionItem',
          detail: '{label: string\n' +
            '  value: number | string\n' +
            '  children?: OptionItem[]\n' +
            '  disabled?: boolean' +
            '}',
        }
      }, control: null
    },
    single: {description: '设置true后返回数组的最后一个值', table: {defaultValue: {summary: 'false'}}},
    defaultValue: {description: 'options数组里对象的value组成的数组'}
  },
  parameters: {
    docs: {
      description: {
        component: '返回数据为数组'
      }
    },
  }
} as Meta

export const Doc: Story<CascaderProps> = (args) => {
  return <Cascader {...args}/>
}

Doc.args = {
  options: options,
  onChange: (val: any) => console.log('val', val),
  defaultValue: defaultValue,
  disabled: false,
  single: false
}


export const Simple = () => {
  const defaultValue = ['sichuan', 'my', 'st']
  return <Wrapper>
    <Cascader options={options} defaultValue={defaultValue} onChange={(val: any) => console.log('val', val)}/>
  </Wrapper>
}

export const Single = () => {
  const defaultValue = 'my'
  return <Wrapper>
    <Cascader options={options} defaultValue={defaultValue} onChange={(val: any) => console.log('val', val)} single/>
  </Wrapper>
}


export const Disabled = () => {
  return <Wrapper>
    <Cascader options={data} onChange={(val: any) => console.log('val', val)} style={{width: 500}} disabled/>
  </Wrapper>
}

export const FiveLevel = () => {
  return <Wrapper>
    <Cascader options={data} onChange={(val: any) => console.log('val', val)} style={{width: 500}}/>
  </Wrapper>
}



