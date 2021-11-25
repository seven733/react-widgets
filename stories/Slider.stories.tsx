import React, {useCallback, useRef, useState} from "react"
import styled, {css} from "styled-components"
import {Tooltip,RangeSlider,SingleSlider,ELEMENTS_CLASSNAME} from "../src"
import {BasicSliderProps} from '../src/Slider/common'
import {Story} from '@storybook/react'

const Wrapper = styled.div`
  background-color: white;
  padding: 5em;
  height: 200vh;
`;

const sliderStoryProps = {
  min: 1,
  max: 10,
  step: 0.1,
  disableTip: false,
  readonly: false,
  rangeDefault: [2, 6],
  singleDefault: 2,
}

export default {
  title: 'Slider',
  decorators: [(S: any) => <Wrapper><S/></Wrapper>],
  args: sliderStoryProps
}

export const Default: Story<typeof sliderStoryProps> = (args) => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([args.rangeDefault[0], args.rangeDefault[1]])
  const [singleValue, setSingleValue] = useState(args.singleDefault)

  const onRangeChange = useCallback((start: number, end: number) => setRangeValue([start, end]), [])
  const onSingleChange = useCallback((v: number) => setSingleValue(v), [])

  return <>
    <RangeSlider {...args as BasicSliderProps} defaultValues={rangeValue} onChange={onRangeChange}/><br/>
    <label>rang slider value {rangeValue[0]} ~ {rangeValue[1]}</label><br/>
    <SingleSlider {...args as BasicSliderProps} defaultValue={singleValue} onChange={onSingleChange}/>
    <label>single slider value {singleValue}</label><br/>
  </>
}

const customCSS = css<{ readonly?: boolean }>`
  width: 25em;
  height: 2em; 
  border: solid 1px red;
  
  &:hover{
    ${props => !props.readonly ? customHoverStyle : null};
  }
  
  .${ELEMENTS_CLASSNAME.track}{
    height: 1em;
    border-radius: .5em;
    background-color: rgb(247,167,169);
  }
  
  .${ELEMENTS_CLASSNAME.range}{
    border-radius: 0.25em;
    height: .5em;
    background-color: ${props => props.readonly ? props.theme.colors.minor : 'rgb(247,114,118)'}
  }
  
  .${ELEMENTS_CLASSNAME.handle}{
    height: 2em;
    width: 2em;
    border-radius: .5em;
    border: 2px solid ${props => props.readonly ? props.theme.colors.minor : 'rgb(247,114,118)'};
    background-color: rgb(247,240,130);
  }
`

const CustomRangeSlider = styled(RangeSlider)`
  ${customCSS}
`
const CustomSingleSlider = styled(SingleSlider)`
  ${customCSS}
`

const customHoverStyle = css`
  .${ELEMENTS_CLASSNAME.range} {
    background-color: rgb(247,87,92);
  }  
  
  .${ELEMENTS_CLASSNAME.handle} {
    border-color: rgb(247,87,92);
  }  
`

const customToolTip: (v: number, handleElement: React.ReactElement) => React.ReactElement =
  (v, handleElement) => {
    return <Tooltip title={`自定义tip，value：${v}`}>
      {handleElement}
    </Tooltip>
  }

export const Custom: Story<typeof sliderStoryProps> = (args) => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([args.rangeDefault[0], args.rangeDefault[1]])
  const [singleValue, setSingleValue] = useState(args.singleDefault)

  const onRangeChange = useCallback((start: number, end: number) => setRangeValue([start, end]), [])
  const onSingleChange = useCallback((v: number) => setSingleValue(v), [])

  return <>
    <CustomRangeSlider {...args as BasicSliderProps} defaultValues={rangeValue} onChange={onRangeChange}
                       customTip={customToolTip}
    /><br/>
    <label>rang slider value {rangeValue[0]} ~ {rangeValue[1]}</label><br/>
    <CustomSingleSlider {...args as BasicSliderProps} defaultValue={singleValue} onChange={onSingleChange}/>
    <label>single slider value {singleValue}</label><br/>
  </>
}


const StyledInput = styled.input.attrs({type: 'number'})`
`

export const WithInput: Story<typeof sliderStoryProps> = (args) => {
  const [rangeValue, setRangeValue] = useState<[number, number]>([args.rangeDefault[0], args.rangeDefault[1]])
  const onRangeChange = useCallback((start: number, end: number) => {
    setRangeValue([start, end])
  }, [setRangeValue])

  const rangeMinRef = useRef<HTMLInputElement>()
  const rangeMaxRef = useRef<HTMLInputElement>()

  let rangeHook: (vMin: number, vMax: number) => void
  const handleRangeInputChange = () => {
    rangeHook(+rangeMinRef.current.value, +rangeMaxRef.current.value)
  }



  const [singleValue, setSingleValue] = useState(args.singleDefault)
  const onSingleChange = useCallback((v: number) => setSingleValue(v), [setSingleValue])
  const singleRef = useRef<HTMLInputElement>()

  let singleHook: (v: number) => void
  const handleSingleInputChange = () => {
    singleHook(+singleRef.current.value)
  }

  return <>
    <StyledInput ref={rangeMinRef} min={args.min} max={args.max} onChange={handleRangeInputChange}/>
    <span>~</span>
    <StyledInput ref={rangeMaxRef} min={args.min} max={args.max} onChange={handleRangeInputChange}/>
    <RangeSlider {...args as BasicSliderProps} defaultValues={rangeValue} onChange={onRangeChange}
                 updateHookRef={hook => rangeHook = hook}/><br/>
    <label>rang slider value {rangeValue[0]} ~ {rangeValue[1]}</label><br/>

    <StyledInput ref={singleRef} min={args.min} max={args.max} onChange={handleSingleInputChange}/>
    <SingleSlider {...args as BasicSliderProps} defaultValue={singleValue} onChange={onSingleChange}
                  updateHookRef={hook => singleHook = hook}/>
    <label>single slider value {singleValue}</label><br/>
  </>
}
