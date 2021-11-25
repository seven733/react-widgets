import React from 'react'
import { ErrorPage } from '../src'
import {Meta} from '@storybook/react/types-6-0'

export default { title: 'ErrorPage',component:ErrorPage } as Meta

export function Demo() {
  return <ErrorPage type='500'></ErrorPage>
}
