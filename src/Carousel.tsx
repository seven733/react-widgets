import * as React from 'react'
import {
  HtmlHTMLAttributes, ReactNodeArray, useState, useRef, useEffect, TouchEventHandler, MouseEvent
} from 'react'
import { transparentize } from 'polished'
import styled, { css } from 'styled-components'
import anime from 'animejs'
import { ANIME } from './utils/config'

export interface CarouselProps extends Omit<HtmlHTMLAttributes<HTMLDivElement>, 'onChange'> {
  children: ReactNodeArray // children组件
  autoplay?: boolean // 是否自动播放
  interval?: number // 播放间隔
  showButton?: boolean // 是否显示左右按钮
  onChange?: (index: number) => void
  dots?: boolean // 是否显示底部的点， 默认显示（true）
}

const Wrapper = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
  touch-action: none;
  >button {
    position: absolute;
    height: 2em;
    width: 3em; // scaleX预留长一点
    transform: scaleX(0.6);
    background: ${transparentize(0.75, '#000')};
    top: calc(50% - 1em);
  }
`

const ChildrenWrapper = styled.div`
  position: relative;
  width: 300%;
  display: flex;
  align-items: stretch;
`

const ChildWrapper = styled.div`
  position: relative;
  min-height: 8em;
  width: ${100 / 3}%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const DotWrapper = styled.div`
  position: absolute;
  bottom: 0.5em;
  display: inline-block;
  width: 100%;
  text-align: center;
  pointer-events: none;
`

const Dot = styled.div<{ active: boolean }>`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #fff;
  margin: 0 4px;
  display: inline-block;
  ${props => !props.active && css`
    opacity: 0.5;
  `}
`

const Previous = styled.button`
  left: 0;
`

const Next = styled.button`
  right: 0;
`

// TODO：目前未适配PC端，需要进行desktop适配
export default function Carousel(props: CarouselProps) {
  const { children, className, autoplay = true, interval = 3000, showButton, onChange, dots=true, ...others } = props
  const ref = useRef<HTMLDivElement>(null)
  const timer = useRef<number | null>(null)
  const [offset, setOffset] = useState(0) // offset 记录了位置应该在原始位置的基础上平移多少
  const [index, setIndex] = useState(0)
  const [x, setX] = useState(0)
  const [speed, setSpeed] = useState(0)
  const [touching, setTouching] = useState(false)
  const [time, setTime] = useState(Date.now())
  const [backward, setBackward] = useState(false)

  useEffect(() => {
    const animation = anime({
      targets: ref.current?.querySelector('div'),
      translateX: -ref.current?.clientWidth,
      autoplay: false
    })

    // 首次渲染直接定位到需要显示的位置
    animation.seek(animation.duration)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // index改变时，根据offset设置伪偏移值，从伪偏移值过渡为正常显示区
  useEffect(() => {

    // TODO: 区分向前还是向后移动
    const wrapperWidth = ref.current?.clientWidth

    anime({
      targets: ref.current?.querySelector('div'),
      translateX: backward ? [-2 * wrapperWidth - offset, -wrapperWidth] : [-offset, -wrapperWidth],
      easing: ANIME.spring.noWobble,
      complete: () => {
        setOffset(0)
        setBackward(false)
      }
    })

    autoplay && startAutoplayTask()

    return () => stopAutoplayTask()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index])

  // 控制touch过程中的响应未造成index值变化的恢复
  useEffect(() => {
    if (offset === 0) return
    const wrapperWidth = ref.current?.clientWidth
    if (touching) {
      const animation = anime({
        targets: ref.current?.querySelector('div'),
        translateX: offset - wrapperWidth,
        autoplay: false
      })
      animation.seek(animation.duration)
    } else if (offset > - wrapperWidth / 2 && offset < wrapperWidth / 2) {
      anime({
        targets: ref.current?.querySelector('div'),
        translateX: -wrapperWidth,
        easing: ANIME.spring.noWobble,
        complete: () => setOffset(0)
      })
    }

  }, [offset, touching])

  useEffect(() => { touching ? stopAutoplayTask() : startAutoplayTask() }, [touching])

  const startAutoplayTask = () => {
    stopAutoplayTask()

    // @ts-ignore
    timer.current = setTimeout(
      () => setIndex(
        prev => {
          const i = prev === children.length - 1 ? 0 : prev + 1
          onChange && onChange(i)
          return i
        }
      ),
      interval
    )
  }

  const stopAutoplayTask = () => {
    if (timer.current) {
      clearTimeout(timer.current)
      timer.current = null
    }
  }

  const handleTouchStart: TouchEventHandler = (e) => {
    e.preventDefault()
    if (children.length === 0) return

    setTouching(true)
    setX(e.changedTouches[0].pageX)
    setSpeed(0)
  }

  const handleTouchMove: TouchEventHandler = (e) => {
    e.preventDefault()

    if (children.length === 0) return

    const diff = e.changedTouches[0].pageX - x
    setOffset(offset + diff)
    setSpeed(diff / (Date.now() - time))
    setTime(Date.now())
    setX(e.changedTouches[0].pageX)
  }

  // 此时计算目标窗口，每次目标窗口变更都将计算伪偏移值
  const handleTouchEnd: TouchEventHandler = () => {
    setTouching(false)
    if (children.length === 0) return
    let targetX = offset + speed * speed * speed * 100
    setOffset(targetX)

    const wrapperWidth = ref.current?.clientWidth!

    // 将当前窗口移后一定阈值，表示用户想看下一屏
    if (targetX < - wrapperWidth / 2) {
      const i = index === children.length - 1 ? 0 : index + 1
      setIndex(i)
      onChange && onChange(i)
    }
    if (targetX > wrapperWidth / 2) {
      const i = index === 0 ? children.length - 1 : index - 1
      setIndex(i)
      onChange && onChange(i)
    }
  }

  const handlePrevious = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const i = index === 0 ? children.length - 1 : index - 1
    setIndex(i)
    setBackward(true)
    onChange && onChange(i)
  }

  const handleNext = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const i = index === children.length - 1 ? 0 : index + 1
    setIndex(i)
    onChange && onChange(i)
  }

  return (
    <Wrapper ref={ref}
      onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
      <ChildrenWrapper >
        <ChildWrapper className={className} {...others}>
          {index === 0 ? children[children.length - 1] : children[0]}
        </ChildWrapper>
        <ChildWrapper className={className} {...others}>
          {children[index]}
        </ChildWrapper>
        <ChildWrapper className={className} {...others}>
          {index === children.length - 1 ? children[0] : children[index + 1]}
        </ChildWrapper>
      </ChildrenWrapper>
      {/* 渲染dot */}
      {
        dots && <DotWrapper>{children.map((_, i) => <Dot active={index === i} key={i} />)}</DotWrapper>
      }
      {/* 去掉ActionWrap防止图片点击等事件被挡 */}
      {showButton && <Previous onClick={handlePrevious}>&lt;</Previous>}
      {showButton && <Next onClick={handleNext}>&gt;</Next>}
    </Wrapper>
  )
}
