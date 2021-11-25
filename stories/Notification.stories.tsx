import { withKnobs } from '@storybook/addon-knobs'
import React from 'react'
import styled from 'styled-components'
import { notification, customNotice, Notice } from '../src'

export const ContentNotification = () => {
  const handleClick1 = () => {
    notification({ title: '成功',type: 'success', children: <p>成功变小</p> })
  }
  const handleClick2 = () => {
    notification({ title: '警告', content: () => <p>确定要变小？</p>, type: 'warning' })
  }
  const handleClick3 = () => {
    notification({ title: '错误', content: () => <p>无法变小</p>, type: 'error' })
  }
  const handleClick4 = () => {
    notification({ title: '成功', type: 'success', duration: 5 })
  }

  return (
    <div>
      <button onClick={handleClick1}>success</button>
      <button onClick={handleClick2}>warning</button>
      <button onClick={handleClick3}>error</button>
      <button onClick={handleClick4}>normal</button>
    </div>
  )
}

const StyledNotice = styled(Notice)`
  background-color: rgba(242, 252, 250, 1);
  border: 1px solid rgba(148, 232, 211, 1);
  &>div {
    &>h2 {
      margin: 0;
      padding: 0;
      font-size: 0.875rem;
      font-weight: normal;
    }
  }
`

export const CustomNotification = () => {
  const handleClick = () => {
    customNotice({ title: '成功',type: 'success', StyledNotice: StyledNotice  })
  }

  return (
    <div>
      <button onClick={handleClick}>success</button>
    </div>
  )
}

export default { title: 'Notification', decorators: [withKnobs] }