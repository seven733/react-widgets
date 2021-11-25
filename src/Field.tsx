import React, { useMemo, HtmlHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'
import * as R from 'ramda'

const Container = styled.div<DirectionProps>`
  width: 100%;
  font-size: 0.875rem;
  display: grid;
  align-items: center;
  ${ props => props.horizontal && css`
    grid-template-columns: 6em auto;
    grid-column-gap: 1em;
  `};
  ${ props => !props.horizontal && css`
    grid-template-columns: 100%;
  `};
`

const Label = styled.label<{horizontal: boolean }>`
  display: block;
  ${ props => props.horizontal && css`
    min-width: 6em;
    text-align: right;
    padding-bottom: 1.5em;
  `}
`

const ErrorMsg = styled.div`
  display: block;
  height: 1.5em;
`

export const Field = ({ label, required, children, validation, horizontal=false, ...other }: FieldProps) => {
  const hasError = useMemo(() => {
    if (!validation) {
      return false
    }
    return validation instanceof Array ? R.any(R.propEq('hasError', true))(validation) : validation.hasError
  }, [validation])

  const errorMessage = useMemo(() => {
    if (!validation) {
      return ''
    }
    if (validation instanceof Array) {
      const firstError = validation.find(o => o.hasError)
      return firstError ? firstError.message : ''
    }
    return validation.message
  }, [validation])

  return (
    <Container horizontal={horizontal} {...other}>
      {
        label !== ''
        ? <Label horizontal={horizontal}>
            { required ? <span style={{ color: 'red' }}>*</span> : null } {label}
          </Label>
        : null
      }
      <div>
        { children }
        <ErrorMsg style={{ color: 'red' }}>{ hasError ? errorMessage : '' }</ErrorMsg>
      </div>
    </Container>
  )
}

export interface FieldProps extends HtmlHTMLAttributes<HTMLDivElement> {
  label: string
  required ?: boolean
  children: React.ReactChild
  validation?: ValidationProps | ValidationProps[]
  horizontal?: boolean // default false
}

interface DirectionProps {
  horizontal?: boolean // default false
}
