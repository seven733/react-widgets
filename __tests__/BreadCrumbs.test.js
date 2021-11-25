import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { Demo } from '../stories/BreadCrumbs.stories'

describe('面包屑组件', () => {
    it('onChange事件正确触发', () => {
        const handleChange = jest.fn()
        

        const {getByText} = render(<Demo {...Demo.args} onChange={handleChange} />)

        fireEvent.click(getByText(/首页/))
        expect(handleChange).toBeCalledWith('/')
    
        fireEvent.click(getByText(/审核/))
        expect(handleChange).toBeCalledWith('/audit')
  })
})