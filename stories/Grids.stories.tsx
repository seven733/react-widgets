// import * as R from 'ramda'
import React from 'react'
import styled from 'styled-components'
import { Col, Row } from '../src'

const StyledCol = styled(Col)`
  div {
    background: #E6E9F2;
    height: 24px;
  }
`

export const Columns = () => (
  <>
    {/* <Row gutter={24} style={{ margin: '20px 0 '}}>
      { R.range(0, 24).map((item) => <StyledCol span={1} key={item}><div></div></StyledCol>) }
    </Row> */}

    {/* <Row gutter={24} style={{ margin: '20px 0 '}}>
      { R.range(0, 12).map(() => <StyledCol span={2}><div></div></StyledCol>) }
    </Row> */}

    {/* <Row gutter={24} style={{ margin: '20px 0 '}}>
      { R.range(0, 8).map(() => <StyledCol span={3}><div></div></StyledCol>) }
    </Row> */}
{/* 
    <Row gutter={24} style={{ margin: '20px 0 '}}>
      { R.range(0, 6).map((item) => <StyledCol span={4}  key={item}><div></div></StyledCol>) }
    </Row> */}
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

export default { title: 'Grid Layout', component: Col }
