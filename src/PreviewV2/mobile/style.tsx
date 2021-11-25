import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import { bgColor, color, centerCSS, absoluteCSS, PreviewCSS as Preview } from '../style'

export const PreviewCSS = styled(Preview)`
  font-size: 1rem;
`

const PreviewSvgCSS = styled.div`
  font-size: 1.3em;

  svg {
    width: 1.2088em;
    height: 1.2088em;
    font-size: 1.4em;
    fill: ${color};
    cursor: pointer;
  }
`

export const PreviewHeaderCSS = styled(PreviewSvgCSS)`
  ${centerCSS};
  ${absoluteCSS};
  left: 0; right: 0; top: 0;
  height: 3.5385em;
  padding: 0 3.5385em;
  color: ${color};

  svg {
    ${absoluteCSS};
    top: 0.65934em;
    right: 0.65934em;
  }
`

export const PreviewPrevNextCSS = styled(PreviewSvgCSS)<{ isPrev?: boolean }>`
  ${centerCSS};
  ${absoluteCSS};
  top: 50%;
  width: 3.5385em;
  height: 3.5385em;
  cursor: pointer;
  transform: translateY(-50%);
  background-color: ${rgba(bgColor, 0.2)};

  ${props => props.isPrev ? css`
    left: 0;
    border-radius: 0 0.76923em 0.76923em 0;
  ` : css`
    right: 0;
    border-radius: 0.76923em 0 0 0.76923em;
  `}

  svg {
    width: auto;
    height: auto;
    transform: scale(1.5);
  }
`