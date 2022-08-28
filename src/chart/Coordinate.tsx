import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale'
import React, { createContext, Dispatch, Reducer, SVGAttributes, useEffect, useReducer } from 'react'

export interface CoordinateState {
  axisBase?: string
  scaleX?: ScaleLinear<number, number> | ScaleTime<number, number> | ScaleBand<string>
  scaleY?: ScaleLinear<number, number> | ScaleTime<number, number> | ScaleBand<string>
  index?: number
  horizontal?: boolean
}

export const CoordinateContext = createContext<{ state: CoordinateState, dispatch: Dispatch<any> }>
  ({ state: {}, dispatch: () => { } })

const reduceCoordinate: Reducer<CoordinateState, { type: string, payload: CoordinateState }>
  = (state, action) => {
    const { payload } = action
    return { ...state, ...payload }
  }

// Coordinate用于管理坐标轴及坐标轴与图表的对应关系(图表需要根据坐标轴的比例进行计算和绘制)
export default function Coordinate(props: CoordinateProps) {
  const { horizontal, children, ...others } = props

  const [state, dispatch] = useReducer(reduceCoordinate, undefined, () => ({}))

  useEffect(() => {
    horizontal && dispatch({ type: '', payload: { horizontal } })
  }, [horizontal])

  return (
    <g {...others}>
      <CoordinateContext.Provider value={{ state, dispatch }}>
        {children}
      </CoordinateContext.Provider>
    </g>
  )
}

type CoordinateProps = SVGAttributes<SVGGElement> & {
  type?: 'cartesian' // 暂时只支持笛卡尔坐标
  horizontal?: boolean
}
