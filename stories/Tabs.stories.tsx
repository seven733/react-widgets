import React, {useState} from 'react'
import {TagTabs as TagTabsNickname, Tabs, BottomTabBar as BottomTabBarNickname} from '../src'
import { TabsProps } from '../src/Tabs'

const tabs = [{
  label: '待处理',
  path: 'pending'
}, {
  label: '已接单',
  active: true,
  path: 'ordered'
},{
  label: '已完成',
  path: 'finished'
}]
const tabsContent = ['Content_1', 'Content_2', 'Content_3']

export const SimpleTabsDemo = (args: TabsProps) => {
  const [index, setIndex] = useState(0)
  const handleChange = (idx: number) => {
    setIndex(idx)
  }

  return (
    <div style={{marginTop: '50px', background: 'white', padding: '24px', margin: '24px'}}>
      <Tabs tabs={tabs} onChange={handleChange} {...args}>
        <div style={{height: '200px', background: 'yellow'}}>
          {tabsContent[index]}
          <button style={{position: 'fixed', bottom: 0, left: 100}}>fixed按钮</button>
        </div>
      </Tabs>
    </div>
  )
}

const TagTabsDemo = () => {
  const [index, setIndex] = useState(1)
  const handleChange = (idx: number) => {
    setIndex(idx)
  }

  return (
    <TagTabsNickname tabs={tabs} onChange={handleChange}>
      <div>{tabsContent[index]}</div>
    </TagTabsNickname>
  )
}
export const TagTabs = () => <TagTabsDemo />

const BottomTabBarDemo = () => {
  const [path, setPath] = useState(tabs[0].path)
  const handleChange = (_idx: number, path: string) => {
    setPath(path)
  }

  return (
    <div>
      <div>
        path: {path}
      </div>
      <BottomTabBarNickname tabs={tabs} activeTab={0} onChange={handleChange} />
    </div>
  )
}
export const BottomTabBar = () => <BottomTabBarDemo />

export default {
  title: 'Tabs',
  component: Tabs,
  argTypes: {
    onChange: { action: true },
  },
  args: {
    underline: false,
    activeTab:0,
  }
}