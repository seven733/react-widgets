import React from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import {Cascader} from '../src'
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

export const Simple = (args: CascaderProps) => {
  const defaultValue = ['sichuan', 'my', 'st']
  return <Wrapper>
    <Cascader {...args} options={options} defaultValue={defaultValue} />
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



export default {
  title: 'Cascader',
  component: Cascader,
  args: {
    disabled: false,
    single: false
  },
  argTypes: {
    onChange: { type: {required: true}, control: false },
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
      },
      control: false
    },
  },
  parameters: {
    docs: {
      description: {
        component: `<div>
          <p>级联组件</p>
        </div>`
      }
    },
  }
}
