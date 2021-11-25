import React, { HtmlHTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledVar = styled.var`
  font-family:  
  -apple-system,   //针对 Web 页面
  BlinkMacSystemFont,  //针对 Mac Chrome 页面
  SFProDisplay-Regular, //针对微信小程序
  "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
  line-height: 1em;
  display:inline;
  font-weight:600;  
`

const Symb = styled.span`

  font-family:  
  -apple-system,   //针对 Web 页面
  BlinkMacSystemFont,  //针对 Mac Chrome 页面
  SFProDisplay-Regular, //针对微信小程序
  "PingFang SC","Helvetica Neue",STHeiti,"Microsoft Yahei",Tahoma,Simsun,sans-serif;
  font-size: 1.17em;
  margin-right: 0.2em;
  font-weight:600;
`

const Integer = styled.span`
  font-size: 1.3em;
  /* font-weight: bold; */
`

interface CurrencyProps extends HtmlHTMLAttributes<HTMLSpanElement> {
  /**
   * 货币值
   * */
  children: number
}

/**
 * 数字以人民币形式展示
 * */
export default function Currency(props: CurrencyProps) {
  const { children, ...rest } = props
  // const currency = children.toLocaleString('zh-CN',
  //   { currency: 'CNY', style: 'currency', minimumFractionDigits: 2 })
  //
  // const [, symbol, integer, point, decimal] = currency.split(/(^[^0-9]|\.)/)
  //
  // return (
  //   <StyledVar>
  //     <Symb>{symbol}</Symb><Integer>{integer}</Integer>{point}{decimal}
  //   </StyledVar>
  // )

  const list = children.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,').split('.')
  return (
    <StyledVar {...rest}>
      <Symb>¥</Symb><Integer>{list[0]}</Integer>.{list[1]}
    </StyledVar>
  )
}
