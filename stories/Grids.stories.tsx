import React from 'react'
import styled from 'styled-components'
import { Col, Row } from '../src'

const StyledCol = styled(Col)`
  background: red;
  div {
    background: green;
  }
`

export const Columns = () => (
  <>
    <Row>
      <StyledCol span={4} sm={12} xl={2}><div>col-4</div></StyledCol>
      <StyledCol span={4} sm={12} xl={2}><div>col-4</div></StyledCol>
      <StyledCol span={4} sm={12} xl={2}><div>col-4</div></StyledCol>
    </Row>
    <Row justify='space-between'>
      <StyledCol span={3} sm={12} xl={2}><div>col-4</div></StyledCol>
      <StyledCol span={3} sm={12} xl={2}><div>col-4</div></StyledCol>
      <StyledCol span={3} sm={12} xl={2}><div>col-4</div></StyledCol>
    </Row>
  </>
)

export default { title: 'Col', component: Col }

