jest.mock('../src/Popup', () => (props) => {
    return <div visible={props.visible.toString()} confirmed={props.confirmed.toString()} onClick={props.onClose} >mock{props.children}</div>
})

import React from 'react'
import {act, cleanup, fireEvent, render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {ThemeProvider} from 'styled-components'
import 'jest-styled-components'
import {PickerWrapper, Columns } from '../stories/Picker.stories'
import { theme } from '../src/utils/config'

// TODO: Mock Popup组件并触发onClose事件
it('能够触发onClose事件', () => {
    const handleClose = jest.fn()        

    const {container, debug, getByText} = render(<ThemeProvider theme={theme}><Columns onClose={handleClose} /></ThemeProvider>)

    act(() => {
        jest.runOnlyPendingTimers
        fireEvent.click(getByText('mock'))
    })
    expect(handleClose).toBeCalled()
})