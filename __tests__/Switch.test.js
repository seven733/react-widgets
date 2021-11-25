import React from 'react'
import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Switch from "../src/Switch";
import {theme} from "../src/utils/config";
import {ThemeProvider} from "styled-components";

describe('开关组件', () => {
    it('渲染正常', () => {
        const {container} = render(<ThemeProvider theme={theme}><Switch/></ThemeProvider>)
        expect(container.querySelector("button>span")).toBeInTheDocument()
    })
    it('点击时触发onChange和onClick正常', () => {
        const handleChange = jest.fn()
        const handleClick = jest.fn()
        const {container} = render(<ThemeProvider theme={theme}><Switch onClick={handleClick} onChange={handleChange}/></ThemeProvider>)
        fireEvent.click(container.querySelector("button>span"))
        fireEvent.click(container.querySelector("button"))
        expect(handleChange).toHaveBeenCalledTimes(2)
        expect(handleClick).toHaveBeenCalledTimes(2)
    })
})
