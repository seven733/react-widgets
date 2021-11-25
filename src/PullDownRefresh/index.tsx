import React, { HtmlHTMLAttributes, useRef, useEffect, useState, useImperativeHandle } from 'react'
import styled from 'styled-components'
// @ts-ignore
import IScroll from './iscroll-custom'

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100vw
`
const Scroll = styled.div`
  position: relative;
  min-height: 100vh;
`
const Loading = styled.div`
  height: 30px;
  position: absolute;
  top: -30px;
  text-align: center;
  width: 100%;
  font-size: 12px;
  color: #666;
`

interface PullDownHandle {
  /**
   * 告诉iScroll Dom发生了变化，需要重新计算。
   * */
  refresh: () => void
}

export interface PullDownRefreshProps extends HtmlHTMLAttributes<HTMLDivElement> {
  /**
   * 必选, 刷新回调函数
   * */
  onRefresh(): Promise<void>
  /**
   * 刷新距离
   * */
  distanceToRefresh?: number
}

/**
 * <h4>借助IScroll实现的下拉刷新功能</h4>
 * 当页面内容发生变化时需要手动刷新：调用ref.current.refresh()
 * */
const PullDownRefresh = React.forwardRef<PullDownHandle, PullDownRefreshProps>(({
  onRefresh,
  distanceToRefresh=30,
  children
}: PullDownRefreshProps, ref) => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const loadingRef = useRef<HTMLDivElement>(null)
  const [myScroll, setMyScroll] = useState<any>(null)

  useEffect(() => {
    setTimeout(() => {
      setMyScroll(new IScroll(wrapperRef.current, { mouseWheel: true, probeType: 2, scrollY: true, tap: true }))
    }, 500)
  }, [])

  useEffect(() => {
    if (!myScroll) return
    let needRefresh = false

    myScroll.on('scrollEnd', async function () {
      if (needRefresh) {
        if (onRefresh) {
          try {
            await onRefresh()
            myScroll.refresh()
          } catch (err) {
            // handle error
          }
        }
      }
    })
    myScroll.on('scroll', function (_x: number, y: number) {
      if (y > distanceToRefresh) {
        loadingRef.current.innerText = '松开立即刷新'
        needRefresh = true
      } else {
        loadingRef.current.innerText = '下拉可以刷新'
        needRefresh = false
      }
    })
  }, [myScroll])

  useImperativeHandle(ref, () => ({
    refresh: () => {
      setTimeout(() => {
        myScroll && myScroll.refresh()
      }, 100)
    }
  }))

  return (
    <Wrapper ref={wrapperRef}>
      <Scroll>
        <Loading ref={loadingRef}></Loading>
        {children}
      </Scroll>
    </Wrapper>
  )
})

export default PullDownRefresh
