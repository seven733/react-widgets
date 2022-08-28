import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

/*
* skeleton用于在加载时显示内容骨架
* 默认情况下根据高度渲染16px高度的横向条幅，行高1.5，并有动画效果，条幅的长度随机
* 可传入children对骨架layout进行自定义，对于设置了class为skeleton的组件，会覆盖有动画效果
* 用户还可使用styled-components或者className对Skeleton样式进行覆盖
*/

const loading = keyframes`
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0px 50%;
  }
`

const Wrapper = styled.div`
  position: relative;
  min-height: 100px;
  /* 给skeleton设置公共样式和动效 */
  .skeleton {
    background: linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 37%,#f2f2f2 63%);
    background-size: 400% 100%;
    animation: ${loading} 1.4s ease infinite;
  }
`

const Placeholder = styled.div`
  min-height: 16px;
  margin: 8px;
  position: relative;
`

export default (props: HtmlHTMLAttributes<HTMLDivElement>) => {
  const { children, ...others } = props
  const container = useRef<HTMLDivElement>(null)
  const [widths, setWidths] = useState<number[]>([])

  useEffect(() => {
    // 通过container的高度计算需要渲染多少个条幅
    const count = Math.floor((container.current?.clientHeight || 100) / 24)
    let widths = new Array(count)
    widths.fill(1)
    widths = widths.map(() => (100 - Math.random() * 80))
    setWidths(widths)
  }, [])

  return (
    <Wrapper ref={container} {...others}>
      {
        // 如果设置了children，则渲染对应的样式，注意如果需要组件中的元素具有骨架样式，需要设置class为skeleton
        children || widths
          .map((p, i) => <Placeholder key={p + i} className='skeleton' style={{ width: widths[i] + '%' }} />)}
    </Wrapper>
  )
}



