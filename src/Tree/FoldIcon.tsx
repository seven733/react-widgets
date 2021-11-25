import React, { useState } from 'react'
import styled from 'styled-components'

const FoldButton = styled.button`
  outline: none;
  padding: 0;
  background-color: white;
  width: 20px;
  height: 20px;
  background: white;
  color: #000000;
  border-radius: unset;
  margin-right: 24px;
`

export default ({ onToggle, show }: FoldIconProps) => (
  <div>
    <FoldButton onClick={() => onToggle(!show)}>
      { show ? '-' : '+' }
    </FoldButton>
  </div>
)

interface FoldIconProps {
  show: boolean
  onToggle: Function;
}
