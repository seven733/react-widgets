import React from 'react'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {ThemeProvider} from 'styled-components'
import { FieldsFormDemo } from '../stories/Label.stories'
import { theme } from '../src/utils/config'
import {Label} from "../src";

afterEach(cleanup)

describe('Label组件', () => {
  it('正确渲染Label内容', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <FieldsFormDemo />
      </ThemeProvider>
    )
    expect(getByText("姓名")).toBeInTheDocument()
    expect(getByText("讲方言")).toBeInTheDocument()
  })

  it('正确响应点击事件', () => {
    let flag = false
    const handleJump = () => {
      flag = true
    }
    const { container } = render(
      <ThemeProvider theme={theme}>
        <Label field='处方' output to={handleJump}></Label>
      </ThemeProvider>
    )
    fireEvent.click(container.firstChild)
    expect(flag).toBeTruthy()
  })
})
