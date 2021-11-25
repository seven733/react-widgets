import React from "react"
import Switch, {SwitchProps} from "../src/Switch"
import {Story, Meta} from '@storybook/react/types-6-0'


export default {
  title: 'Switch',
  component: Switch,
  argTypes: {
    onChange: {description: '组件状态发生改变时的回调'},
    onClick: {description: '点击时的回调'},
    height: {description: '改变按钮的大小'},
  },
  // parameters: {
  //   docs: {
  //     description: {
  //       component: 'some component _markdown_'
  //     }
  //   },
  // }
} as Meta

export const Doc: Story<SwitchProps> = (args) => {
  return <Switch {...args} />
}

export const SwitchSample = () => {
  const handleChange = (checked: boolean) => {
    console.log(`switch to ${checked}`)
  }
  const handleDisabled = (checked: boolean) => {
    console.log(`it's ${checked} and disabled`)
  }
  return (
    <>
      <h2>default</h2>
      <Switch onChange={handleChange} checked/>
      <Switch checked style={{marginLeft: '20px'}} color={'red'}/>

      <h2>自定义大小</h2>
      <Switch height={'1.2em'} style={{marginRight: '20px'}}/>
      <Switch style={{marginRight: '20px'}}/>
      <Switch height={'2em'}/>

      <h2>with label</h2>
      <Switch showLabels/>

      <h2>disabled</h2>
      <Switch disabled onClick={handleDisabled} style={{marginRight: '20px'}}/>
      <Switch disabled onClick={handleDisabled} checked/>
    </>)
}
