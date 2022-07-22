import React from 'react'
import { Currency } from '../src'

export const StyledCurrency = () => (
  <Currency style={{fontSize: '1.6rem', color: 'red'}}>{1500}</Currency>
)

export default { title: 'Currency', component: Currency }
