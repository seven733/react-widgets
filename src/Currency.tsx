import React, { HtmlHTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledVar = styled.var`
  line-height: 1em;
  display:inline;
  font-weight: 600;

  .symbol {
    font-size: 1.17em;
    margin-right: 0.2em;
    font-weight:600;
  }

  .number {
    font-size: 1.3em;
  }
`

export interface CurrencyProps extends HtmlHTMLAttributes<HTMLSpanElement> {
  /** 货币值 */
  num: number
}

/**
 * 数字以人民币形式展示
 * */
export default function Currency(props: CurrencyProps) {
  const { num, ...rest } = props
  const list = num.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split('.')
  return (
    <StyledVar {...rest}>
      <span className="symbol">¥</span><span className="number">{list[0]}.{list[1]}</span>
    </StyledVar>
  )
}
