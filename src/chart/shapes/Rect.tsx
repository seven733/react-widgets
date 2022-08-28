import React, { SVGProps, useEffect, useRef, useState } from 'react'
import anime from 'animejs'

export default function Rect(props: SVGProps<SVGRectElement> & { horizontal?: boolean }) {
  const ref = useRef<SVGRectElement>(null)
  const { horizontal, ...others } = props

  var inner = horizontal
    ? { width: props.width as number }
    : { height: props.height as number, y: props.y as number }
  const [height, setHeight] = useState<number>(0)
  const [width, setWidth] = useState<number>(0)
  const [y, setY] = useState<number>()

  useEffect(() => {
    const animation = props.horizontal
      ? anime({
        targets: inner,
        width: [0, props.width],
        easing: 'linear',
        autoplay: false,
        update: () => {
          setWidth(inner.width)
        }
      })
      : anime({
        targets: inner,
        height: [0, props.height],
        y: [(props.y as number + (props.height as number)), props.y],
        easing: 'linear',
        autoplay: false,
        update: () => {
          setHeight(inner.height)
          setY(inner.y)
        },
      })

    animation.play()

    return () => {
      !animation.completed && animation.pause()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.horizontal, props.width, props.height])

  return horizontal
    ? <rect {...others} ref={ref} width={width} />
    : <rect {...others} ref={ref} height={height} y={y} />
}
