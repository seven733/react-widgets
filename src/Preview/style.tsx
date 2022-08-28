import React from 'react'
import styled, { css } from 'styled-components'
import { em, rem, ellipsis, rgba } from 'polished'

import Mask from '../Mask'

export const bgColor = '#000000'
export const color = '#ffffff'
const closeSize = 80
const baseSize = 16
const smallGap = 2
const largeGap = 10
const imgWidth = 30
const imgHeight = 50
const toolHeight = 20
const carouselItemWidth = 100 / 3

export const absoluteCSS = css`
  position: absolute;
  z-index: 200;
`

export const centerCSS = css`
  display: flex;
  align-items: center;
  justify-content: center;
`

const hoverCSS = css`
  opacity: 0.6;
  transition: opacity 0.15s;

  &:hover {
    opacity: 1;
  }
`

const circleCSS = (size: number) => css`
  ${hoverCSS};
  width: ${em(size, baseSize)};
  height: ${em(size, baseSize)};
  border-radius: 50%;
  cursor: pointer;
  background-color: ${bgColor};
`

const svgCSS = (size: number) => css`
  width: ${em(size, baseSize)};
  height: ${em(size, baseSize)};
  font-size: ${em(size, baseSize)};
  fill: ${color};
`

const itemCSS = css`
  display: inline-block;
  margin: 0 ${smallGap}px;
  overflow: hidden;
`

const sizeCSS = (size = baseSize) => css`
  font-size: ${rem(size, 16)};
`

export const PreviewCSS = styled(Mask)<React.ComponentProps<typeof Mask>>`
  background-color: transparent;
  padding: 0;
  font-size: 0;
  line-height: 0;
`

export const PreviewCloseCSS = styled.div`
  ${absoluteCSS};
  ${centerCSS};
  ${sizeCSS()};
  ${circleCSS(closeSize)};
  top: -${em(closeSize / 2, baseSize)};
  right: -${em(closeSize / 2, baseSize)};
  
  svg {
    ${svgCSS(20)};
    transform: translate(-${rem(15, baseSize)}, ${rem(15, baseSize)});
  }
`

export const PreviewContentCSS = styled.div`
  ${absoluteCSS};
  left: 0; right: 0; top: 0; bottom: 0;
  z-index: 100;
  overflow: hidden;
  background-color: ${rgba(bgColor, 0.4)};

  img {
    ${absoluteCSS};
    cursor: grab;
  }
`

export const PreviewFooterCSS = styled.div`
  ${absoluteCSS};
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
`

export const PreviewFooterContentCSS = styled.div`
  width: 100%;
  padding: ${smallGap}px ${largeGap}px;
  box-sizing: border-box;
  overflow: hidden;
`

export const PreviewTitleCSS = styled.div`
  ${hoverCSS};
  ${ellipsis('100%')}
  color: ${color};
  font-size: 12px;
  line-height: ${toolHeight}px;
`

export const PreviewToolbarItemCSS = styled.div<{ isPrevNextBtn?: boolean }>`
  font-size: 16px;

  ${props => props.isPrevNextBtn ? css`
    ${absoluteCSS};
    ${centerCSS};
    ${circleCSS(50)};
    margin-top: -${em(25, 16)};
    top: 50%;

    svg {
      transform: scale(1.5);
    }
  ` : css`
    ${itemCSS};
    ${circleCSS(toolHeight)};

    svg {
      margin-top: 3px;
    }
  `}
`

export const PreviewNavbarCSS = styled(PreviewFooterContentCSS)`
  background-color: ${rgba(bgColor, 0.6)};
  text-align: left;
`

export const PreviewNavbarsCSS = styled.div`
  display: inline-block;
  white-space: nowrap;
  transition: all 0.15s;
  margin-left: 0;
`

export const PreviewNavbarItemCSS = styled.div<{ active?: boolean }>`
  ${hoverCSS};
  ${itemCSS};
  cursor: pointer;
  opacity: ${props => props.active ? 1 : ''};

  img {
    width: ${imgWidth}px;
    height: ${imgHeight}px;
    object-fit: cover;
    object-position: center center;
  }
`

export const PreviewWrapperImageCSS = styled.div`
  width: 300%;
  height: 100%;

  div {
    display: inline-block;
    width: ${carouselItemWidth}%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
`

export const config = { imgWidth, imgHeight, smallGap, largeGap, toolHeight, carouselItemWidth }