import styled, {css} from 'styled-components'
import {ELEMENTS_CLASSNAME} from '../common'

export default styled.div.attrs({className: ELEMENTS_CLASSNAME.container})<{ className?:string, readonly?: boolean }>`
  width: 12.5em;
  height: 1em;
  position: relative;
  
  &:hover{
    ${props => !props.readonly ? containerHoverStyle : null};
  }
`

const containerHoverStyle = css`
  .${ELEMENTS_CLASSNAME.range} {
    background-color: ${props => props.theme.colors.info};
  }  
  
  .${ELEMENTS_CLASSNAME.handle} {
    border-color: ${props => props.theme.colors.info};
  }  
`