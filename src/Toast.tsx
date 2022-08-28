/* eslint-disable max-len */

import {cover} from 'polished'
import React, {FunctionComponent, useEffect, useState} from 'react'
import styled from 'styled-components'
import {theme} from './utils/config'
import Mask from './Mask'


const loadingIcon = `transparent url("data:image/svg+xml;charset=utf8, %3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 100 100'%3E%3Cpath fill='none' d='M0 0h100v100H0z'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E9E9E9' rx='5' ry='5' transform='translate(0 -30)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23989697' rx='5' ry='5' transform='rotate(30 105.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%239B999A' rx='5' ry='5' transform='rotate(60 75.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23A3A1A2' rx='5' ry='5' transform='rotate(90 65 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23ABA9AA' rx='5' ry='5' transform='rotate(120 58.66 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23B2B2B2' rx='5' ry='5' transform='rotate(150 54.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23BAB8B9' rx='5' ry='5' transform='rotate(180 50 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23C2C0C1' rx='5' ry='5' transform='rotate(-150 45.98 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23CBCBCB' rx='5' ry='5' transform='rotate(-120 41.34 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23D2D2D2' rx='5' ry='5' transform='rotate(-90 35 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23DADADA' rx='5' ry='5' transform='rotate(-60 24.02 65)'/%3E%3Crect width='7' height='20' x='46.5' y='40' fill='%23E2E2E2' rx='5' ry='5' transform='rotate(-30 -5.98 65)'/%3E%3C/svg%3E") no-repeat`

const Page = styled.div`
  ${cover()};
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`

const Masked = styled(Mask)`
  display: inline-block;
  padding: 1em;
  border-radius: 0.4em;
  color: ${theme.colors.background};
`

const StyledIcon = styled.div`
  width: 2em;
  height: 2em;
  margin: 0 auto;
  margin-bottom: 4px;
  vertical-align: middle;
`

export const Loading = styled(StyledIcon)`
  animation: weuiLoading 1s steps(12, end) infinite;
  background: ${loadingIcon};
  background-size: 100%;

  @keyframes weuiLoading {
    0% {
        transform: rotate3d(0, 0, 1, 0deg);
    }

    100% {
        transform: rotate3d(0, 0, 1, 360deg);
    }
}
`
const Success = styled(StyledIcon)`
  background: ${theme.colors.background};
  mask-image: url(data:image/svg+xml,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8.657%2018.435L3%2012.778l1.414-1.414%204.95%204.95L20.678%205l1.414%201.414-12.02%2012.021a1%201%200%2001-1.415%200z%22%20fill-rule%3D%22evenodd%22%2F%3E%3C%2Fsvg%3E);
  mask-position: center;
  mask-size: cover;
`
const Error = styled(Success)`
  mask-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA0NjI5NDE5Mzg4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE3NDIiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNMTY4LjE4MjQyIDIxOS41MTY1NzZsNDguNzAwMTY1LTQ4LjcwMDE2NSA2MzMuMDk2MDA5IDYzMy4wOTYwMDktNDguNjk5MTQyIDQ4LjcwMDE2NUwxNjguMTgyNDIgMjE5LjUxNjU3NnoiIHAtaWQ9IjE3NDMiPjwvcGF0aD48cGF0aCBkPSJNMjE2Ljg4MjU4NiA4NTIuNjEyNTg1bC00OC42OTkxNDItNDguNzAwMTY1IDYzMy4wOTYwMDktNjMzLjA5NjAwOSA0OC42OTkxNDIgNDguNjk5MTQyTDIxNi44ODI1ODYgODUyLjYxMjU4NXoiIHAtaWQ9IjE3NDQiPjwvcGF0aD48L3N2Zz4=');
`
const Custom = styled(Success)<{icon:string}>`
  mask-image:${props => props.icon} ;
`

const Toast: FunctionComponent<ToastProps> = (props) => {
    const {duration, onClose,icon} = props
    const [visible, setVisible] = useState(true)
    useEffect(() => {
        duration && autoClose().then(() => onClose && onClose())
    }, [])
    const timeout = (time: number) => new Promise(res => setTimeout(res, time * 1000))
    const autoClose = async () => {
            await timeout(duration)
            setVisible(false)
    }

    return (
        <>
            {visible && <Page>
                <Masked minmal>
                    {props.type === 'loading' && <Loading/>}
                    {props.type === 'success' && <Success/>}
                    {props.type === 'error' && <Error/>}
                    {props.icon && <Custom icon={icon}/>}
                    {props.children}
                </Masked>
            </Page>}
        </>

    )
}

interface ToastProps {
    /** 类型 */
    type?: 'loading' | 'success' | 'error',
    /** 持续时间 */
    duration?: number,
    /** 关闭事件 */
    onClose?: () => void, // duration = 0 或 不存在 时，onClose 无效，toast 不会消失
    /** 图标 */
    icon?:string
    children?: React.ReactNode
}

export default Toast
