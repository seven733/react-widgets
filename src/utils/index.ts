// 输入一个box的几何数据，输出其占用制定width, height容器的边框多少
export function getSVGBound(rect: DOMRect, width: number, height: number) {
  let { x, y, width: w, height: h } = rect

  // 超出边框范围，则将其边线移动至边框内
  x < 0 && (x = 0)
  y < 0 && (y = 0)
  x + w > width && (x = width - w)
  y + h > height && (y = height - h)

  let index = 0, value = 0 // index 0:上， 1:右， 2:下， 3:左

  // 判断是在x方向还是在y方向
  if (w > width / 2) {
    // 沿横向伸展， offset在y方向
    index = y < height / 2 ? 0 : 2

    // 顶部区域 ?
    value = y < height / 2 ? h : height - h
  }
  if (h > height / 2) {
    // 沿纵向伸展， offset 在x方向
    index = x < width / 2 ? 3 : 1

    // 左侧区域？
    value = x < width / 2 ? w : width - w
  }

  return { index, value }
}


export function multiply(...args: number[]): number {
  if (args.indexOf(0) !== -1) return 0
  const { m, d } = args.reduce<{ m: number, d: number }>(({ m, d }, value: number) => {
    let v = value, t = 1
    const [interger, decimal = ''] = value.toString().split('.')
    v = parseInt(interger + decimal)
    t = Math.pow(10, decimal.length)
    return { m: m * v, d: d * t }
  }, { m: 1, d: 1 })
  return m / d
}

const handleScale = (num: number) => {
  const val = num.toLocaleString('zh-CN', { minimumFractionDigits: 1, style: 'percent' })
  return num > 0.001 ? val : `< 0.1%`
}

export function formatData(data?: number, type?: string): number | string | undefined {
  if (data === 0) return 0
  if (data) {
    if (type) {
      switch (type) {
        case 'scale':
          return handleScale(data)
        case 'money':
          return data.toLocaleString('zh-CN',
            { minimumFractionDigits: 2, style: 'currency', currency: 'CNY' })
        default:
          return data.toLocaleString('zh-CN', { minimumFractionDigits: 0 })
      }
    } else {
      return data.toLocaleString('zh-CN', { minimumFractionDigits: 0 })
    }
  } else {
    return undefined
  }
}


