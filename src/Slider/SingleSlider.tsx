import React, {useCallback, useEffect, useRef, useState} from 'react'
import {SingleSliderProps} from './common'
import SliderContainer from './components/SliderContainer'
import SliderTrack from './components/SliderTrack'
import SliderRange from './components/SliderRange'
import {calcFraction, calcPosition, calcValue, fixToStepValue,bindUpdateListener} from './utils'
import SliderHandle from './components/SliderHandle'


const SingleSlider: React.FC<SingleSliderProps> = (props) => {
  const {step, min, max, readonly, defaultValue} = props
  const start = {
    value: min,
    position: 0
  }
  // 确定小数精度 只是简单计算，不考虑使用useMemo
  const fractionDigits = calcFraction(step)
  const [end, setEnd] = useState({
    position: calcPosition(defaultValue, min, max),
    value: defaultValue
  })
  const containerRef = useRef(null)

  const updatePosition = (p: number) => {
    const {left, right} = containerRef.current.getBoundingClientRect()
    const position = calcPosition(Math.min(Math.max(p, left), right), left, right)
    const value = calcValue(position, min, max, fractionDigits)
    const finalValue = fixToStepValue(value, min, step)
    const finalPosition = calcPosition(value, min, max)
    setEnd({position: finalPosition, value: finalValue})
    props.onChange(finalValue)
    // console.log(`position: ${position} value: ${value} finalP:${finalPosition} finalV:${finalValue} end:${end.value}`)
  }

  const updateValue = useCallback((v:number) => {
    if(v < min || v > max) return
    const _v = fixToStepValue(v, min, step)
    if(_v !== end.value){
      const position = calcPosition(_v, min, max)
      setEnd({position: position,value: _v})
      props.onChange(_v)
    }
  },[setEnd])

  useEffect(() => {props.updateHookRef && props.updateHookRef(updateValue)},[props.updateHookRef,updateValue])

  const handleDown = (e: React.MouseEvent) => {
    updatePosition(e.clientX)
    bindUpdateListener(handleMove)
    e.preventDefault()
  }

  const handleMove = (e: MouseEvent) => {
    const {left, right} = containerRef.current.getBoundingClientRect()
    const p = e.clientX
    if (p >= right && end.position !== 1) {
      updatePosition(right)
    } else if (p <= left && end.position !== 0) {
      updatePosition(left)
    } else {
      updatePosition(p)
    }
  }

  return <SliderContainer className={props.className} ref={containerRef}
                          readonly={readonly}
                          onMouseDown={readonly ? () => undefined : handleDown}>
    <SliderTrack/>
    <SliderRange readonly={readonly} start={start.position} end={end.position}/>
    <SliderHandle {...props} position={end.position} value={end.value}/>
  </SliderContainer>
}

export default SingleSlider