import React, { HtmlHTMLAttributes } from 'react'
import styled, { css } from 'styled-components'

const Text = styled.span<{ last: boolean }>`
  ${props => props.last && css`
    font-size: 1.2rem;
  `}
  cursor: pointer;
`

function BreadCrumbs(props: BreadCrumbsProps) {
  const { data, onChange, ...rest } = props

  const handleClick = (index: number) => {
    onChange(data[index].path)
  }

  return (
    <div {...rest}>
      {data.map((item, index) => (
        <Text key={item.label} last={index === data.length - 1} onClick={() => handleClick(index)}>
          {`${item.label} ${(index === data.length - 1) ? '' : '/'} `}
        </Text>
      ))}
    </div>
  )
}

export default BreadCrumbs

interface BreadCrumbsProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  /**
   * 页面路径数据构成的数组
   */
  data: { label: string, path: string }[]
  /**
   * 点击某一集路径触发的事件
   */
  onChange: (path: string) => void
}
