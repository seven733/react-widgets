import React, { useRef, useEffect, SVGAttributes } from 'react'
import anime from 'animejs'

export default (props: CurveProps) => {
  const { animated = true } = props
  const ref = useRef<SVGPathElement>(null)

  useEffect(() => {
    const animation = anime({
      targets: ref.current,
      opacity: [0, 1],
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'linear',
      duration: 1000,
      autoplay: false,
    })
    animated && animation.play()

    return () => {
      !animation.completed && animation.seek(animation.duration)
    }
  }, [animated, props.d])

  return (
    <path {...props} ref={ref} />
  )
}

interface CurveProps extends SVGAttributes<SVGPathElement> {
  animated?: boolean
}
