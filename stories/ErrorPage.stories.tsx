import React from 'react'
import { ErrorPage } from '../src'
import { ErrorPageProps } from '../src/ErrorPage'

export function Demo(args: ErrorPageProps) {
  return <ErrorPage {...args}></ErrorPage>
}

export default {
  title: 'ErrorPage',
  component: ErrorPage,
  args: {
    type: '404',
    desc: '404 error description'
  }
}