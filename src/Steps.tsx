import React, {HTMLAttributes, ReactElement, useMemo} from 'react'
import styled, {css} from 'styled-components'
import {ReactComponent as Check} from './assets/check.svg'
import {transparentize} from 'polished'

const Container = styled.div<{ vertical: boolean }>`
  width: 100%;
  display: flex;
  > div {
    :not(:last-child) {
      width: 100%
    }
  }
  ${props => props.vertical && css`
    width: min-content;
    display: flex;
    flex-direction: column;

`}
`

const StepContainer = styled.div<{ vertical: boolean }>`
  white-space: nowrap;
 ${props => props.vertical && css`
    width: max-content;
    > div {
    :not(:last-child) {
      margin-bottom: 2em;
    }
  }
`} 
`

const Icon = styled.div<{ finished: boolean, progressing: boolean, canClick: boolean, vertical: boolean, customIcon: boolean }>`
  vertical-align: top;
  display: inline-block;
  width: 2.285em;
  height: 2.285em;
  line-height: 2.285em;
  border: ${props => `1px solid ${props.finished ? props.theme.colors.primary : transparentize(0.55, '#000')}`};
  ${props => props.progressing && css`
    border: none;
  `};
  ${props => props.canClick && css`
    cursor: pointer;
  `};
    ${props => props.vertical && css`
    margin-bottom: 2em;
  `};
  border-radius: 50%;
  background-color: ${props => props.progressing ? props.theme.colors.primary : 'transparent'};
  ${props=>props.customIcon && css`
  background-color: transparent;
  border: none;
`};
  text-align: center;
  margin-right: 8px;
  color: ${props => props.progressing ? props.theme.colors.white : transparentize(0.55, '#000')};
`

const StepContent = styled.div`
  vertical-align: top;
  display: inline-block;
`
const StepTitle = styled.div<{ finished: boolean, progressing: boolean, last: boolean, vertical: boolean }>`
  position: relative;
  display: inline-block;
  color: ${props => props.finished ? transparentize(0.35, '#000') : props.progressing ? transparentize(0.15, '#000') : transparentize(0.55, '#000')};
  font-weight: ${props => props.progressing ? 'bold' : 'normal'};
  font-size: 1rem;
  line-height: 2em;
  ${props => !props.last && !props.vertical && css`
    ::after {
      content: '';
      left: calc(100% + 8px);
      top: 1em;
      position: absolute;
      width: 1000em;
      background: ${props.finished ? props.theme.colors.primary : transparentize(0.55, '#000')};
      height: 1px;
    }
  `};
  ${props => !props.last && props.vertical && css`
    ::after {
      content: '';
      left: calc(-7px - 2.285em / 2);
      top: 2em;
      position: absolute;
      height: 1000em;
      background: ${props.finished ? props.theme.colors.primary : transparentize(0.55, '#000')};
      width: 1px;
    }
  `}
`

const Description = styled.div<{ progressing: boolean }>`
  white-space: normal;
  max-width: 11em;
  color: ${props => props.progressing ? transparentize(0.15, '#000') : transparentize(0.55, '#000')};
`

const Steps = (props: StepsProps) => {
    const {current = 0, children, onChange, vertical} = props

    return <Container vertical={vertical}>
        {
            children.map((child, index) => {
                return React.cloneElement(child as React.ReactElement, {
                    key: index,
                    current,
                    index,
                    total: children.length,
                    onChange,
                    vertical
                })
            })
        }
    </Container>
}

export const Step = (props: StepProps) => {
    const {current = 0, index = 0, total = 0, title, description, onChange, vertical, icon} = props
    const finished = useMemo(() => index < current, [index, current])
    const progressing = useMemo(() => index === current, [index, current])

    return <StepContainer vertical>
        <div style={{overflow: 'hidden', marginLeft: '8px'}}>
            <Icon
                vertical={vertical}
                finished={finished}
                progressing={progressing}
                canClick={!!onChange}
                onClick={() => onChange && onChange(index)}
                customIcon={Boolean(icon)}
            >
                {
                    !icon ? finished ? <Check fill="#29c588"/> : index + 1 :
                        icon
                }
            </Icon>
            <StepContent>
                <StepTitle finished={finished} progressing={progressing} last={index === total - 1} vertical={vertical}>
                    {title}
                </StepTitle>
                <Description progressing={progressing}>
                    {description}
                </Description>
            </StepContent>
        </div>
    </StepContainer>
}


export default Steps

interface StepsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    current?: number
    children: React.ReactNode[]
    onChange?: (index: number) => void
    vertical?: boolean
}

interface StepProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    current?: number
    index?: number
    total?: number
    title: string
    description?: string
    onChange?: (index: number) => void
    vertical?: boolean
    icon?: ReactElement
}
