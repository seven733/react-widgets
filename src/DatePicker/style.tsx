import styled, { css } from 'styled-components'
import Calendar from '../Calendar'
export { ReactComponent as IconCalendar } from '../assets/calendar.svg'
export { ReactComponent as DoubleArrow } from '../assets/doubleright.svg'
export { ReactComponent as Arrow } from '../assets/right.svg'

export const Wrapper = styled.div<{ focus?: boolean, disabled?: boolean }>`
  position: relative;
  display: inline-block;
  overflow: visible;
  border: 1px solid ${({ theme }) => theme.colors.border};
  :hover, :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    ${props => props.disabled && css`
      border: 1px solid ${({ theme }) => theme.colors.border};
    `}
  }
  ${({ focus, theme }) => focus && css`
    border: 1px solid ${theme.colors.primary};
  `}
  >svg {
    position: absolute;
    right: 0.6em;
    top: 0.6em;
    opacity: 0.25;
  }
  input {
    position: relative;
    border: none;
    width: 100%;
    :hover, :focus {
      border: none;
    }
    :disabled {
      :hover {
        border: none;
      }
    }
  }
`

export const CalendarWrapper = styled.div<{ focus: boolean }>`
  position: absolute;
  /* 在focus状态下显示时间选择器 */
  display: ${({ focus }) => focus ? 'flex' : 'none'};
  z-index: 999;
  margin-top: 4px;
`

export const StyledCalendar = styled(Calendar)`
  margin: 0;
`