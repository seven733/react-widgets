import styled from 'styled-components'
import {absoluteCenterStyle} from '../style'
import {ELEMENTS_CLASSNAME} from '../common'

export default styled.div.attrs({  className: ELEMENTS_CLASSNAME.track})`
  ${absoluteCenterStyle};
  height: .5em;
  width: 100%;
  border-radius: 0.25em;
  background-color: ${props => props.theme.colors.icon};
`