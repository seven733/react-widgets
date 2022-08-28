import React from 'react'
import {Toast} from '../src'

export const DefaultToast = () => (<Toast>请输入正确的卡号</Toast>)

export const LoadingToast = () => (<Toast type="loading">加载中</Toast>)

export const SuccessToast = () =>(<Toast type="success">操作成功</Toast>)


export const ErrorToast = () => (<Toast type="error">操作失败</Toast>)

export const DurationToast = () => {
    const handleClose= () =>{
        console.log(`it's closed!`)
    }
    return <Toast type="success" duration={2} onClose={handleClose}>显示两秒</Toast>
}

export const CustomIconToast = () =>{
    const maskImg='url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjA0NjMzNTE5NTk5IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE4ODAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlIHR5cGU9InRleHQvY3NzIj48L3N0eWxlPjwvZGVmcz48cGF0aCBkPSJNNTEyIDBjLTI4MS42IDAtNTEyIDIzMC40LTUxMiA1MTJzMjMwLjQgNTEyIDUxMiA1MTJjMjgxLjYgMCA1MTItMjMwLjQgNTEyLTUxMnMtMjMwLjQtNTEyLTUxMi01MTJ6TTUxMiA4MzJjLTMyIDAtNjQtMzItNjQtNjRsMTIxLjYgMGMwIDMyLTI1LjYgNjQtNTcuNiA2NHpNODA2LjQgNzQyLjRsLTU4OC44IDAgMC0zOC40IDgzLjItNzAuNCAwLTE5MmMwLTEwMi40IDcwLjQtMTg1LjYgMTcyLjgtMjA0LjhsMC0xOS4yYzAtMTIuOCAxMi44LTI1LjYgMjUuNi0yNS42bDI1LjYgMGMxMi44IDAgMjUuNiAxMi44IDI1LjYgMjUuNmwwIDEyLjhjOTYgMTkuMiAxNzIuOCAxMDIuNCAxNzIuOCAyMDQuOGwwIDE5OC40IDgzLjIgNzAuNCAwIDM4LjR6IiBwLWlkPSIxODgxIj48L3BhdGg+PC9zdmc+)'
    return <Toast icon={maskImg}>custom icon</Toast>
}

export default {title: 'Toast', component: Toast}

