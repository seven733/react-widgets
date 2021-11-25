import styled, { css } from 'styled-components'

const Addon = styled.span<{ head?: boolean, tail?: boolean }>`
  position: relative;
  display: table-cell;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 0 0.8em;
  border-radius: 2px;
  width: 1px;
  ${props => props.head && css`
    border-right: 1px solid ${props.theme.colors.border};
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  `};
  ${props => props.tail && css`
    border-left: 1px solid ${props.theme.colors.border};
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  `};
`


export default Addon