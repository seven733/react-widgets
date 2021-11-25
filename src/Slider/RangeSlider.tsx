import React, {useCallback, useEffect, useRef, useState} from 'react'
import SliderTrack from './components/SliderTrack'
import SliderRange from './components/SliderRange'
import SliderHandle from './components/SliderHandle'
import SliderContainer from './components/SliderContainer'
import {calcFraction, calcPosition, calcValue, fixToStepValue, bindUpdateListener} from './utils'
import {RangSliderProps} from './common'

const RangeSlider: React.FC<RangSliderProps> = (props) => {
  const {step, min, max, readonly} = props
  // 确定小数精度 只是简单计算，不考虑使用useMemo
  const fractionDigits = calcFraction(step)
  const [start, setStart] = useState({
    position: calcPosition(props.defaultValues[0], min, max),
    value: props.defaultValues[0]
  })
  const [end, setEnd] = useState({
    position: calcPosition(props.defaultValues[1], min, max),
    value: props.defaultValues[1]
  })
  const containerRef = useRef(null)

  const updateValue = useCallback((vMin:number, vMax:number) => {
    if(vMin < min || vMax < min || vMax > max || vMin > max || vMin >= vMax) return
    const _vMin = fixToStepValue(vMin, min, step)

    const _vMax = fixToStepValue(vMax, min, step)
    if(_vMin !== start.value){
      const position = calcPosition(_vMin, min, max)
      setStart({position: position,value: _vMin})
    }
    if(_vMax !== end.value){
      const position = calcPosition(_vMax, min, max)
      setEnd({position: position,value: _vMax})
    }
    props.onChange(_vMin, _vMax)
  },[setStart,setEnd,props.onChange])

  useEffect(() => {props.updateHookRef && props.updateHookRef(updateValue)},[props.updateHookRef,updateValue])

  const updatePosition = (p: number) => {
    const {left, right} = containerRef.current.getBoundingClientRect()
    const position = calcPosition(Math.min(Math.max(p, left), right), left, right)
    const value = calcValue(position, min, max, fractionDigits)
    const finalValue = fixToStepValue(value, min, step)
    const finalPosition = calcPosition(value, min, max)
    if (Math.abs(finalValue - start.value) > Math.abs(finalValue - end.value)) {
      setEnd({position: finalPosition, value: finalValue})
      props.onChange(start.value, finalValue)
    } else {
      setStart({position: finalPosition, value: finalValue})
      props.onChange(finalValue, end.value)
    }
    // console.log(`position: ${position} value: ${value} finalP:${finalPosition} finalV:${finalValue} start:${start.value} end:${end.value}`)
  }

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
    } else if (p <= left && start.position !== 0) {
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
    <SliderHandle {...props} position={start.position} value={start.value}/>
    <SliderHandle {...props} position={end.position} value={end.value}/>
  </SliderContainer>
}

export default RangeSlider