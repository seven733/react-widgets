import React, {useState} from 'react'
import {Meta} from '@storybook/react'
import {BasicPicker, DatePickerForPhone as DatePicker, TimePickerForPhone as TimePicker} from '../../src'
import {districtOptions} from '../fakeData/districts.json'
import {PickerItem} from '../../src/mobile/Picker/Picker'

export default {
  title: 'mobile/picker'
} as Meta

interface Item extends PickerItem<Item> {
  // 自定义属性
}

export const Basic = () => {
  const [v1, setV1] = useState(false)
  const [v2, setV2] = useState(false)
  const [v3, setV3] = useState(false)
  const [v4, setV4] = useState(false)
  const data1: Item[][] = [
    [{value: '选项1'}, {value: '选项2'}, {value: '选项3'}, {value: '选项4'}, {value: '选项5'}, {value: '选项6'},
      {value: '选项7'}, {value: '选项8'}, {value: '选项9'}, {value: '选项10'}, {value: '选项11'}],
    [
      {value: '父选项1', children: [{value: '子选项11'}, {value: '子选项12'}]},
      {value: '父选项2', children: [{value: '子选项21'}, {value: '子选项22'}]},
    ]
  ]
  const data2: Item[][] = [
    [
      {value: '父选项1', children: [{value: '子选项11'}, {value: '子选项12'}]},
      {value: '父选项2', children: []},
    ],
    [],
    [{value: '选项1'}, {value: '选项2'}, {value: '选项3'}]
  ]
  const data3: Item[][] = [
    [
      {
        value: '父选项1',
        children: [{value: '子选项11', children: [{value: '子选项111'}]}, {value: '子选项12', children: [{value: '子选项122'}]}]
      },
      {
        value: '父选项2',
        children: [{value: '子选项21', children: [{value: '子选项211'}]}, {value: '子选项22', children: [{value: '子选项222'}]}]
      },
    ]
  ]
  const data4: Item[][] = [
    [
      {
        value: '父选项1',
        children: [{value: '子选项11', children: [{value: '子选项111'}]}, {value: '子选项12', children: [{value: '子选项122'}]}]
      },
      {
        value: '父选项2',
        children: [{value: '子选项21', children: [{value: '子选项211'}]}, {value: '子选项22', children: [{value: '子选项222'}]}]
      },
    ],
    [],
    [],
    [{value:'选项1'},{value:'选项2'}]
  ]

  const onConfirm = (items: Item[]) => {
    console.log('confirm', items)
    setV1(false)
    setV2(false)
    setV3(false)
    setV4(false)
  }

  const onClose = () => {
    console.log('close')
    setV1(false)
    setV2(false)
    setV3(false)
    setV4(false)
  }

  return <>
    <button onClick={() => setV1(true)}>点击弹出-后两列数据关联</button>
    <br/>
    <button onClick={() => setV2(true)}>点击弹出-前两列数据关联</button>
    <br/>
    <button onClick={() => setV3(true)}>点击弹出-全数据关联</button>
    <br/>
    <button onClick={() => setV4(true)}>点击弹出-4列</button>
    <br/>
    <BasicPicker visible={v1} title={'后两列数据关联'} data={data1} columns={3} onConfirm={onConfirm} onClose={onClose}/>
    <BasicPicker visible={v2} title={'前两列数据关联'} data={data2} columns={3} onConfirm={onConfirm} onClose={onClose}/>
    <BasicPicker visible={v3} title={'全数据关联'} data={data3} columns={3} onConfirm={onConfirm} onClose={onClose}/>
    <BasicPicker visible={v4} title={'4列'} data={data4} columns={4} onConfirm={onConfirm} onClose={onClose}/>
  </>
}

export const Date = () => {
  const [v, setV] = useState(true)
  return <>
    <button onClick={() => {
      setV(true)
    }}>点击唤醒
    </button>
    <DatePicker visible={v} onConfirm={(y, m, d) => {
      console.log(`year: ${y} month: ${m} day: ${d}`)
      setV(false)
    }} onClose={() => {
      console.log('close')
      setV(false)
    }}/>
  </>
}

export const Time = () => {
  const [v, setV] = useState(true)
  return <>
    <button onClick={() => setV(true)}>点击唤醒</button>
    <TimePicker visible={v} onConfirm={(h, m, s) => {
      console.log(`hour: ${h} minute: ${m} second: ${s}`)
      setV(false)
    }} onClose={() => setV(false)}/>
  </>
}


interface DistrictItem extends PickerItem<DistrictItem> {
  identity: string
}

export const Districts = () => {
  const [v, setV] = useState(true)
  const data = [districtOptions]
  const handleConfirm = (items: DistrictItem[]) => {
    const province = items[0]
    const city = items[1]
    const district = items[2]
    console.log(`省 name:${province.value} id:${province.identity}, 
    市 name:${city.value} id:${city.identity},
    区 name:${district && district.value} id:${district && district.identity}`)
    setV(false)
  }
  return <>
    <button onClick={() => setV(true)}>点击弹出</button>
    <BasicPicker title={'选择地址'} visible={v} data={data} columns={3} onConfirm={handleConfirm}
                 onClose={() => setV(false)}/>
  </>
}