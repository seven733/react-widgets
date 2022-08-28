// 使用Intersection Observer API 来判断是否到底部并触发加载函数
import React, { useRef, useEffect, useState } from 'react'
import styled, { css } from 'styled-components'
import { lighten } from 'polished'
import { Loading } from './Toast'

// 一般情况下该元素隐藏，loading状态或者没有更多数据时显示
const Wrapper = styled.div<{ visible: boolean }>`
  color: ${lighten(0.8, '#000')};
  text-align: center;
  padding: 2em 0;
  ${props => !props.visible && css`
    visibility: hidden;
  `}
`

 const LoadMore = (props: LoadMoreProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const { noMoreText, onFetchMore, count, total, haveMore = true } = props
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // 创建intersection observer
    let observer = new IntersectionObserver(handleIntersectionChange)
    let node = ref.current!

    // 使用observer观察ref
    observer.observe(node)

    return () => {
      observer.unobserve(node)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, total, onFetchMore])

  useEffect(() => {
    const fetch = async () => {
      try {
        await onFetchMore()
        setLoading(false)
      } catch (err) {
        // handle error
      }
    }

    loading && fetch()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  // observer会对内部数据snapshot进行immutable 处理，callback只能进行恒定的action
  const handleIntersectionChange: IntersectionObserverCallback = async (entries) => {
    const [entry] = entries

    // entry显示并当还有为获取的list时触发fetch
    if (entry.isIntersecting && (haveMore || count < total)) {
      setLoading(true)
    }
  }

  return (
    <Wrapper ref={ref} visible={loading || (total > 0 && count === total)}>
      {loading ? <Loading /> : (noMoreText || '没有更多了')}
    </Wrapper>
  )
}

interface LoadMoreProps {
  /** 后端查询到的记录总条数 */
  total: number
  /** 前端页面目前渲染的记录总条数 */
  count: number
  /** 是否还未加载完数据 */
  haveMore?: boolean
  /** 没有更多的文案 */
  noMoreText?: string
  /** 当滑动到底部需要请求更多数据的请求 */
  onFetchMore(): Promise<void>
}

export default LoadMore
