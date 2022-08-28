import React from "react"
import Switch, {SwitchProps} from "../src/Switch"


export default {
  title: 'Switch',
  component: Switch,
}

export const Doc = (args: SwitchProps) => {
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
