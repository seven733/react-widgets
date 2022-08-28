import styled, { css } from 'styled-components'

export const FillThWidth = 6
export const ColDefaultWidth = 100

export const getHeight = (data: any[], y: number, lineHeight: number): number => {
  const realHeight = data.length * lineHeight
  return realHeight > y ? y : realHeight
}

//判断设置的y轴高度是否大于实际的高度
export const yHeightIsGtRealHeight = (data: any[], scroll: Scroll | undefined, lineHeight: number): boolean => {
  if (!scroll || !scroll.y) {
    return true
  }
  const realHeight = data.length * lineHeight
  return scroll.y > realHeight
}

export const Container = styled.div<{scroll: Scroll}>`
  width: ${ props => props.scroll && props.scroll.x ? `${props.scroll.x}px` : '100%' };
  overflow-x: hidden;
  position: relative;
`

export const Content = styled.div<{scroll?: Scroll, data: any[], lineHeight: number}>`
  overflow-x: scroll;
  overflow-y: ${ props => yHeightIsGtRealHeight(props.data, props.scroll, props.lineHeight) ? 'hidden' : 'auto' };
  ${ props => props.scroll && props.scroll.y && css`
    height: ${getHeight(props.data, props.scroll.y, props.lineHeight)}px;
  `};

  /* 滚动槽 */
  ::-webkit-scrollbar {
    width: ${FillThWidth}px;
    height: ${FillThWidth}px;
  }
  ::-webkit-scrollbar-track {
    border-radius: 0.3em;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 0.3em;
    background: #ddd;
  }
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`

export const Tr = styled.tr<{ lineHeight?: number, active?: boolean, isHover?: boolean}>`
  width: 100%;
  height: ${ props => props.lineHeight ? `${props.lineHeight}px` : '3.75em' };
  ${props => props.active && css`
    background-color: rgba(41, 197, 136, .06);
  `}
  ${props => props.isHover && css`
    background-color: rgba(41, 197, 136, .06);
  `}
`

export const Th = styled.th<{ width?: number, textAlign?: string }>`
  ${ props => props.width && css`
    width: ${props.width}px;
  `}

  ${ props => props.textAlign && css`
    text-align: ${props.textAlign};
  `}
`

export const Td = styled.td<{ width?: number, textAlign?: string }>`
  ${ props => props.width && css`
    width: ${props.width}px;
  `}

  ${ props => props.textAlign && css`
    text-align: ${props.textAlign};
  `}
`

export enum Align {
  Left = 'left',
  Right = 'right',
}