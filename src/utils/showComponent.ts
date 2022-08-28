// @ts-ignore
import ReactDOM from 'react-dom'

let timeIds: number[] = []

export default function showComponent(
    component: JSX.Element,
    duration: number = 3
) {
    const id = setTimeout(() => {
        container.removeChild(ele)
    }, duration * 1000)

    timeIds.push(id)

    // 容器中的每个提示框
    const ele = document.createElement('div')
    let container = document.getElementById('container')
    if (!container) {
        // 创建一个装提示框的容器
        container = document.createElement('div')
        container.setAttribute('id', 'container')
        container.style.position = 'absolute'
        container.style.top = '0'
        container.style.right = '0'
    }

    ele.style.display = 'flex'
    ele.style.flexDirection = 'row-reverse'
    const root = document.getElementById('root')
    root!.appendChild(container)
    container.append(ele)

    window.onmouseout = (e: MouseEvent) => {
        const x = e.clientX
        const y = e.clientY
        const eleLeft = container.offsetLeft
        const eleTop = container.offsetTop
        const eleRight = container.offsetLeft + container.offsetWidth
        const eleBottom = container.offsetTop + container.offsetHeight
        if (x > eleLeft && x < eleRight && y > eleTop && y < eleBottom) {
            if (timeIds && timeIds.length) {
                timeIds.forEach((item: number) => clearTimeout(item))
            }
        }
    }

    container.onmouseleave = () => {
        timeIds = []
        while (container.hasChildNodes()) {
            container.removeChild(container.firstChild)
        }
    }

    // const handleClose = () => {
    //     container.removeChild(ele)
    // }

    ReactDOM.render(component, ele)
}

