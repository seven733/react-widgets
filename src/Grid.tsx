import { HTMLAttributes } from 'react'
import { clearFix } from 'polished'
import styled from 'styled-components'

export const Row = styled.div<RowProps>`
  ${clearFix()}
  margin: ${props => props.margin ? props.margin : `20px 0`};
  ${props => props.justify && `
    display: flex;
    justify-content: ${props.justify};
  `}
`

export const Col = styled.div<ColProps>`
  float: left;
  min-height: 1px;
  width: ${props => props.span * 100 / 12}%;
  padding: 0 ${props => props.gutter === undefined ? 15 : props.gutter}px;

/* sm screen like iphone */
@media all and (max-width: 768px){
  ${props => props.sm && `
    width: ${props.sm * 100 / 12}%;
  `}
}

/* xs screen */
  @media all and (max-width: 576px){
    ${props => props.xs && `
      width: ${props.xs * 100 / 12}%;
    `}
  }

/* md screen like ipad */
   @media all and (min-width: 768px) and (max-width: 1280px){
    ${props => props.md && `
      width: ${props.md * 100 / 12}%;
    `}
  }

/* lg screen for most desktop */
   @media all and (min-width: 1280px ) and( max-width: 1920px){
    ${props => props.lg && `
      width: ${props.lg * 100 / 12}%;
    `}
  }

  /* xl sreen like customized display */
   @media all and (min-width: 1920px){
    ${props => props.xl && `
      width: ${props.xl * 100 / 12}%;
    `}
  }
`

// 12栅格系统
interface ColProps extends HTMLAttributes<HTMLDivElement> {
  gutter?: number
  span: number // 一般情况所占栅格(一般情况往往表示屏幕大小为md和lg的情况)
  xs?: number // 超小屏幕所占栅格
  sm?: number // 手机屏幕所占栅格
  md?: number // 中型屏幕所占栅格
  lg?: number // 大型屏幕所在栅格
  xl?: number // 超大屏幕所占栅格
}

interface RowProps {
  justify?: 'end' | 'center' | 'space-between' | 'space-around'
  margin?: string
}
