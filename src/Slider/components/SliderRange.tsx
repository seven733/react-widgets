import styled from 'styled-components'
import {absoluteCenterStyle} from '../style'
import {ELEMENTS_CLASSNAME} from '../common'

export interface SliderRangeProps {
  start: number // 偏移量百分比 [0,1)
  end: number // 偏移量百分比 [0,1)
  readonly?: boolean
}

export default styled.div.attrs<SliderRangeProps>(({end, start}) => ({
  className: ELEMENTS_CLASSNAME.range,
  style: {
    width: `${((end - start) * 100).toFixed(2)}%`,
    marginRight: `${((1 - end) * 100).toFixed(2)}%`,
    marginLeft: `${(start * 100).toFixed(2)}%`,
  }
}))<SliderRangeProps>`
  ${absoluteCenterStyle};
  border-radius: 0.25em;
  height: .5em;
  background-color: ${props => props.readonly ? props.theme.colors.minor : props.theme.colors.infoLight}
`