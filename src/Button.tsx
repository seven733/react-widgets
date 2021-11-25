import styled, { css } from 'styled-components'
import { theme } from './utils/config'

enum TYPES {
  PRIMARY = 'primary',
  DANGER = 'danger',
  DEFAULT = 'default',
  GHOST = 'ghost',
  GHOST_DANGER = 'ghostDanger',
  GHOST_DEFAULT = 'ghostDefault',
}

const Primary = [TYPES.PRIMARY, TYPES.DANGER, TYPES.DEFAULT] as any
const Ghost = [TYPES.GHOST, TYPES.GHOST_DANGER, TYPES.GHOST_DEFAULT] as any

const TYPE_LIST: { [key in TYPES]: { bgColor?: string, color: string } } = {
  [TYPES.PRIMARY]: { bgColor: theme.colors.primary, color: theme.colors.white },
  [TYPES.DANGER]: { bgColor: theme.colors.danger, color: theme.colors.white },
  [TYPES.DEFAULT]: { bgColor: theme.colors.shadow, color: theme.colors.minor },
  [TYPES.GHOST]: { bgColor: theme.colors.primary, color: theme.colors.primary },
  [TYPES.GHOST_DANGER]: { bgColor: theme.colors.danger, color: theme.colors.danger },
  [TYPES.GHOST_DEFAULT]: { bgColor: theme.colors.shadow, color: theme.colors.minor },
}

const Button = styled.button<ButtonProps>`
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  outline: none;
  width: ${props => props.width ? props.width : props.block ? '100%' : ''};
  height: ${props => props.height ? props.height : ''};
  border-radius: ${props => !props.semicircle ? '2px' : !props.height ? '1.15em' //Button默认高度2.3em
    : `${parseFloat(props.height) / 2}${props.height.replace(/[0-9\.]/g, '')}`};
  padding: ${props => props.noBorder ? '0' : '5px 1.143em'};
  min-height: 10px;
  min-width: 10px;
  &:hover {
    opacity: 0.8;
  }

  ${props => !props.types && css`
    border: none;
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    &:active {
      opacity: 0.6;
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
    };
    &:disabled {
      opacity: 0.6;
      background: ${theme.colors.primary};
      color: ${theme.colors.white};
    };
  `}
  ${props => Primary.includes(props.types) && css`
  border: none;
  background: ${TYPE_LIST[props.types].bgColor};
  color: ${TYPE_LIST[props.types].color};
  &:active {
    opacity: 0.6;
    background: ${TYPE_LIST[props.types].bgColor};
    color: ${TYPE_LIST[props.types].color};
  };
  &:disabled {
    opacity: 0.6;
    background: ${TYPE_LIST[props.types].bgColor};
    color: ${TYPE_LIST[props.types].color};
  };
  `}
  ${props => Ghost.includes(props.types) && css`
  border: ${props.noBorder ? 'none' : `1px ${props.dashed ? 'dashed' : 'solid'} ${TYPE_LIST[props.types].bgColor}`};
  background: none;
  color: ${TYPE_LIST[props.types].color};
  &:active {
    background: none;
    opacity: 0.4;
  };
  &:disabled {
    opacity: 0.6;
  };
  `}
`

type types = 'primary' | 'danger' | 'default' | 'ghost' | 'ghostDanger' | 'ghostDefault'

interface ButtonProps {
  width?: string
  height?: string
  disabled?: boolean
  block?: boolean //按钮是否适应其父元素宽度
  semicircle?: boolean //border-radius是否为Button高度的一半(半圆Button)
  dashed?: boolean //边框是否是虚线
  noBorder?: boolean //是否有边框
  types?: types //按钮类型
}

export default Button