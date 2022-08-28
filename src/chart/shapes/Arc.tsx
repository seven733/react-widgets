import React, { useRef, useEffect, SVGAttributes, useState } from 'react'
import anime from 'animejs'
import { arc, DefaultArcObject } from 'd3-shape'

var angle = { endAngle: 0, outerRadius: 0 }

export default function Arc(props: CurveProps) {
  const { animated = true, params } = props
  const ref = useRef<SVGPathElement>(null)
  const doArc = arc().padAngle(0.005).cornerRadius(3)
  const [d, setD] = useState(
    doArc({ ...params, outerRadius: params.innerRadius }))

  useEffect(() => {
    const animation = anime({
      targets: angle,
      endAngle: [params.startAngle, params.endAngle],
      outerRadius: [params.innerRadius, params.outerRadius],
      easing: 'linear',
      duration: 1000,
      autoplay: false,
      update: () => setD(doArc({ ...params, ...angle }))
    })

    animated && animation.play()

    return () => {
      !animation.completed && animation.seek(animation.duration)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.innerRadius, params.outerRadius, params.startAngle, params.endAngle])

  return (
    <path {...props} d={d!} ref={ref} />
  )
}

interface CurveProps extends SVGAttributes<SVGPathElement> {
  animated?: boolean
  params: DefaultArcObject
}
