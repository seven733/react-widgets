import{ HtmlHTMLAttributes } from 'react'
import { lighten, transparentize } from 'polished'
import { animated } from 'react-spring'
import styled, { css } from 'styled-components'
import { ReactComponent as Clear } from '../assets/closeFill.svg'
import { ReactComponent as Down } from '../assets/down.svg'

interface InputProps extends HtmlHTMLAttributes<HTMLInputElement> {
  bordered: boolean
  disabled: boolean
}


export const Container = styled.div<InputProps>`
  position: relative;
  display: table;
  width: 100%;
  padding: 0;
  border: 1px solid ${({ theme }) => theme.colors.border};
  ${props => !props.bordered && css`
    border: none;
    background-color: transparent;
    :hover, :focus {
      border: none;
    }
  `};
  :hover, :focus {
    ${props => props.bordered && css`
      border: 1px solid ${({ theme }) => theme.colors.primary};
    `}
    ${props => props.disabled && css`
      border: 1px solid ${({ theme }) => theme.colors.border};
    `}
  }
`

export const ClearIcon = styled(Clear)`
  font-size: 0.875rem;
  fill: #00000066;
  display: inline-block;
  vertical-align: middle;
  width: 0.7em;
  height: 0.7em;
  cursor: pointer;
  :hover {
    fill: #000000A6;
  }
`

export const DownIcon = styled(Down)`
  font-size: 0.875rem;
  color: #000000A6;
  display: inline-block;
  line-height: 2em;
  vertical-align: middle;
  width: 0.75em;
  height: 0.375em;
`

export const MtSelect = styled.div<InputProps>`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  min-height: 2.285em;
  line-height: 2.285em;
  box-sizing: border-box;
  color: ${lighten(0.4, '#000')};
  cursor: pointer;
  padding: 0 0.8em;
  margin: 0;
  :hover, :focus {
    border: none;
    outline: none;
  }
  ${props => props.disabled && css`
      background: ${transparentize(0.96, '#000')};
      cursor: not-allowed;
  `}
  ${props => !props.bordered && css`
    border: none;
    background-color: transparent;
    padding-right: 0.7em;
    padding-left: 0;
    :hover, :focus {
      border: none;
    }
  `};
`

export const Input = styled.input`
  padding-left: 0;
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  :hover, :focus {
    border: none;
  }
`

export const SelectContainer = styled(animated.ul)`
  margin: 0;
  position: absolute;
  top: calc(100% + 0.15em);
  right: 0;
  left: 0;
  min-width: 5em;
  overflow-x: hidden;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: .3em .3em .5em ${props => props.theme.colors.shadow},
              -.2em .3em .5em ${props => props.theme.colors.shadow},
              0 -.1em .5em ${props => props.theme.colors.shadow};
  border-radius: 0.2em;
  z-index: 998;
`

export const Options = styled.div<{ visible: boolean }>`
  width: 100%;
  max-height: 12.5em;
  overflow-y: auto;
  display: ${({ visible }) => visible ? 'block' : 'none'};

  /* 滚动槽 */
  ::-webkit-scrollbar {
    width: .4rem;
  }
  ::-webkit-scrollbar-track {
    border-radius: 0.3rem;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 0.3rem;
    background: #00000026;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`

export const SelectIcon = styled.div<{ bordered: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 1em;
  ${props => !props.bordered && css`
    right: 0;
  `}
  display: flex;
  align-items: center;
`

export const ExtraOption = styled.div`
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.857em 8px;
`

export const NoData = styled.div`
  text-align: center;
  width: 100%;
  min-width: 5em;
  height: 5em;
  svg {
    width: 4.375em;
    height: 5em;
  }
`