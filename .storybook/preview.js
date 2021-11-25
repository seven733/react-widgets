import React from 'react'
import Book from '../src/Page'
import {addDecorator} from '@storybook/react'

addDecorator(storyFn => (<Book>{storyFn()}</Book>))