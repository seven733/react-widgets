import React, { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled, { css, CSSObject } from 'styled-components'
import { darken } from 'polished'

import { theme } from './utils/config'

// =================================== 样式组件 ================================>

const bgColorCfg = theme.colors.strong

const tooltipPaddingCfg: { [k in TPlacement]: string }  = {
  top: '0 0 10px 0',
  bottom: '10px 0 0 0',
  left: '0 10px 0 0',
  right: '0 0 0 10px'
}

const arrowCssCfg: { [k in TPlacement]: React.CSSProperties } = {
  top: {
    left: '50%',
    marginLeft: -5,
    bottom: 0,
    borderTopColor: bgColorCfg
  },
  bottom: {
    left: '50%',
    marginLeft: -5,
    top: 0,
    borderBottomColor: bgColorCfg
  },
  left: {
    top: '50%',
    marginTop: -5,
    right: 0,
    borderLeftColor: bgColorCfg
  },
  right: {
    top: '50%',
    marginTop: -5,
    left: 0,
    borderRightColor: bgColorCfg
  }
}

const TooltipCSS = styled.div<{ placement: TPlacement }>`
  position: absolute;
  z-index: 999;
  font-size: 12px;
  line-height: 1.5;
  padding: ${props => tooltipPaddingCfg[props.placement]};
`

const TooltipContentCSS = styled.div`
  padding: 8px 10px;
  text-align: left;
  text-decoration: none;
  border-radius: 4px;
  min-height: 34px;
  box-sizing: border-box;
  color: #fff;
  box-shadow: 0 1px 5px ${darken(0.2, bgColorCfg)};
  background-color: ${bgColorCfg};
`

const ArrowCSS = styled.div<{ placement: TPlacement }>`
  position: absolute;
  width: 0;
  height: 0;
  z-index: 999;
  border: 5px solid transparent;
  ${props => css`${arrowCssCfg[props.placement] as CSSObject}`}
`

// <=================================== 样式组件 ================================

// =================================== Tooltip ================================>

// 获取偏移量
const getPosition = (offsetParent: HTMLElement, overlay: HTMLElement, trigger: HTMLElement, placement: TPlacement) => {
  const pRect = offsetParent.getBoundingClientRect()
  const oRect = overlay.getBoundingClientRect()
  const tRect = trigger.getBoundingClientRect()

  const oTop = tRect.top - pRect.top + offsetParent.scrollTop
  const oLeft = tRect.left - pRect.left + offsetParent.scrollLeft
  const tomWidth = (tRect.width - oRect.width) / 2
  const tomHeight = (tRect.height - oRect.height) / 2
  let left, top

  if (placement === 'top') {
    top = oTop - oRect.height
    left = oLeft + tomWidth
  } else if (placement === 'bottom') {
    top = oTop + tRect.height
    left = oLeft + tomWidth
  } else if (placement === 'left') {
    top = oTop + tomHeight
    left = oLeft - oRect.width
  } else if (placement === 'right') {
    top = oTop + tomHeight
    left = oLeft + tRect.width
  }

  return { left: isNaN(+left) ? 0 : left, top: isNaN(+top) ? 0 : top }
}

// 延迟执行
const delayExecute = (callback: Function, delay = 0): null | Function => {
  if (!delay) {
    callback()
    return null
  }

  let timer: null | number = setTimeout(() => (callback(), timer = null), delay * 1000)
  return () => {
    clearTimeout(timer)
    timer = null
  }
}

// 监听目标元素尺寸变化
const observerResize = (target: HTMLElement, callback: Function): null | Function => {
  const ResizeObserver = window.ResizeObserver
  if (!ResizeObserver) { return null } 

  const observer = new ResizeObserver(() => callback())
  observer.observe(target)
  return () => observer.disconnect()
}

// 监听目标元素视口变换
const observerIntersection = (target: HTMLElement, callback: Function): null | Function => {
  const IntersectionObserver = window.IntersectionObserver
  if (!IntersectionObserver) { return null }

  const observer = new IntersectionObserver((entries) => {
    const entry = (entries || [])[0]
    entry && callback(entry.isIntersecting)
  }, { threshold: 0.5, root: target.offsetParent || null })
  observer.observe(target)
  return () => observer.disconnect()
}

// 观察元素
const ObserverDOM: React.ForwardRefExoticComponent<IObserverDOM & React.RefAttributes<any>> = forwardRef(
  (props, ref) => {
    const observerRef = useRef(null)
    const { children, onResize, onIntersection } = props

    useImperativeHandle(ref, () => observerRef.current)
  
    useEffect(
      () => {
        const elem = observerRef.current
        if (!elem) { return }

        // 观测elem size
        const resizeCallback = onResize ? observerResize(elem, onResize) : null
        // 观测视口变化
        const intersectionCallback = onIntersection ? observerIntersection(elem, onIntersection) : null

        return () => {
          resizeCallback && resizeCallback()
          intersectionCallback && intersectionCallback()
        }
      },
      [onResize, onIntersection]
    )
  
    return React.cloneElement(children, { ref: observerRef })
  }
)

// 弹出容器
const Overlay: React.ForwardRefExoticComponent<IOverlayProps & React.RefAttributes<any>> = forwardRef(
  (props, ref) => {
    const overlayRef = useRef(null)
    const { getContainer, placement, children, getTrigger, setDirection, ...rest } = props
    const [style, setStyle] = useState({ position: 'absolute', left: 0, top: 0, opacity: 0, transition: 'opacity 0.3s' })
    const container = useMemo(getContainer, [getContainer])

    useImperativeHandle(ref, () => ({ adjustPosition }))
  
    // 调整位置
    const adjustPosition = () => {
      const overlay = overlayRef.current
      const trigger = getTrigger()
      if (!overlay || !trigger || !container) { return }
  
      const { left, top } = getPosition(container, overlay, trigger, placement)
      setStyle(
        prev => (prev.left === left && prev.top === top) ? prev : ({ ...prev, left, top, opacity: 1 })
      )
    }
  
    useEffect(
      () => {
        adjustPosition()
      },
      [placement]
    )

    return (
      !container
      ? null
      : ReactDOM.createPortal(
        <ObserverDOM ref={overlayRef} onResize={adjustPosition} onIntersection={setDirection}>
          {React.cloneElement(
            children,
            { ...rest, style: { ...children.props.style, ...style } }
          )}
        </ObserverDOM>,
        container
      )
    )
  }
)

const OverlayTrigger: React.FunctionComponent<IOverlayTriggerProps> = (props) => {
  const triggerRef = useRef(null)
  const overlayRef = useRef(null)
  const cancelExecute = useRef(null)
  const { children, trigger, overlayChildren, visible, onVisibleChange, ...rest } = props
  const [status, setStatus] = useState(!!visible)

  useEffect(() => { setStatus(visible) }, [visible])

  const updateVisible = (element: React.ReactElement, type: string, visible: boolean, delay = 0, ...args: any[]) => {
    cancelExecute.current && cancelExecute.current()
    cancelExecute.current = delayExecute(
      () => {
        // fire event
        const callback = element.props[type]
        callback && callback(...args)

        setStatus(visible)
        onVisibleChange && onVisibleChange(visible)
      },
      delay
    )
  }

  const getTriggerProps = (element: React.ReactElement) => {
    const nprops: any = {}

    if (trigger === 'click') {
      nprops.onClick = (event: any) => updateVisible(element, 'onClick', !status, 0, event)
    } else if (trigger === 'hover') {
      nprops.onMouseEnter = (event: any) => updateVisible(element, 'onMouseEnter', true, 0.1, event)
      nprops.onMouseLeave = (event: any) => updateVisible(element, 'onMouseLeave', false, 0.1, event)
    }

    return nprops
  }

  return (
    <>
      <ObserverDOM
        ref={triggerRef}
        onResize={() => overlayRef?.current?.adjustPosition()}
      >
        {React.cloneElement(children, { ...getTriggerProps(children) })}
      </ObserverDOM>
      {
        !status
        ? null
        : (
          <Overlay
            ref={overlayRef}
            {...rest}
            getTrigger={() => triggerRef.current}
          >
            {React.cloneElement(
              overlayChildren,
              { ...(trigger === 'hover' ? getTriggerProps(overlayChildren) : {}) }
            )}
          </Overlay>
        )
      }
    </>
  )
}

const Tooltip: React.FunctionComponent<ITooltipProps> = (props) => {
  const { title, children, placement, autoAdjustOverflow, ...rest } = props
  const [nplacement, setPlacement] = useState(placement)
  const [prevPlacement, setPrevPlacement] = useState(placement)

  const setDirection = !autoAdjustOverflow ? undefined : ((status: boolean) => {
    if (status) {
      setPrevPlacement(nplacement)
    } else {
      const mapping: { [k in TPlacement]: TPlacement } = { left: 'right', right: 'left', top: 'bottom', bottom: 'top' }
      const direction = mapping[nplacement as TPlacement] || nplacement
      direction !== prevPlacement && setPlacement(direction)
    }
  })

  return (
    <OverlayTrigger
      {...rest}
      setDirection={setDirection}
      placement={nplacement}
      overlayChildren={(
        <TooltipCSS placement={nplacement}>
          <TooltipContentCSS className="tooltip-content">
            {title}
          </TooltipContentCSS>
          <ArrowCSS className="tooltip-arrow" placement={nplacement} />
        </TooltipCSS>
      )}
    >
      {children}
    </OverlayTrigger>
  )
}

Tooltip.displayName = 'Tooltip'

Tooltip.defaultProps = {
  placement: 'top',
  trigger: 'hover',
  autoAdjustOverflow: true,
  getContainer: () => document.body
}

export default Tooltip

// <=================================== Tooltip ================================

// =================================== 类型声明 ================================>

type TPlacement = 'top' | 'right' | 'bottom' | 'left'

type TTrigger = 'hover' | 'click'

interface IObserverDOM {
  children: React.ReactElement
  onResize?: () => void
  onIntersection?: (isIntersecting: boolean) => void
}

interface IOverlayProp {
  children: React.ReactElement
  placement?: TPlacement
  getContainer?: () => HTMLElement
  setDirection?: (isIntersecting: boolean) => void
}

interface IOverlayProps extends IOverlayProp {
  getTrigger: () => HTMLElement
}

interface IOverlayTriggerProps extends IOverlayProp {
  visible?: boolean
  trigger?: TTrigger
  overlayChildren: React.ReactElement
  onVisibleChange?: (visible: boolean) => void
}

interface ITooltipProps extends Omit<IOverlayTriggerProps, 'setDirection' | 'overlayChildren'> {
  title: React.ReactNode
  autoAdjustOverflow?: boolean
}

// <======================================= 类型声明 ============================