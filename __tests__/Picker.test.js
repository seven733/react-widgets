import React from 'react'
import {act, cleanup, fireEvent, render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {ThemeProvider} from 'styled-components'
import 'jest-styled-components'
import {PickerWrapper, Columns } from '../stories/Picker.stories'
import { theme } from '../src/utils/config'

describe('Picker组件', () => {
    beforeEach(() => {
        jest.useFakeTimers()
    })

    afterEach(() => {
        jest.runOnlyPendingTimers()
        jest.useRealTimers()
        cleanup()
    })

    it('渲染一列选择框', () => {
        const {getByText, getAllByText} = render(<ThemeProvider theme={theme}><PickerWrapper /></ThemeProvider>)
        expect(getByText('一')).toBeInTheDocument()
        expect(getByText('二')).toBeInTheDocument()
        expect(getByText('十')).toBeInTheDocument()
        expect(getAllByText('一').length).toBe(1)
    })

    it('能够渲染多列数据', async () => {
        const { container} = render(<ThemeProvider theme={theme}><Columns /></ThemeProvider>)
        act(() => {
            jest.runOnlyPendingTimers()
        })
        expect(container).toContainElement(screen.getByText('1'))
        expect(container).toContainElement(screen.getByText('19'))
        expect(container).toContainElement(screen.getByText('2'))
        expect(container).toContainHTML('19</div>')
        expect(container).not.toContainHTML('21</div>')

        // 选择了第一列的值，第二列显示第一列值对应的子元素
        fireEvent.click(screen.getByText('2'))
        act(() => {
            jest.runOnlyPendingTimers()
        })
        try {
            await waitForElementToBeRemoved(screen.getByText('19'))
            expect(container).toContainElement(screen.getByText('21'))
        } catch (err) {
            // handle error
        }
    })

    it('能够触发onConfirm事件', () => {
        const handleConfirm = jest.fn()
        const { getByText } = render(<ThemeProvider theme={theme}><Columns onConfirm={handleConfirm} /></ThemeProvider>)
        act(() => {
            fireEvent.click(getByText('确定'))
            jest.runOnlyPendingTimers()
        })
        expect(handleConfirm).toBeCalledTimes(1)
        expect(handleConfirm).toBeCalledWith([0, 0])
    })
})