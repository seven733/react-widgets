import React from 'react'
import {cleanup, render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StyledCurrency } from '../stories/Currency.stories'

afterEach(cleanup)

describe('货币格式化组件', () => {
    it('正确渲染1500转化为人民币的表示形式', () => {
        const { getByText } = render(<StyledCurrency />);
        expect(getByText('¥')).toBeInTheDocument()
        expect(getByText('1,500')).toBeInTheDocument()
        expect(getByText('.00')).toBeInTheDocument()
    })
})