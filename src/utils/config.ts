import { DefaultTheme } from 'styled-components'
import { transparentize } from 'polished'
import { multiply } from './'

export const theme: DefaultTheme = {
  opacity: 0.6,
  colors: {
    primary: '#29c588',
    primaryDark: '#0FB48B',
    info: '#6492FF',
    infoLight: '#78afff',
    warning: '#FFB931',
    danger: '#FF5F5F',
    background: '#F5F5F5',
    strong: '#333333',
    minor: '#666666',
    assist: '#999999',
    icon: '#CCCCCC',
    shadow: '#EEEEEE',
    border: transparentize(0.85, '#000'),
    white: '#FFFFFF',
  },
}

declare module 'styled-components' {
  export interface DefaultTheme {
    opacity: number
    colors: {
      primary: string
      primaryDark: string
      info: string // 辅助色
      infoLight: string // 辅助色-浅
      warning: string // 辅助色
      danger: string // 辅助色/错误提示/必填提示
      background: string // 整体背景底色/默认线条颜色/表单表行背景色
      strong: string // 重要文本字体颜色
      minor: string // 次要文本字体颜色
      assist: string // 辅助文本字体颜色
      icon: string // 默认icon颜色/按钮边框线颜色
      shadow: string // 阴影颜色
      border: string // 未选择按钮背景色/突出线条颜色
      white: string
    },
  }
}

export const ANIME = {
  spring: {
    noWobble: 'spring(1, 170, 26, 0)', // { stiffness: 170, damping: 26 }
    gentle: 'spring(1, 120, 14, 0)', // { stiffness: 120, damping: 14 },
    wobbly: 'spring(1, 180, 12, 0)', // { stiffness: 180, damping: 12 },
    stiff: 'spring(1, 210, 20, 0)', // { stiffness: 210, damping: 20 }
  },
  config: {
    
  }
}

export const Magnitudes = new Map<string, (value: number) => string>([
  ['%', (value: number) => multiply(value, 100).toString()],
  ['', (value: number) => value.toString()],
  ['万', (value: number) => (value / 1e4).toString()],
  ['百万', (value: number) => (value / 1e6).toString()],
  ['千万', (value: number) => (value / 1e7).toString()],
  ['亿', (value: number) => (value / 1e8).toString()],
])

export function getMagnitude(max: number) {
  if (max > 1e4 && max <= 1e6) return '万'
  if (max > 1e6 && max <= 1e7) return '百万'
  if (max > 1e7 && max <= 1e8) return '千万'
  if (max > 1e8) return '亿'
  return ''
}
