import React, {useState} from "react"
import styled from "styled-components"
import {ReactComponent as Checked} from './assets/circle.svg'
import {ReactComponent as Unchecked} from './assets/vertical_line.svg'

const SwitchWrapper = styled.button<{ height: string, background: string }>`
  outline: none;
  height: ${props => props.height};
  width: calc(${props => props.height} * 2);
  border: none;
  background: #bfbfbf;
  border-radius: calc(${props => props.height} * 2);
  position: relative;

  > span {
    transition: all 0.2s;
    position: absolute;
    top: 2px;
    left: 2px;
    height: calc(${props => props.height} - 4px);
    width: calc(${props => props.height} - 4px);
    background: white;
    border-radius: calc(${props => props.height} / 2);

    > svg {
      fill: white;
      position: absolute;
      height: calc(${props => props.height} / 2);
      width: calc(${props => props.height} / 2);
      top: 25%;
      right: calc(100% - ${props => props.height} * 7 / 4);
    }

  }

  &.checked {
    background: ${props => props.background || props.theme.colors.primary};

    > span {
      left: calc(100% - calc(${props => props.height} - 4px) - 2px);

      > svg {
        left: calc(100% - ${props => props.height} * 7 / 4);
      }
    }
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:active {
    background: #bfbfbf;

    > span {
      width: ${props => props.height};
    }
  }

  &.checked:active {
    background: ${props => props.background || props.theme.colors.primary};

    > span {
      width: ${props => props.height};
      margin-left: -4px;
    }
  }
`

const Switch: React.FunctionComponent<SwitchProps> = (props) => {
  const {checked, onChange, disabled, className, style, onClick, color, showLabels, height} = props
  const [active, setActive] = useState(checked)
  const handleClick = (e: React.MouseEvent) => {
    onClick && onClick(active, e)
    if (!disabled) {
      setActive(!active)
      onChange && onChange(active, e)
    }
  }
  const classes = (...name: (string | undefined)[]) => {
    return name.filter(Boolean).join(' ')
  }
  return (
    <SwitchWrapper className={classes(active && 'checked', disabled && 'disabled', className)}
                   onClick={handleClick} height={height}
                   background={color} style={style}>
            <span>
                {showLabels && (active ? <Checked/> : <Unchecked/>)}
            </span>
    </SwitchWrapper>
  )
}
Switch.defaultProps = {
  height: '1.571em'
}
export default Switch

export interface SwitchProps {
  checked?: boolean, //指定当前是否选中
  onChange?: (checked: boolean, event?: React.MouseEvent) => void //变化时回调函数
  onClick?: (checked: boolean, event?: React.MouseEvent) => void //点击时回调函数
  style?: React.CSSProperties;
  disabled?: boolean,
  className?: string
  height?: string,
  color?: string,
  showLabels?: boolean
}