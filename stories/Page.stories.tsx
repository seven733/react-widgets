import React from 'react'
import styled from 'styled-components'
import { Page } from '../src'

const StyledPage = styled(Page)`
  background: cyan;
`

export const Cover = () => (
  <StyledPage><h1>标题</h1></StyledPage>
)

export default { title: 'Page', component: Page }
