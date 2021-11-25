export const ELEMENTS_CLASSNAME = {
  container: 'slider-container',
  track: 'slider-track',
  range: 'slider-range',
  handle: 'slider-handle'
}

export interface BasicSliderProps {
  max: number
  min: number
  step: number
  readonly?: boolean
  disableTip?: boolean
  className?: string
  customTip?: (value: number, handleElement: React.ReactElement) => React.ReactElement
}

export interface RangSliderProps extends BasicSliderProps {
  defaultValues: [number, number]
  onChange: (vMin: number, vMax: number) => void
  updateHookRef?: (hook: (vMin:number, vMax:number) => void) => void
}

export interface SingleSliderProps extends BasicSliderProps {
  defaultValue: number
  onChange: (v: number) => void
  updateHookRef?: (hook: (v: number) => void) => void
}