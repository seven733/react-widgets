import React from 'react'
import { render, screen, fireEvent, cleanup, act } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { CustomCover, CustomStyle } from '../stories/ImagePicker.stories'
import { ImagePicker } from '../src'
import { ThemeProvider } from 'styled-components'
import { theme } from '../src/utils/config'


afterEach(cleanup)

describe('图片选择器组件 Demo', () => {
  it('显示是否正常', () => {
    const handleChange = jest.fn()
    const { getByText, container } = render(
      <ThemeProvider theme={theme}>
        <ImagePicker onChange={handleChange} />
      </ThemeProvider>
    )
    expect(container.querySelector("input")).toBeInTheDocument()
    expect(getByText("上传图片")).toBeInTheDocument()
  })
})

describe('自定义样式', () => {
  it('样式是否正确', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <CustomStyle />
      </ThemeProvider>
    )

    expect(getByTestId('single')).toHaveStyle({ width: '200px', height: '200px' })
    expect(getByTestId('multiple')).toHaveStyle({ width: '300px', height: '300px' })
  })
})

describe('自定义封面 Cover', () => {
  it('显示是否正常', () => {
    const { container, getAllByText } = render(
      <ThemeProvider theme={theme}>
        <CustomCover />
      </ThemeProvider>
    )

    expect(container.querySelector("input")).toBeInTheDocument()
    expect(getAllByText("自定义").length).toBe(3)
  })
})