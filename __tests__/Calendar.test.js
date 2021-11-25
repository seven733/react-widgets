import React from 'react'
import moment from 'moment'
import {fireEvent, render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import 'jest-styled-components'
import Calendar from '../src/Calendar'
import {Demo, CurrentMonth} from '../stories/Calendar.stories'
import { ThemeProvider } from 'styled-components'
import { theme } from '../src/utils/config'
import {lighten} from "polished";

describe('日历组件', () => {
    it('正确渲染了2020年5月份的日历', () => {
        const { getByText, getAllByText } = render(<ThemeProvider theme={theme}><Demo /></ThemeProvider>)
        expect(getByText('2020年05月')).toBeInTheDocument()
        expect(getAllByText('01').length).toBeGreaterThan(0)
        expect(getAllByText('31').length).toBeGreaterThan(0)

        // 2020年5月1号是周五，也就是在第6的位置进行渲染
        expect(getAllByText(/^\d\d$/)[5]).toHaveTextContent('01')
    })

    it('今天、活跃日期、范围标记日期都会有特别的样式', () => {
        const {getByText} = render(<ThemeProvider theme={theme}><CurrentMonth /></ThemeProvider>)

        expect(getByText('20')).toHaveClass('today')

        expect(getByText('15')).toHaveClass('active')

        expect(getByText('21')).toHaveClass('active')

        expect(getByText('22').parentElement).not.toHaveClass('today')
        expect(getByText('22').parentElement).not.toHaveClass('active')

        expect(getByText('11').parentElement).toHaveStyleRule('background', `${lighten(0.5, theme.colors.primary)} !important`)

        expect(getByText('07').parentElement).not.toHaveStyleRule('background', theme.colors.background)
    })

    it('能够渲染自定义header', () => {
        let header = <h2>test</h2>
        const {container} = render(<ThemeProvider theme={theme}><Calendar header={header}></Calendar></ThemeProvider>)
        expect(container).toContainHTML('<h2>test</h2>')
    })

    it('点击日期事件', () => {
        const handleClickDate = jest.fn()

        const {getByText} = render(
        <ThemeProvider theme={theme}>
            <Calendar month={new Date('2020-05-20').getTime()} onClickDate={handleClickDate} />
        </ThemeProvider>)
        fireEvent.click(getByText('22'))
        expect(handleClickDate).toBeCalledWith(moment('2020-05-22').valueOf())
    })
})