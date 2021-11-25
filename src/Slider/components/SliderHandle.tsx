import styled from 'styled-components'
import React from 'react'
import {ELEMENTS_CLASSNAME, RangSliderProps, SingleSliderProps} from '../common'
import {Tooltip} from '../../index'

const StyledHandle = styled.div.attrs<{ position: number }>(({position}) => ({
  style: {
    left: `calc(${(position * 100).toFixed(2)}% - .5em - 1px)`
  }
}))<{ position: number, readonly?: boolean }>`
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  height: 1em;
  width: 1em;
  border-radius: .5em;
  border: 2px solid ${props => props.readonly ? props.theme.colors.minor : props.theme.colors.infoLight};
  background-color: ${props => props.theme.colors.background};
`

const SliderHandle: React.FC<(RangSliderProps | SingleSliderProps) & { position: number, value: number }> = (props) => {
  const {position, disableTip, customTip, value} = props
  const plainHandle = <StyledHandle className={ELEMENTS_CLASSNAME.handle} position={position}
                                    readonly={props.readonly}/>
  if (disableTip) {
    return plainHandle
  } else if (customTip) {
    return props.customTip(value, plainHandle)
  }
  return <Tooltip title={value}>
    {plainHandle}
  </Tooltip>
}

export default SliderHandle