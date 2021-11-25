import React from 'react'
import styled from 'styled-components'
import { FixedWidth, Th, Delete, DeleteBtn } from './common'

const Container = styled.table`
  position: absolute;
  top: 0;
  right: 0;
  width: ${FixedWidth}px;
  box-shadow: -2px 0px 2px rgba(0, 0, 0, 0.1);
`

interface FixedTableProps {
  data: UISchema[]
  onRemove: (index: number) => void
  disabled: boolean
}

export default ({data, onRemove, disabled}: FixedTableProps) => {
  return <Container>
      <thead>
        <tr>
          <Th width={FixedWidth}>操作</Th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.map((_, index) => <tr key={index}>
            <Delete>
              <DeleteBtn onClick={() => onRemove(index)} disabled={disabled} >
                删除
              </DeleteBtn>
            </Delete>
          </tr>)
        }
      </tbody>
  </Container>
}

