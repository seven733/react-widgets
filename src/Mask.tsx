import { cover, transparentize } from 'polished'
import styled from 'styled-components'

const Mask = styled.div<MaskProps>`
  ${props => !props.minmal && cover()}
  ${props => !props.minmal && 'position: fixed;'}
  background: ${transparentize(0.4, '#000')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.875em 1.25em;
  z-index: 999;
`

interface MaskProps {
  minmal?: boolean
}

export default Mask
