import React from 'react'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {ThemeProvider} from 'styled-components'
import { SimpleTabs, TagTabs, BottomTabBar } from '../stories/Tabs.stories'
import { theme } from '../src/utils/config'

afterEach(cleanup)

const primaryColor = 'rgb(41, 197, 136);'

describe('Tabs组件', () => {
  it('正确渲染简单Tabs组件', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <SimpleTabs />
      </ThemeProvider>
    )
    expect(getByText("待处理").parentElement).toHaveStyle({
      color: primaryColor
    })
    expect(getByText("Content_1")).toBeInTheDocument()
  })

  it('可以设置默认tab', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <TagTabs />
      </ThemeProvider>
    )
    expect(getByText("已接单").parentElement).toHaveStyle({
      color: primaryColor
    })
  })

  it('作为底部菜单，可以获取要跳转的url', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <BottomTabBar />
      </ThemeProvider>
    )
    fireEvent.click(getByText('已接单'))
    expect(getByText('path: ordered')).toBeInTheDocument()
  })

})
