import React from 'react'
import { Currency } from '../src'
import { CurrencyProps } from '../src/Currency'

export const StyledCurrency = (args: CurrencyProps) => (
  <Currency style={{fontSize: '1.6rem', color: 'red'}} num={args.num} />
)

export default {
  title: 'Currency',
  component: Currency,
  args:  {
    num: 100
  }
}
